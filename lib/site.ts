/** Canonical production domain (no trailing slash). Keep www/non-www consistent with redirects. */
export const CANONICAL_SITE_URL = "https://tempsureinsurance.co.uk";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  // Prefer the live brand domain over preview/deployment hosts.
  if (process.env.VERCEL_ENV === "production") {
    return CANONICAL_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }

  return CANONICAL_SITE_URL;
}
