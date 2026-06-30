export function normalizeHomograph(
  domain: string
) {
  return domain
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "l")
    .replace(/3/g, "e")
    .replace(/5/g, "s")
    .replace(/8/g, "b")
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/rn/g, "m")
    .replace(/vv/g, "w");
}

export function looksLikeDomain(
  hostname: string,
  trustedDomains: string[]
) {
  const normalized =
    normalizeHomograph(hostname);

  return trustedDomains.find(
    (domain) =>
      normalized === domain ||
      normalized.includes(domain)
  );
}