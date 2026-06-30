"use client";

import { useState } from "react";
import UrlForm from "@/components/UrlForm";
import { isValidUrl } from "@/lib/validate-url";
import { normalizeUrl } from "@/lib/normalize-url";
import { AnalysisResult } from "@/types/analysis";
import ResultCard from "@/components/ResultCard";
import { PreviewData } from "@/types/preview";
import PreviewCard from "@/components/PreviewCard";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const normalizedUrl = normalizeUrl(url);

    if (!isValidUrl(normalizedUrl)) {
      setError("Masukkan URL yang valid.");
      setResult(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPreview(null);
      setResult(null);

      const previewResponse = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      if (previewResponse.ok) {
        const previewData = await previewResponse.json();
        setPreview(previewData);
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setResult(data.result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan.");
      }
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen hero-bg grid-pattern">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400" />

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">

        {/* ── Hero Section ── */}
        <div className="text-center mb-10">
          {/* Shield Illustration */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-blue-200 opacity-40 blur-xl scale-125" />
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 shield-glow"
                >
                  {/* Shield body */}
                  <path
                    d="M48 8L16 20V44C16 62.4 30.4 79.2 48 84C65.6 79.2 80 62.4 80 44V20L48 8Z"
                    fill="url(#shieldGrad)"
                    opacity="0.15"
                  />
                  <path
                    d="M48 8L16 20V44C16 62.4 30.4 79.2 48 84C65.6 79.2 80 62.4 80 44V20L48 8Z"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  {/* Checkmark */}
                  <path
                    d="M33 48L43 58L63 38"
                    stroke="#2563EB"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Scan lines */}
                  <path
                    d="M26 36H38"
                    stroke="#93C5FD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M58 36H70"
                    stroke="#93C5FD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <defs>
                    <linearGradient id="shieldGrad" x1="16" y1="8" x2="80" y2="84" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB" />
                      <stop offset="1" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase">
              Cyber Security Tool
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#172554] mb-3 tracking-tight">
            Safety Link Checker
          </h1>
          <p className="text-[#1E3A8A] text-sm sm:text-base max-w-md mx-auto leading-relaxed opacity-80">
            Periksa keamanan URL sebelum mengkliknya. Deteksi tautan berbahaya,
            phishing, dan konten mencurigakan secara instan.
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className="glass rounded-2xl border border-[#DBEAFE] shadow-xl shadow-blue-100/60 p-6 sm:p-8 fade-in-up">

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Deteksi Phishing", "Analisis Real-time", "Skor Risiko"].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <UrlForm
            url={url}
            onChange={setUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {/* Error State */}
          {error && (
            <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 fade-in-up">
              <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-6 fade-in-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                <span className="text-sm font-medium text-[#1E3A8A] scan-pulse">
                  Sedang menganalisis URL...
                </span>
              </div>
              {/* Skeleton loading bars */}
              <div className="space-y-2 mt-4">
                <div className="h-2 bg-blue-100 rounded-full animate-pulse w-full" />
                <div className="h-2 bg-blue-100 rounded-full animate-pulse w-4/5" />
                <div className="h-2 bg-blue-100 rounded-full animate-pulse w-3/5" />
              </div>
            </div>
          )}

          {/* Preview Card */}
          {preview && (
            <div className="mt-5 fade-in-up">
              <PreviewCard preview={preview} />
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="mt-5 fade-in-up">
              <ResultCard result={result} />
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-blue-300 mt-8">
          Safety Link Checker · Lindungi diri dari tautan berbahaya
        </p>
      </div>
    </main>
  );
}