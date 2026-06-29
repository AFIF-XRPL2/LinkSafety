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

  const [result, setResult] =
  useState<AnalysisResult | null>(null);

  const [preview, setPreview] =
  useState<PreviewData | null>(null);

  const [loading, setLoading] =
  useState(false);

const [error, setError] =
  useState("");

  

  const handleSubmit = async () => {
  const normalizedUrl =
    normalizeUrl(url);

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

    const previewResponse =
  await fetch("/api/preview", {
    method: "POST",
    headers: {
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      url: normalizedUrl,
    }),
  });

if (previewResponse.ok) {
  const previewData =
    await previewResponse.json();

  setPreview(previewData);
}

    const response =
      await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          url,
        }),
      });

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error
      );
    }

    setResult(data.result);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(
        "Terjadi kesalahan."
      );
    }

    setResult(null);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Safety Link Checker
        </h1>

        <UrlForm
          url={url}
          onChange={setUrl}
          onSubmit={handleSubmit}
        />
        {preview && (
  <PreviewCard
    preview={preview}
  />
)}
        {error && (
  <p className="mt-4 text-red-500">
    {error}
  </p>
)}
{loading && (
  <p className="mt-4">
    Sedang menganalisis...
  </p>
)}
        {result && (
  <ResultCard
    result={result}
  />
)}
      </div>
    </main>
  );
}