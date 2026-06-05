const REGIONS = ["NA", "EU", "KR", "BR", "LAN", "LAS", "OCE", "TR", "RU", "JP"];

interface SearchBarProps {
  region: string;
  setRegion: (r: string) => void;
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  size?: "sm" | "md";
}

export default function SearchBar({
  region,
  setRegion,
  query,
  setQuery,
  onSearch,
  size = "md",
}: SearchBarProps) {
  const inputPy = size === "sm" ? "py-2" : "py-3";
  const btnPx = size === "sm" ? "px-4" : "px-5";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="flex rounded-xl overflow-hidden border border-slate-600 focus-within:border-yellow-400 transition-colors shadow-lg w-full"
    >
      <div className="relative flex-shrink-0">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="h-full bg-slate-700 text-slate-100 text-sm font-semibold px-3 pr-7 appearance-none cursor-pointer focus:outline-none border-r border-slate-600 hover:bg-slate-600 transition-colors"
          aria-label="Select region"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
          ▼
        </span>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search summoner name..."
        className={`flex-1 bg-slate-800 px-4 ${inputPy} text-sm text-slate-100 placeholder-slate-500 focus:outline-none min-w-0`}
      />

      <button
        type="submit"
        className={`btn-primary ${btnPx}`}
      >
        Search
      </button>
    </form>
  );
}
