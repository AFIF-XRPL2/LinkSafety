import { AnalysisResult } from "@/types/analysis";
import { TRUSTED_GOVERNMENT_DOMAINS } from "./trusted-government-domains";
import { TRUSTED_COMPANY_DOMAINS } from "./trusted-company-domains";
import { PROTECTED_KEYWORDS } from "./protected-keywords";
import { calculateStatus } from "./calculate-status";

export function analyzeUrl(
  url: string
): AnalysisResult {
  const reasons: string[] = [];
  let score = 0;

  const parsed = new URL(url);

  const hostname =
    parsed.hostname.toLowerCase();

  const separatorCount =
  (hostname.match(/[-_]/g) || []).length;

if (separatorCount >= 2) {
  score += 20;

  reasons.push(
    "Domain menggunakan banyak pemisah yang sering dipakai situs phishing."
  );
}

    const impersonatedKeyword =
  PROTECTED_KEYWORDS.find((keyword) =>
    hostname.includes(keyword)
  );

  const isTrustedGovernment =
  TRUSTED_GOVERNMENT_DOMAINS.some(
    (domain) =>
      hostname === domain ||
      hostname.endsWith("." + domain)
  );

const isTrustedCompany =
  TRUSTED_COMPANY_DOMAINS.some(
    (domain) =>
      hostname === domain ||
      hostname.endsWith("." + domain)
  );

const isGovernmentDomain =
  hostname.endsWith(".go.id") ||
  hostname.endsWith(".desa.id");

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

  const suspiciousPatterns = [
  {
    word: "telegram",
    score: 30,
  },
  {
    word: "otp",
    score: 30,
  },
  {
    word: "whatsapp",
    score: 20,
  },
  {
    word: "verifikasi",
    score: 20,
  },
  {
    word: "verify",
    score: 20,
  },
  {
    word: "login",
    score: 20,
  },
  {
    word: "secure",
    score: 20,
  },
  {
    word: "claim",
    score: 20,
  },
  {
    word: "hadiah",
    score: 20,
  },
  {
    word: "voucher",
    score: 15,
  },
  {
    word: "bonus",
    score: 15,
  },
  {
    word: "promo",
    score: 15,
  },
  {
    word: "gratis",
    score: 15,
  },
  {
    word: "undian",
    score: 20,
  },
  {
    word: "rekening",
    score: 20,
  },
  {
  word: "klaim",
  score: 20,
  },
  {
  word: "akun",
  score: 10,
  },
  {
  word: "terima",
  score: 10,
  },
  {
    word: "bank",
    score: 10,
  },
  {
    word: "bansos",
    score: 10,
  },
  {
    word: "kemensos",
    score: 10,
  },
  {
    word: "dana",
    score: 10,
  },
  {
    word: "gopay",
    score: 10,
  },
  {
    word: "ovo",
    score: 10,
  },
  {
    word: "bri",
    score: 15,
  },
  {
    word: "bca",
    score: 15,
  },
  {
    word: "bankmandiri",
    score: 20,
  },
  {
    word: "btn",
    score: 15,
  },
  {
    word: "prakerja",
    score: 10,
  },
  {
    word: "subsidi",
    score: 10,
  },
  {
    word: "bantuan",
    score: 15,
  },
  {
    word: "update",
    score: 10,
  },
  {
    word: "terbaru",
    score: 10,
  },
  {
  word: "linkaja",
  score: 15,
},
{
  word: "shopee",
  score: 15,
},
{
  word: "tokopedia",
  score: 15,
},
{
  word: "mytelkomsel",
  score: 15,
},
{
  word: "pln",
  score: 15,
},
{
  word: "bpjs",
  score: 15,
},
{
  word: "pajak",
  score: 15,
},
{
  word: "djp",
  score: 15,
},
];

  for (const pattern of suspiciousPatterns) {
  if (
    url
      .toLowerCase()
      .includes(pattern.word)
  ) {
    score += pattern.score;

    reasons.push(
      `Mengandung kata mencurigakan: "${pattern.word}".`
    );
  }
}

  const digitCount =
  (hostname.match(/\d/g) || []).length;

  const yearRegex =
  /20\d{2}/;

if (yearRegex.test(hostname)) {
  score += 20;

  reasons.push(
    "Domain mengandung tahun yang sering dipakai situs phishing."
  );
}

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

  if (isGovernmentDomain) {
  score -= 20;

  reasons.push(
    "Menggunakan domain resmi pemerintah Indonesia."
  );
}

if (isTrustedGovernment) {
  score -= 40;

  reasons.push(
    "Domain termasuk situs pemerintah terpercaya."
  );
}

if (isTrustedCompany) {
  score -= 40;

  reasons.push(
    "Domain termasuk situs resmi perusahaan terpercaya."
  );
}

if (
  impersonatedKeyword &&
  hostname !== impersonatedKeyword &&
  !hostname.endsWith("." + impersonatedKeyword) &&
  !isTrustedGovernment &&
  !isTrustedCompany
) {
  score += 35;

  reasons.push(
    `Domain mencoba meniru "${impersonatedKeyword}".`
  );
}

score = Math.min(
  Math.max(score, 0),
  100
);



  const status =
  calculateStatus(score);

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