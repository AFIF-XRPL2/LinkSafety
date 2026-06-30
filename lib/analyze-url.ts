import { AnalysisResult } from "@/types/analysis";
import { TRUSTED_GOVERNMENT_DOMAINS } from "./trusted-government-domains";
import { TRUSTED_COMPANY_DOMAINS } from "./trusted-company-domains";
import { PROTECTED_KEYWORDS } from "./protected-keywords";
import { calculateStatus } from "./calculate-status";
import {
  looksLikeDomain,
} from "./homograph";

export function analyzeUrl(
  url: string
): AnalysisResult {
  const reasons: string[] = [];
  let score = 0;

  const parsed = new URL(url);

  const hostname =
    parsed.hostname.toLowerCase();

  const trustedDomains = [
  ...TRUSTED_GOVERNMENT_DOMAINS,
  ...TRUSTED_COMPANY_DOMAINS,
];

const homographDomain =
  looksLikeDomain(
    hostname,
    trustedDomains
  );

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
    word: "backdoor",
    score: 30,
  },
  {
    word: "credential",
    score: 30,
  },
  {
    word: "exploit",
    score: 30,
  },
  {
    word: "keylogger",
    score: 30,
  },
  {
    word: "malware",
    score: 30,
  },
  {
    word: "otp",
    score: 30,
  },
  {
    word: "phishing",
    score: 30,
  },
  {
    word: "ransomware",
    score: 30,
  },
  {
    word: "spyware",
    score: 30,
  },
  {
    word: "telegram",
    score: 30,
  },
  {
    word: "trojan",
    score: 30,
  },
  {
    word: "bocor",
    score: 25,
  },
  {
    word: "cvv",
    score: 25,
  },
  {
    word: "dump",
    score: 25,
  },
  {
    word: "ektp",
    score: 25,
  },
  {
    word: "fraud",
    score: 25,
  },
  {
    word: "impersonasi",
    score: 25,
  },
  {
    word: "ktp",
    score: 25,
  },
  {
    word: "leak",
    score: 25,
  },
  {
    word: "malicious",
    score: 25,
  },
  {
    word: "nik",
    score: 25,
  },
  {
    word: "npwp",
    score: 25,
  },
  {
    word: "passcode",
    score: 25,
  },
  {
    word: "passport",
    score: 25,
  },
  {
    word: "password",
    score: 25,
  },
  {
    word: "penipuan",
    score: 25,
  },
  {
    word: "pin",
    score: 25,
  },
  {
    word: "scam",
    score: 25,
  },
  {
    word: "spoof",
    score: 25,
  },
  {
    word: "aktifkembali",
    score: 20,
  },
  {
    word: "alert",
    score: 20,
  },
  {
    word: "autentikasi",
    score: 20,
  },
  {
    word: "claim",
    score: 20,
  },
  {
    word: "clone",
    score: 20,
  },
  {
    word: "confirm",
    score: 20,
  },
  {
    word: "crypto",
    score: 20,
  },
  {
    word: "deposit",
    score: 20,
  },
  {
    word: "diblokir",
    score: 20,
  },
  {
    word: "expired",
    score: 20,
  },
  {
    word: "fake",
    score: 20,
  },
  {
    word: "hadiah",
    score: 20,
  },
  {
    word: "investasi",
    score: 20,
  },
  {
    word: "kedaluwarsa",
    score: 20,
  },
  {
    word: "klaim",
    score: 20,
  },
  {
    word: "konfirmasi",
    score: 20,
  },
  {
    word: "login",
    score: 20,
  },
  {
    word: "menang",
    score: 20,
  },
  {
    word: "mirror",
    score: 20,
  },
  {
    word: "palsu",
    score: 20,
  },
  {
    word: "pemenang",
    score: 20,
  },
  {
    word: "recovery",
    score: 20,
  },
  {
    word: "redirect",
    score: 20,
  },
  {
    word: "rekening",
    score: 20,
  },
  {
    word: "reset",
    score: 20,
  },
  {
    word: "secure",
    score: 20,
  },
  {
    word: "session",
    score: 20,
  },
  {
    word: "shortlink",
    score: 20,
  },
  {
    word: "sim",
    score: 20,
  },
  {
    word: "suspensi",
    score: 20,
  },
  {
    word: "tiruan",
    score: 20,
  },
  {
    word: "token",
    score: 20,
  },
  {
    word: "trading",
    score: 20,
  },
  {
    word: "transfer",
    score: 20,
  },
  {
    word: "undian",
    score: 20,
  },
  {
    word: "unlock",
    score: 20,
  },
  {
    word: "username",
    score: 20,
  },
  {
    word: "validasi",
    score: 20,
  },
  {
    word: "verifikasi",
    score: 20,
  },
  {
    word: "verifikasiakun",
    score: 20,
  },
  {
    word: "verify",
    score: 20,
  },
  {
    word: "wallet",
    score: 20,
  },
  {
    word: "warning",
    score: 20,
  },
  {
    word: "whatsapp",
    score: 20,
  },
  {
    word: "withdraw",
    score: 20,
  },
  {
    word: "aktifkan",
    score: 15,
  },
  {
    word: "ancaman",
    score: 15,
  },
  {
    word: "aset",
    score: 15,
  },
  {
    word: "bankmandiri",
    score: 15,
  },
  {
    word: "bca",
    score: 15,
  },
  {
    word: "biayaadmin",
    score: 15,
  },
  {
    word: "bitly",
    score: 15,
  },
  {
    word: "blacklist",
    score: 15,
  },
  {
    word: "bonus",
    score: 15,
  },
  {
    word: "bpjs",
    score: 15,
  },
  {
    word: "bri",
    score: 15,
  },
  {
    word: "btn",
    score: 15,
  },
  {
    word: "callcenter",
    score: 15,
  },
  {
    word: "captcha",
    score: 15,
  },
  {
    word: "cashback",
    score: 15,
  },
  {
    word: "cicilan",
    score: 15,
  },
  {
    word: "cookie",
    score: 15,
  },
  {
    word: "cuttly",
    score: 15,
  },
  {
    word: "darurat",
    score: 15,
  },
  {
    word: "debit",
    score: 15,
  },
  {
    word: "denda",
    score: 15,
  },
  {
    word: "diskon",
    score: 15,
  },
  {
    word: "djp",
    score: 15,
  },
  {
    word: "exchange",
    score: 15,
  },
  {
    word: "gratis",
    score: 15,
  },
  {
    word: "helpdesk",
    score: 15,
  },
  {
    word: "hotline",
    score: 15,
  },
  {
    word: "invoice",
    score: 15,
  },
  {
    word: "izin",
    score: 15,
  },
  {
    word: "kartu",
    score: 15,
  },
  {
    word: "keamanan",
    score: 15,
  },
  {
    word: "kredit",
    score: 15,
  },
  {
    word: "kreditur",
    score: 15,
  },
  {
    word: "kupon",
    score: 15,
  },
  {
    word: "limit",
    score: 15,
  },
  {
    word: "linkaja",
    score: 15,
  },
  {
    word: "loginpage",
    score: 15,
  },
  {
    word: "maintenance",
    score: 15,
  },
  {
    word: "merchant",
    score: 15,
  },
  {
    word: "mutasi",
    score: 15,
  },
  {
    word: "mytelkomsel",
    score: 15,
  },
  {
    word: "nonaktif",
    score: 15,
  },
  {
    word: "notif",
    score: 15,
  },
  {
    word: "pajak",
    score: 15,
  },
  {
    word: "perbarui",
    score: 15,
  },
  {
    word: "perubahan",
    score: 15,
  },
  {
    word: "pinjaman",
    score: 15,
  },
  {
    word: "pln",
    score: 15,
  },
  {
    word: "privacy",
    score: 15,
  },
  {
    word: "promo",
    score: 15,
  },
  {
    word: "pusatbantuan",
    score: 15,
  },
  {
    word: "refund",
    score: 15,
  },
  {
    word: "restore",
    score: 15,
  },
  {
    word: "saldo",
    score: 15,
  },
  {
    word: "segera",
    score: 15,
  },
  {
    word: "sekarang",
    score: 15,
  },
  {
    word: "shopee",
    score: 15,
  },
  {
    word: "tagihan",
    score: 15,
  },
  {
    word: "terms",
    score: 15,
  },
  {
    word: "tinyurl",
    score: 15,
  },
  {
    word: "tokopedia",
    score: 15,
  },
  {
    word: "topup",
    score: 15,
  },
  {
    word: "urgent",
    score: 15,
  },
  {
    word: "va",
    score: 15,
  },
  {
    word: "valid",
    score: 15,
  },
  {
    word: "virtualaccount",
    score: 15,
  },
  {
    word: "voucher",
    score: 15,
  },
  {
    word: "akun",
    score: 10,
  },
  {
    word: "api",
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
    word: "bantuan",
    score: 10,
  },
  {
    word: "continue",
    score: 10,
  },
  {
    word: "cs",
    score: 10,
  },
  {
    word: "customer",
    score: 10,
  },
  {
    word: "dana",
    score: 10,
  },
  {
    word: "dashboard",
    score: 10,
  },
  {
    word: "data",
    score: 10,
  },
  {
    word: "domain",
    score: 10,
  },
  {
    word: "form",
    score: 10,
  },
  {
    word: "gopay",
    score: 10,
  },
  {
    word: "homepage",
    score: 10,
  },
  {
    word: "host",
    score: 10,
  },
  {
    word: "kemensos",
    score: 10,
  },
  {
    word: "kk",
    score: 10,
  },
  {
    word: "norespon",
    score: 10,
  },
  {
    word: "ovo",
    score: 10,
  },
  {
    word: "prakerja",
    score: 10,
  },
  {
    word: "privat",
    score: 10,
  },
  {
    word: "rahasia",
    score: 10,
  },
  {
    word: "sandi",
    score: 10,
  },
  {
    word: "sensitive",
    score: 10,
  },
  {
    word: "server",
    score: 10,
  },
  {
    word: "subdomain",
    score: 10,
  },
  {
    word: "subsidi",
    score: 10,
  },
  {
    word: "support",
    score: 10,
  },
  {
    word: "survey",
    score: 10,
  },
  {
    word: "terbaru",
    score: 10,
  },
  {
    word: "terima",
    score: 10,
  },
  {
    word: "update",
    score: 10,
  },
  {
    word: "url",
    score: 10,
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

if (
  homographDomain &&
  hostname !== homographDomain
) {
  score += 40;

  reasons.push(
    `Domain diduga meniru "${homographDomain}" menggunakan karakter yang mirip (homograph attack).`
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