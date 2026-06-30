import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://link-safety.vercel.app"
  ),

  title: "Cek Potensi Keamanan URL & Phishing",
  description:
    "Periksa potensi keamanan url website yang ingin anda kunjungi.",

  openGraph: {
    title:
      "Cek Potensi Keamanan URL & Phishing",

    description:
      "Periksa potensi keamanan url website yang ingin anda kunjungi.",

    url: "/",
    siteName: "LinkSafety",

    images: [
      {
        url:
           "https://link-safety.vercel.app/tumbnaillinkguard.jpeg",
        width: 1200,
        height: 630,
        alt: "LinkSafety",
      },
    ],

    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Cek Potensi Keamanan URL & Phishing",
    description:
      "Periksa potensi keamanan url website yang ingin anda kunjungi.",
    images: [
       "https://link-safety.vercel.app/tumbnaillinkguard.jpeg",
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
