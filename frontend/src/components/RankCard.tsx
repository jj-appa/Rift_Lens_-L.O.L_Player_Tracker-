import { useState } from "react";
import type { SeasonEntry } from "../types/player";

const TIER_COLOR: Record<string, string> = {
  Iron: "text-slate-400",
  Bronze: "text-amber-600",
  Silver: "text-slate-300",
  Gold: "text-yellow-400",
  Platinum: "text-teal-400",
  Emerald: "text-emerald-400",
  Diamond: "text-teal-400",
  Master: "text-purple-400",
  Grandmaster: "text-red-400",
  Challenger: "text-yellow-300",
  Unranked: "text-slate-500",
};

interface RankCardProps {
  label: string;
  tier: string;
  division?: string;
  lp?: number;
  wins?: number;
  losses?: number;
  history?: SeasonEntry[];
}

export default function RankCard({ label, tier, division, lp, wins, losses, history }: RankCardProps) {
  const [expanded, setExpanded] = useState(false);

  const isUnranked = tier === "Unranked" || !tier;
  const wr = wins != null && losses != null ? Math.round((wins / (wins + losses)) * 100) : null;
  const totalGames = (wins ?? 0) + (losses ?? 0);
  const winBarPct = wr ?? 0;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-section-header">
          <span className="text-amber-400/80">🏆</span> {label}
        </h3>

        {isUnranked ? (
          <div className="flex flex-col items-center justify-center py-5 gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center">
              <span className="text-slate-500 font-bold text-lg leading-none">!</span>
            </div>
            <p className="stat-label">There are no results recorded.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 border border-slate-700/60 rounded-lg flex items-center justify-center text-xl">
                🏅
              </div>
              <div>
                <p className={`font-bold text-sm ${TIER_COLOR[tier] ?? "text-slate-300"}`}>
                  {tier} {division}
                </p>
                {lp != null && <p className="stat-label">{lp} LP</p>}
              </div>
            </div>

            {wr != null && (
              <div className="flex gap-3 mt-2">
                <span className="stat-label text-teal-400">{wins}W</span>
                <span className="stat-label text-red-400">{losses}L</span>
                <span className="stat-label">{wr}% WR</span>
              </div>
            )}

            {expanded && (
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="stat-label">Total Games</span>
                  <span className="stat-value">{totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="stat-label">Win Rate</span>
                  <span className="stat-value">{winBarPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${winBarPct}%` }} />
                </div>
                <div className="flex justify-between mb-1">
                  <span className="stat-label text-teal-400">{wins}W</span>
                  <span className="stat-label text-red-400">{losses}L</span>
                </div>

                {history && history.length > 0 && (
                  <div className="border-t border-slate-800 pt-2">
                    <div className="grid grid-cols-3 pb-1 mb-1 border-b border-slate-800/70">
                      <span className="stat-label uppercase tracking-wider">Season</span>
                      <span className="stat-label uppercase tracking-wider">Tier</span>
                      <span className="stat-label uppercase tracking-wider text-right">LP</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      {history.map((entry) => (
                        <div key={entry.season} className="grid grid-cols-3 items-center py-0.5">
                          <span className="stat-label font-medium">{entry.season}</span>
                          <span className={`text-xs font-medium ${TIER_COLOR[entry.tier] ?? "text-slate-300"}`}>
                            {entry.tier} {entry.division}
                          </span>
                          <span className="stat-value text-right">{entry.lp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {!isUnranked && (
        <button onClick={() => setExpanded((v) => !v)} className="btn-expand">
          {expanded ? "Show less ‹" : "Show more ›"}
        </button>
      )}
    </div>
  );
}
