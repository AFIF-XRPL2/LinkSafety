import { AnalysisResult } from "@/types/analysis";

type Props = {
  result: AnalysisResult;
};

const statusConfig = {
  safe: {
    label: "Aman",
    color: "#16A34A",
    bg: "bg-green-50",
    border: "border-green-200",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    barColor: "bg-green-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  suspicious: {
    label: "Mencurigakan",
    color: "#D97706",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-800",
    barColor: "bg-yellow-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  dangerous: {
    label: "Berbahaya",
    color: "#DC2626",
    bg: "bg-red-50",
    border: "border-red-200",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    barColor: "bg-red-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
};

export default function ResultCard({ result }: Props) {
  const config = statusConfig[result.status];

  // Risk score: 0 = safe (low bar), 100 = dangerous (full bar)
  const progressWidth = result.score;

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} overflow-hidden shadow-sm transition-all duration-200`}>

      {/* Header */}
      <div className="px-5 py-4 border-b border-current/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span style={{ color: config.color }}>{config.icon}</span>
          <h2 className="font-bold text-[#172554] text-base">Hasil Analisis</h2>
        </div>

        {/* Status Badge */}
        <span
          className={`
            inline-flex items-center gap-1.5 px-3 py-1
            rounded-full text-xs font-bold
            ${config.badgeBg} ${config.badgeText}
            border border-current/20
          `}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: config.color }}
          />
          {config.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-5">

        {/* Risk Score with Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#172554] uppercase tracking-wide">
              Skor Risiko
            </span>
            <span
              className="text-sm font-bold tabular-nums"
              style={{ color: config.color }}
            >
              {result.score}
              <span className="text-xs font-normal text-[#1E3A8A] opacity-60">/100</span>
            </span>
          </div>

          {/* Track */}
          <div className="h-2.5 bg-white/70 rounded-full border border-current/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${config.barColor}`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          {/* Scale labels */}
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-green-600 font-medium">Aman</span>
            <span className="text-[10px] text-yellow-600 font-medium">Sedang</span>
            <span className="text-[10px] text-red-600 font-medium">Berbahaya</span>
          </div>
        </div>

        {/* Reasons */}
        <div>
          <span className="text-xs font-semibold text-[#172554] uppercase tracking-wide mb-2.5 block">
            Detail Temuan
          </span>
          <ul className="space-y-2">
            {result.reasons.map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-2.5 text-sm text-[#1E3A8A]"
              >
                <span
                  className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: `${config.color}18` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                </span>
                <span className="leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}