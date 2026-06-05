export interface SeasonEntry {
  season: string;
  tier: string;
  division: string;
  lp: number;
}

export interface RankInfo {
  tier: string;
  division: string;
  lp: number;
  wins: number;
  losses: number;
  history?: SeasonEntry[];
}

export interface MasteryEntry {
  champion: string;
  points: number;
  level: number;
}

export interface GameEntry {
  id: number;
  mode: string;
  result: string;
  duration: string;
  timeAgo: string;
  champion: string;
  kda: { k: number; d: number; a: number };
  placement: string;
}

export interface Player {
  name: string;
  tag: string;
  region: string;
  level: number;
  soloRank: RankInfo;
  flexRank: RankInfo;
  mastery: MasteryEntry[];
  recentGames: GameEntry[];
}
