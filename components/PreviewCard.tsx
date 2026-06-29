import { PreviewData } from "@/types/preview";

type Props = {
  preview: PreviewData;
};

export default function PreviewCard({
  preview,
}: Props) {
  return (
    <div className="mt-4 border rounded-xl p-4 bg-gray-50">
      {preview.image && (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={preview.image}
      alt={preview.title}
      className="w-full h-40 object-cover rounded-lg mb-3"
    />
  </>
)}

      <h2 className="font-bold text-lg">
        {preview.title || "Tanpa Judul"}
      </h2>

      <p className="text-sm text-gray-600 mt-1">
        {preview.description ||
          "Tidak ada deskripsi."}
      </p>

      <p className="text-xs text-gray-400 mt-2">
        {preview.url}
      </p>
    </div>
  );
}