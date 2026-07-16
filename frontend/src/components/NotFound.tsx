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
      <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-slate-100 mb-3">
        No search results for "<span className="text-teal-400">{query}</span>"
        in the {regionLabel} region.
      </h2>

      <h3 className="text-slate-300 text-lg sm:text-xl font-semibold tracking-wide max-w-md sm:max-w-none sm:whitespace-nowrap mb-1 leading-relaxed">
        Please double-check the game name and tag, and try again.
      </h3>

      <p className="text-slate-500 text-base tracking-wide max-w-md mb-5 leading-relaxed">
        Due to changes in the Riot ID system, searches may not be successful.
      </p>

      <div className="flex items-center gap-3 text-base tracking-wide text-slate-400">
        <span>Wrong region?</span>
        <div className="relative flex items-center">
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              onRetry();
            }}
            className="select-gold pl-3 pr-7 py-1.5 rounded-lg border border-slate-700 focus:border-gold-400"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <span className="select-caret">▼</span>
        </div>
      </div>
    </div>
  );
}
