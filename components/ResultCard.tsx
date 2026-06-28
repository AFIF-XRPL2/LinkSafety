import { AnalysisResult } from "@/types/analysis";

type Props = {
  result: AnalysisResult;
};

export default function ResultCard({
  result,
}: Props) {
  const statusText = {
    safe: "✅ Aman",
    suspicious: "⚠️ Mencurigakan",
    dangerous: "❌ Berbahaya",
  };

  return (
    <div className="mt-6 rounded-lg border p-5">
      <h2 className="mb-4 text-xl font-bold">
        Hasil Analisis
      </h2>

      <p className="mb-2">
        <strong>Status:</strong>{" "}
        {statusText[result.status]}
      </p>

      <p className="mb-3">
        <strong>Skor Risiko:</strong>{" "}
        {result.score}/100
      </p>

      <div>
        <strong>Alasan:</strong>

        <ul className="mt-2 list-disc pl-5">
          {result.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}