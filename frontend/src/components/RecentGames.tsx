import { useState } from "react";
import type { Player } from "../types/player";

const DEFAULT_SHOWN = 3;
const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

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
        <h2 className="font-semibold mb-4">Recent Games</h2>

        {!hasGames ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-14 gap-3">
            <div className="relative">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-4xl opacity-60">
                🤖
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
                  <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="#334155" strokeWidth="10" />
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
                    fill="none" stroke="#3b82f6" strokeWidth="10"
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
                <p className="text-xs text-slate-400">
                  <span className="text-slate-200 font-medium">{total}G</span>{" "}
                  <span className="text-blue-400">{wins}W</span>{" "}
                  <span className="text-red-400">{losses}L</span>
                </p>
                <p className="text-xs text-slate-500">
                  {avgK} / <span className="text-red-400">{avgD}</span> / {avgA}
                </p>
                <p className="text-lg font-bold leading-tight">{kdaRatio} : 1</p>
                <p className="text-xs text-slate-400">Avg KDA</p>
              </div>
            </div>

            {/* Game list */}
            <div
              className="flex flex-col gap-2 overflow-hidden"
              style={!expanded ? { maxHeight: `${DEFAULT_SHOWN * 85}px` } : undefined}
            >
              {visible.map((game) => {
                const isWin = game.result === "Victory";
                const ratio = ((game.kda.k + game.kda.a) / Math.max(game.kda.d, 1)).toFixed(2);

                return (
                  <div
                    key={game.id}
                    className={`rounded-lg p-3 flex items-center gap-4 border-l-4 ${
                      isWin ? "bg-blue-900/20 border-blue-500" : "bg-red-900/20 border-red-500"
                    }`}
                  >
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      🐱
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold ${isWin ? "text-blue-400" : "text-red-400"}`}>
                          {game.result}
                        </span>
                        <span className="text-xs text-slate-400">{game.mode}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{game.timeAgo}</span>
                      </div>
                      <p className="font-semibold text-sm mt-0.5">{game.champion}</p>
                      <p className="text-xs text-slate-400">{game.duration}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm">
                        {game.kda.k}/{game.kda.d}/{game.kda.a}
                      </p>
                      <p className="text-xs text-slate-400">{ratio}:1 KDA</p>
                      {game.placement && (
                        <p className="text-xs text-slate-500 mt-0.5">{game.placement}</p>
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
