import { ArtworkStatus, PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature." }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid signature." },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const artworkId = session.metadata?.artworkId;

      if (artworkId) {
        await prisma.$transaction([
          prisma.order.updateMany({
            where: { stripeSessionId: session.id, status: PaymentStatus.PENDING },
            data: {
              status: PaymentStatus.PAID,
              stripePaymentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
              customerEmail: session.customer_details?.email ?? null,
              customerName: session.customer_details?.name ?? null
            }
          }),
          prisma.artwork.updateMany({
            where: { id: artworkId, status: { not: ArtworkStatus.SOLD } },
            data: { status: ArtworkStatus.SOLD }
          })
        ]);
      }
    }

    if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await prisma.order.updateMany({
        where: { stripeSessionId: session.id },
        data: { status: PaymentStatus.CANCELLED }
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook handling failed." },
      { status: 500 }
    );
  }
}
