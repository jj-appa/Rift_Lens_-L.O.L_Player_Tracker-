import type { Player } from "../types/player";
import {
  getChampionMastery,
  getMatchDetails,
  getMatchHistory,
  getPuuid,
  getRankedInfo,
  getSummoner,
} from "./api";
import { transformMastery, transformMatches, transformRankedEntries } from "./transform";

const MATCH_COUNT = 10;

/** Fetches every piece of a player's profile from the backend and shapes it
 * into the `Player` type the UI components expect. Throws ApiError on
 * failure (e.g. 404 when the Riot ID isn't found). */
export async function fetchPlayerProfile(riotId: string, region: string): Promise<Player> {
  const account = await getPuuid(riotId, region);

  const [summoner, ranked, mastery, matchIds] = await Promise.all([
    getSummoner(account.puuid, region),
    getRankedInfo(account.puuid, region),
    getChampionMastery(account.puuid, region),
    getMatchHistory(account.puuid, region, MATCH_COUNT),
  ]);

  const matches = await Promise.all(matchIds.map((id) => getMatchDetails(id, region)));

  const { soloRank, flexRank } = transformRankedEntries(ranked);

  return {
    name: account.gameName,
    tag: account.tagLine,
    region,
    level: summoner.summonerLevel,
    soloRank,
    flexRank,
    mastery: transformMastery(mastery),
    recentGames: transformMatches(matches, account.puuid),
  };
}
