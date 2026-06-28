import dns from "dns/promises";

export async function domainExists(
  hostname: string
): Promise<boolean> {
  try {
    await dns.lookup(hostname);

    return true;
  } catch {
    return false;
  }
}