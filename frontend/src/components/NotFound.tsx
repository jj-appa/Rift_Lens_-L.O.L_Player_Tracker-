import { REGIONS, REGION_LABEL } from "../data/constraints";

interface NotFoundProps {
  query: string;
  region: string;
  setRegion: (r: string) => void;
  onRetry: () => void;
}

export default function NotFound({
  query,
  region,
  setRegion,
  onRetry,
}: NotFoundProps) {
  const regionLabel = REGION_LABEL[region] ?? region;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3">
        No search results for "<span className="text-teal-400">{query}</span>"
        in the {regionLabel} region.
      </h2>

      <p className="text-slate-500 text-sm max-w-md mb-8 leading-relaxed">
        Due to changes in the Riot ID system, searches may not be successful.
        <br />
        Please double-check the game name and tag, and try again.
      </p>

      <div className="flex items-center gap-3 text-sm text-slate-400">
        <span>Wrong region?</span>
        <div className="relative flex items-center">
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              onRetry();
            }}
            className="appearance-none bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold pl-3 pr-7 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400 transition-colors cursor-pointer text-sm"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 text-slate-400 text-xs">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}
