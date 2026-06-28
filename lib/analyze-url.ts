import { AnalysisResult } from "@/types/analysis";

export function analyzeUrl(
  url: string
): AnalysisResult {
  const reasons: string[] = [];
  let score = 0;

  const parsed = new URL(url);

  const hostname =
    parsed.hostname.toLowerCase();

  const shorteners = [
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "s.id",
    "cutt.ly",
    "tiny.cc",
  ];

  if (
    shorteners.some((domain) =>
      hostname.includes(domain)
    )
  ) {
    score += 40;
    reasons.push(
      "Menggunakan layanan pemendek URL."
    );
  }

  const ipRegex =
    /^(\d{1,3}\.){3}\d{1,3}$/;

  if (ipRegex.test(hostname)) {
    score += 50;
    reasons.push(
      "Menggunakan IP address sebagai domain."
    );
  }

  if (hostname.length > 40) {
    score += 20;
    reasons.push(
      "Nama domain terlalu panjang."
    );
  }

  const subdomainCount =
    hostname.split(".").length - 2;

  if (subdomainCount >= 3) {
    score += 25;
    reasons.push(
      "Memiliki terlalu banyak subdomain."
    );
  }

  const suspiciousWords = [
  "login",
  "verify",
  "secure",
  "bonus",
  "gift",
  "hadiah",
  "promo",
  "gratis",
  "update",
  "terbaru",
  "dana",
  "gopay",
  "ovo",
  "rekening",
  "bank",
  "undian",
  "claim",
];

  for (const word of suspiciousWords) {
    if (url.toLowerCase().includes(word)) {
      score += 15;
      reasons.push(
        `Mengandung kata mencurigakan: "${word}".`
      );
    }
  }

  const digitCount =
  (hostname.match(/\d/g) || []).length;

if (digitCount >= 3) {
  score += 15;

  reasons.push(
    "Domain mengandung beberapa angka."
  );
}

const suspiciousTlds = [
  "biz.id",
  "my.id",
  "xyz",
  "top",
  "click",
  "live",
  "site",
  "online",
];

if (
  suspiciousTlds.some((tld) =>
    hostname.endsWith(tld)
  )
) {
  score += 20;

  reasons.push(
    "Menggunakan TLD yang sering dipakai situs phishing."
  );
}

if (/^\/\d+$/.test(parsed.pathname)) {
  score += 20;

  reasons.push(
    "Path URL hanya berisi angka."
  );
}

  if (digitCount >= 5) {
    score += 20;
    reasons.push(
      "Domain mengandung banyak angka."
    );
  }

  let status:
    | "safe"
    | "suspicious"
    | "dangerous";

  if (score >= 70) {
    status = "dangerous";
  } else if (score >= 30) {
    status = "suspicious";
  } else {
    status = "safe";
  }

  if (reasons.length === 0) {
    reasons.push(
      "Tidak ditemukan indikasi berbahaya."
    );
  }

  return {
    status,
    score,
    reasons,
  };
}