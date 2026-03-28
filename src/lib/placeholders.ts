const PLACEHOLDER_PATTERN = /^\[[A-Z0-9_]+\]$/;

export const contentPlaceholders = [
  "[RUBY_BIO]",
  "[RUBY_MANIFESTE]",
  "[RUBY_EMAIL]",
  "[RUBY_PHONE]",
  "[RUBY_INSTAGRAM]",
  "[RUBY_PORTRAIT]",
  "[RUBY_LOCATION]",
  "[RUBY_ARTIST_STATEMENT]",
  "[LEGAL_NOTICE]",
  "[PRIVACY_POLICY]",
  "[TERMS_OF_SALE]",
  "[STRIPE_PUBLIC_KEY]",
  "[STRIPE_SECRET_KEY]",
  "[STRIPE_WEBHOOK_SECRET]"
] as const;

export function isPlaceholderValue(value?: string | null) {
  return Boolean(value && PLACEHOLDER_PATTERN.test(value.trim()));
}

export function hasConfiguredValue(value?: string | null) {
  return Boolean(value && value.trim().length > 0 && !isPlaceholderValue(value));
}

export function resolvePlaceholder(value: string | undefined | null, fallback: string) {
  return hasConfiguredValue(value) ? value!.trim() : fallback;
}
