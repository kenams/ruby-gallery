import { ArtworkStatus, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/lib/site-settings";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const artworkId = body.artworkId as string | undefined;

    if (!artworkId) {
      return NextResponse.json({ error: "Oeuvre introuvable." }, { status: 400 });
    }

    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId }
    });

    if (!artwork) {
      return NextResponse.json({ error: "Oeuvre introuvable." }, { status: 404 });
    }

    if (artwork.status !== ArtworkStatus.AVAILABLE) {
      return NextResponse.json(
        { error: "Cette oeuvre n'est plus disponible a la vente.", status: artwork.status },
        { status: 409 }
      );
    }

    if (artwork.priceInCents <= 0) {
      return NextResponse.json(
        { error: "Le prix de cette oeuvre n'est pas encore configure." },
        { status: 409 }
      );
    }

    const stripe = getStripe();
    const settings = await getSiteSettings();

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe n'est pas configure. Ajoutez les cles reelles avant de rendre l'achat public." },
        { status: 503 }
      );
    }

    const currency = siteConfig.stripeCurrency.toLowerCase();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      client_reference_id: artwork.id,
      success_url: `${siteConfig.url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/cancel?artwork=${artwork.slug}`,
      metadata: {
        artworkId: artwork.id,
        artworkSlug: artwork.slug,
        artworkTitle: artwork.title,
        artworkCollection: artwork.collection,
        artworkStatus: artwork.status,
        artistName: settings.artistName,
        siteName: siteConfig.name
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: artwork.priceInCents,
            product_data: {
              name: artwork.title,
              description: `${artwork.collection} | ${artwork.dimensions} | ${artwork.year}`
            }
          }
        }
      ]
    });

    await prisma.order.create({
      data: {
        artworkId: artwork.id,
        stripeSessionId: session.id,
        amountInCents: artwork.priceInCents,
        currency,
        status: PaymentStatus.PENDING
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
