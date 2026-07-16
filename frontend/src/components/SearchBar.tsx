import { REGIONS } from "../data/constraints";

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
      className="flex rounded-lg overflow-hidden border border-slate-700 focus-within:border-gold-400 transition-colors shadow-lg w-full"
    >
      <div className="relative flex-shrink-0">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="select-gold h-full px-3 pr-7 border-r border-slate-700"
          aria-label="Select region"
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <span className="select-caret top-1/2 -translate-y-1/2">▼</span>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Add Gamertag + #Tagline"
        className={`flex-1 bg-slate-900 px-4 ${inputPy} text-base tracking-wide text-slate-100 placeholder-slate-500 focus:outline-none min-w-0`}
      />

      <button type="submit" className={`btn-primary ${btnPx}`}>
        Search
      </button>
    </form>
  );
}
