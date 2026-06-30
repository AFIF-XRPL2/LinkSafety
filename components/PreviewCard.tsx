import { PreviewData } from "@/types/preview";

type Props = {
  preview: PreviewData;
};

export default function PreviewCard({ preview }: Props) {
  // Extract domain from URL for display
  let domain = "";
  try {
    domain = new URL(preview.url).hostname;
  } catch {
    domain = preview.url;
  }

  return (
    <div className="rounded-xl border border-[#DBEAFE] bg-white/80 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
      {/* Section label */}
      <div className="px-4 py-2.5 border-b border-[#DBEAFE] bg-blue-50/60 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
          Pratinjau Halaman
        </span>
      </div>

      {/* Image */}
      {preview.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview.image}
          alt={preview.title}
          className="w-full h-36 object-cover"
        />
      )}

      {/* Content */}
      <div className="px-4 py-3.5">
        {/* Domain badge */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
          <span className="text-xs text-blue-500 font-mono truncate max-w-[200px]">
            {domain}
          </span>
        </div>

        <h2 className="font-semibold text-[#172554] text-sm leading-snug line-clamp-2 mb-1.5">
          {preview.title || "Tanpa Judul"}
        </h2>

        <p className="text-xs text-[#1E3A8A] opacity-70 line-clamp-2 leading-relaxed">
          {preview.description || "Tidak ada deskripsi tersedia."}
        </p>
      </div>
    </div>
  );
}