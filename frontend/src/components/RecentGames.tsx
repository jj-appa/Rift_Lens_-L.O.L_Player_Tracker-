import { useState } from "react";
import { Bot, Clock } from "lucide-react";
import type { Player } from "../types/player";

const DEFAULT_SHOWN = 5;
const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function fmtDmg(n?: number) {
  if (n == null) return "—";
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

function ratioColor(ratio: number) {
  if (ratio >= 6) return "text-gold-400";
  if (ratio >= 3) return "text-teal-400";
  return "text-slate-300";
}

interface RecentGamesProps {
  player: Player;
}

export default function RecentGames({ player }: RecentGamesProps) {
  const [expanded, setExpanded] = useState(false);

  const hasGames = player.recentGames.length > 0;
  const hasMore = player.recentGames.length > DEFAULT_SHOWN;

  const visible = expanded
    ? player.recentGames
    : player.recentGames.slice(0, DEFAULT_SHOWN);

  const total = visible.length;
  const wins = visible.filter((g) => g.result === "Victory").length;
  const losses = total - wins;
  const winPct = total > 0 ? Math.round((wins / total) * 100) : 0;

  const avgK = total > 0 ? (visible.reduce((s, g) => s + g.kda.k, 0) / total).toFixed(1) : "0.0";
  const avgD = total > 0 ? (visible.reduce((s, g) => s + g.kda.d, 0) / total).toFixed(1) : "0.0";
  const avgA = total > 0 ? (visible.reduce((s, g) => s + g.kda.a, 0) / total).toFixed(1) : "0.0";
  const kdaRatio = (
    (parseFloat(avgK) + parseFloat(avgA)) / Math.max(parseFloat(avgD), 1)
  ).toFixed(2);

  const winArc = total > 0 ? (wins / total) * CIRCUMFERENCE : 0;
  const lossArc = CIRCUMFERENCE - winArc;

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-section-header">
          <Clock className="text-gold-400" size={14} /> Recent Games
        </h2>

        {!hasGames ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="relative">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center opacity-60">
                <Bot className="text-gold-400" size={32} />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-slate-400 font-bold text-xs leading-none">?</span>
              </div>
            </div>
            <p className="text-sm text-slate-500">There are no recent match records.</p>
          </div>
        ) : (
          <>
            {/* Win/Loss chart */}
            <div className="flex items-center gap-5 mb-4 p-3">
              <div className="relative flex-shrink-0">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle
                    cx="40" cy="40" r={RADIUS}
                    fill="none" stroke="#ef4444" strokeWidth="10"
                    strokeDasharray={`${lossArc} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-winArc}
                    transform="rotate(-90 40 40)"
                    strokeLinecap="butt"
                  />
                  <circle
                    cx="40" cy="40" r={RADIUS}
                    fill="none" stroke="#2dd4bf" strokeWidth="10"
                    strokeDasharray={`${winArc} ${CIRCUMFERENCE}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 40 40)"
                    strokeLinecap="butt"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                  {winPct}%
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[13px] text-slate-400 tracking-wide">
                  <span className="text-slate-200 font-medium">{total}G</span>{" "}
                  <span className="text-teal-400">{wins}W</span>{" "}
                  <span className="text-red-400">{losses}L</span>
                </p>
                <p className="text-[13px] text-slate-400 tracking-wide">
                  {avgK} / <span className="text-red-400">{avgD}</span> / {avgA}
                </p>
                <p className="text-lg font-bold leading-tight">{kdaRatio} : 1</p>
                <p className="text-[13px] text-slate-400 tracking-wide">Avg KDA</p>
              </div>
            </div>

            {/* Game list */}
            <div className="flex flex-col gap-2">
              {visible.map((game) => {
                const isWin = game.result === "Victory";
                const ratio = (game.kda.k + game.kda.a) / Math.max(game.kda.d, 1);

                return (
                  <div
                    key={game.id}
                    className={`rounded pl-2.5 pr-3 py-2.5 flex items-center gap-3 border-l-4 ${
                      isWin ? "bg-teal-900/10 border-teal-500" : "bg-red-900/10 border-red-500"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 ${
                        isWin ? "bg-teal-600" : "bg-red-600"
                      }`}
                    >
                      {isWin ? "W" : "L"}
                    </span>

                    <div className="min-w-0 w-28 flex-shrink-0">
                      <p className="font-semibold text-sm truncate">{game.champion}</p>
                      <p className="text-[13px] text-slate-400 uppercase tracking-wider truncate">{game.mode}</p>
                    </div>

                    <div className="text-center flex-shrink-0 w-16">
                      <p className={`font-display text-base font-bold leading-tight ${ratioColor(ratio)}`}>
                        {ratio.toFixed(2)}
                      </p>
                      <p className="text-[13px] text-slate-400 tracking-wide">
                        {game.kda.k}/<span className="text-red-400">{game.kda.d}</span>/{game.kda.a}
                      </p>
                    </div>

                    <div className="text-center flex-shrink-0 w-14 hidden sm:block">
                      <p className="text-sm font-medium text-slate-200">{game.cs ?? "—"}</p>
                      <p className="text-[12px] text-slate-400 uppercase tracking-wider">CS</p>
                    </div>

                    <div className="text-center flex-shrink-0 w-14 hidden sm:block">
                      <p className="text-sm font-medium text-slate-200">{fmtDmg(game.dmg)}</p>
                      <p className="text-[12px] text-slate-400 uppercase tracking-wider">DMG</p>
                    </div>

                    <div className="text-right flex-1 min-w-0">
                      <p className="text-sm text-slate-300 truncate">{game.duration}</p>
                      <p className="text-[13px] text-slate-400 tracking-wide truncate">{game.timeAgo}</p>
                      {game.placement && (
                        <p className="text-[13px] text-slate-500 tracking-wide truncate">{game.placement}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="btn-expand"
        >
          {expanded ? "Show less ‹" : "Show more ›"}
        </button>
      )}
    </div>
  );
}
