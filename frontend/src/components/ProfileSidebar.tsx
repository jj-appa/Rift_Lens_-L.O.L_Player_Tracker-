import type { Player } from "../types/player";
import RankCard from "./RankCard";
import ChampionMastery from "./ChampionMastery";

interface ProfileSidebarProps {
  player: Player;
  onShowMoreMastery?: () => void;
}

export default function ProfileSidebar({ player, onShowMoreMastery }: ProfileSidebarProps) {
  return (
    <aside className="w-full lg:w-60 lg:flex-shrink-0 flex flex-col gap-4">
      {/* Profile card */}
      <div className="bg-slate-800 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-slate-700 flex items-center justify-center text-3xl select-none">
              🎮
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-600 text-xs px-2 rounded-md font-bold whitespace-nowrap">
              {player.level}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-base leading-tight truncate">
              {player.name}
            </p>
            <p className="text-slate-400 text-sm">#{player.tag}</p>
            <p className="text-slate-500 text-xs">{player.region}</p>
          </div>
        </div>

        <button className="btn-secondary w-20 mt-1">
          Update
        </button>
        <p className="text-xs text-slate-600 text-center">
          Last updated: just now
        </p>
      </div>

      {/* Rank cards — side-by-side on sm/md, stacked on lg (sidebar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 items-start">
        <RankCard
          label="Ranked Solo / Duo"
          tier={player.soloRank.tier}
          division={player.soloRank.division}
          lp={player.soloRank.lp}
          wins={player.soloRank.wins}
          losses={player.soloRank.losses}
          history={player.soloRank.history}
        />
        <RankCard
          label="Ranked Flex"
          tier={player.flexRank.tier}
          division={player.flexRank.division}
          lp={player.flexRank.lp}
          wins={player.flexRank.wins}
          losses={player.flexRank.losses}
          history={player.flexRank.history}
        />
      </div>

      <ChampionMastery mastery={player.mastery} onShowMore={onShowMoreMastery} />
    </aside>
  );
}
