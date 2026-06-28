export function isValidUrl(url: string): boolean {
  try {
    const trimmedUrl = url.trim();

    if (
      !trimmedUrl.startsWith("http://") &&
      !trimmedUrl.startsWith("https://")
    ) {
      return false;
    }

    const parsed = new URL(trimmedUrl);

    if (
      parsed.protocol !== "http:" &&
      parsed.protocol !== "https:"
    ) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    const domainRegex =
      /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,63}$/i;

    return domainRegex.test(hostname);
  } catch {
    return false;
  }
}