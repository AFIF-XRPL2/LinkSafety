type UrlFormProps = {
  url: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function UrlForm({
  url,
  onChange,
  onSubmit,
}: UrlFormProps) {
  return (
    <>
      <input
  type="text"
  value={url}
  onChange={(e) => onChange(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }}
  placeholder="Tempel link di sini..."
  className="w-full border rounded-lg p-3 mb-4"
/>

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 text-white p-3 rounded-lg cursor-pointer"
      >
        Periksa Link
      </button>
    </>
  );
}