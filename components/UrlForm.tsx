type UrlFormProps = {
  url: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export default function UrlForm({
  url,
  onChange,
  onSubmit,
  loading = false,
}: UrlFormProps) {
  return (
    <div className="space-y-3">
      {/* Input wrapper with icon */}
      <div className="relative group">
        {/* Link icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors duration-200 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit();
          }}
          placeholder="https://domain.com/contoh-link-tautan"
          disabled={loading}
          className="
            w-full pl-10 pr-4 py-3.5
            text-sm text-[#172554]
            placeholder:text-blue-300
            bg-white
            border border-[#DBEAFE]
            rounded-xl
            shadow-sm
            outline-none
            transition-all duration-200
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:shadow-md
            hover:border-blue-300
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2
          px-6 py-3.5
          text-sm font-semibold text-white
          bg-[#2563EB]
          rounded-xl
          shadow-sm shadow-blue-200
          transition-all duration-200
          hover:bg-[#1D4ED8] hover:shadow-md hover:shadow-blue-300/50 hover:-translate-y-0.5
          active:translate-y-0 active:shadow-sm
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
          cursor-pointer
        "
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Menganalisis...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Periksa Keamanan Link</span>
          </>
        )}
      </button>
    </div>
  );
}