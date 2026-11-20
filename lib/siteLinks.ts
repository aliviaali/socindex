function documentUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch { return undefined; }
}

// Set these only after the actual documents have been published.
export const privacyUrl = documentUrl(process.env.NEXT_PUBLIC_PRIVACY_URL);
export const termsUrl = documentUrl(process.env.NEXT_PUBLIC_TERMS_URL);
