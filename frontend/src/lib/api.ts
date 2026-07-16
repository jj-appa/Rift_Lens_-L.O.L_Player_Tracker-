const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, detail: string) {
    super(detail);
    this.status = status;
  }
}

async function apiGet<T>(path: string, params: Record<string, string | number>): Promise<T> {
  const search = new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))
  );
  const res = await fetch(`${API_BASE_URL}${path}?${search}`);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body?.detail ?? res.statusText);
  }

  return res.json();
}

export interface PuuidResponse {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SummonerResponse {
  puuid: string;
  summonerLevel: number;
  profileIconId: number;
}

export interface RankedEntry {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface MasteryEntryResponse {
  championId: number;
  championLevel: number;
  championPoints: number;
}

export interface MatchParticipant {
  puuid: string;
  championId: number;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  totalDamageDealtToChampions: number;
  individualPosition: string | null;
  subteamPlacement: number | null;
}

export interface MatchDetails {
  endOfGameResult: string | null;
  gameDuration: number;
  gameType: string;
  gameMode: string;
  queueId: number;
  gameStartTimestamp: number;
  gameEndTimestamp: number | null;
  participants: MatchParticipant[];
}

export function getPuuid(riotId: string, region: string) {
  return apiGet<PuuidResponse>("/api/puuid", { riotId, region });
}

export function getSummoner(puuid: string, region: string) {
  return apiGet<SummonerResponse>("/api/summoner", { puuid, region });
}

export function getRankedInfo(puuid: string, region: string) {
  return apiGet<RankedEntry[]>("/api/ranked", { puuid, region });
}

export function getMatchHistory(puuid: string, region: string, count = 10) {
  return apiGet<string[]>("/api/match-history", { puuid, region, count });
}

export function getMatchDetails(matchId: string, region: string) {
  return apiGet<MatchDetails>(`/api/match/${matchId}`, { region });
}

export function getChampionMastery(puuid: string, region: string, count = 3) {
  return apiGet<MasteryEntryResponse[]>("/api/champion-mastery", { puuid, region, count });
}
