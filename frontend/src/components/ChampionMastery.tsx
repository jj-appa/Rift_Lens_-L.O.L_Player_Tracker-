import { Swords } from "lucide-react";
import type { MasteryEntry } from "../types/player";

const MAX_SHOWN = 3;

function fmtPts(n: number) {
  return n.toLocaleString();
}

interface ChampionMasteryProps {
  mastery: MasteryEntry[];
  onShowMore?: () => void;
}

export default function ChampionMastery({ mastery, onShowMore }: ChampionMasteryProps) {
  const visible = mastery.slice(0, MAX_SHOWN);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-section-header">
          <Swords className="text-gold-400" size={14} /> Champion Mastery
        </h3>
        <div className="flex flex-col gap-2.5 overflow-hidden" style={{ maxHeight: `${MAX_SHOWN * 44}px` }}>
          {visible.map((m) => (
            <div key={m.champion} className="flex items-center gap-2">
              <div className="avatar-placeholder w-8 h-8 text-xs font-bold text-gold-400">
                {m.level}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{m.champion}</p>
                <p className="stat-label">{fmtPts(m.points)} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {onShowMore && (
        <button onClick={onShowMore} className="btn-expand">
          Show more ›
        </button>
      )}
    </div>
  );
}
