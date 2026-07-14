import SearchBar from "./SearchBar";

interface NavBarProps {
  onLogoClick?: () => void;
  showSearch?: boolean;
  region?: string;
  setRegion?: (r: string) => void;
  query?: string;
  setQuery?: (q: string) => void;
  onSearch?: () => void;
}

export default function NavBar({
  onLogoClick,
  showSearch = false,
  region = "NA",
  setRegion,
  query = "",
  setQuery,
  onSearch,
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-10">
      <button
        onClick={onLogoClick}
        className="group flex items-center gap-2 whitespace-nowrap"
      >
        <span className="w-2.5 h-2.5 rotate-45 bg-amber-400 group-hover:bg-amber-300 transition-colors flex-shrink-0" />
        <span className="font-display font-bold text-slate-100 group-hover:text-amber-300 text-lg tracking-[0.2em] uppercase transition-colors">
          Rift Lens
        </span>
      </button>

      {showSearch && setRegion && setQuery && onSearch && (
        <div className="w-full sm:flex-1 sm:max-w-[50%]">
          <SearchBar
            region={region}
            setRegion={setRegion}
            query={query}
            setQuery={setQuery}
            onSearch={onSearch}
            size="sm"
          />
        </div>
      )}
    </header>
  );
}
