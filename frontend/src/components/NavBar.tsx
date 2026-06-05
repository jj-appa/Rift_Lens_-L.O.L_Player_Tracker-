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
    <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 px-4 sm:px-6 py-3 flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-10">
      <button
        onClick={onLogoClick}
        className="font-bold text-yellow-400 text-lg tracking-wide whitespace-nowrap hover:text-yellow-300 transition-colors"
      >
        LOL Tracker
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
