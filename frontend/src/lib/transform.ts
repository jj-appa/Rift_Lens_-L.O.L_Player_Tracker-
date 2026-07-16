import type { GameEntry, MasteryEntry, RankInfo } from "../types/player";
import { getChampionName } from "../data/champions";
import { getQueueLabel } from "../data/queues";
import type { MasteryEntryResponse, MatchDetails, RankedEntry } from "./api";

const UNRANKED: RankInfo = {
  tier: "Unranked",
  division: "",
  lp: 0,
  wins: 0,
  losses: 0,
};

function titleCase(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function toRankInfo(entry: RankedEntry): RankInfo {
  return {
    tier: titleCase(entry.tier),
    division: entry.rank,
    lp: entry.leaguePoints,
    wins: entry.wins,
    losses: entry.losses,
  };
}

export function transformRankedEntries(entries: RankedEntry[]): {
  soloRank: RankInfo;
  flexRank: RankInfo;
} {
  const solo = entries.find((e) => e.queueType === "RANKED_SOLO_5x5");
  const flex = entries.find((e) => e.queueType === "RANKED_FLEX_SR");

  return {
    soloRank: solo ? toRankInfo(solo) : UNRANKED,
    flexRank: flex ? toRankInfo(flex) : UNRANKED,
  };
}

export function transformMastery(
  masteries: MasteryEntryResponse[],
): MasteryEntry[] {
  return masteries.map((m) => ({
    champion: getChampionName(m.championId),
    points: m.championPoints,
    level: m.championLevel,
  }));
}

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

function formatTimeAgo(timestampMs: number): string {
  const diffMs = Date.now() - timestampMs;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;

  if (diffMs < hour)
    return `${Math.max(1, Math.floor(diffMs / minute))} minutes ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hours ago`;
  if (diffMs < week) return `${Math.floor(diffMs / day)} days ago`;
  if (diffMs < month) return `${Math.floor(diffMs / week)} weeks ago`;
  return `${Math.floor(diffMs / month)} months ago`;
}

/** Converts one raw match into the current player's GameEntry, or null if
 * the player's puuid isn't among the match's participants. */
export function transformMatch(
  match: MatchDetails,
  puuid: string,
  id: number,
): GameEntry | null {
  const participant = match.participants.find((p) => p.puuid === puuid);
  if (!participant) return null;

  const playedAt = match.gameEndTimestamp ?? match.gameStartTimestamp;

  return {
    id,
    mode: getQueueLabel(match.queueId),
    result: participant.win ? "Victory" : "Defeat",
    duration: formatDuration(match.gameDuration),
    timeAgo: formatTimeAgo(playedAt),
    champion: getChampionName(participant.championId),
    kda: {
      k: participant.kills,
      d: participant.deaths,
      a: participant.assists,
    },
    placement: participant.subteamPlacement
      ? `#${participant.subteamPlacement}`
      : "",
    cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
    dmg: participant.totalDamageDealtToChampions,
  };
}

export function transformMatches(
  matches: MatchDetails[],
  puuid: string,
): GameEntry[] {
  return matches
    .map((match, index) => transformMatch(match, puuid, index + 1))
    .filter((entry): entry is GameEntry => entry !== null);
}
