// Subset of Riot's queues.json (https://static.developer.riotgames.com/docs/lol/queues.json)
// covering the queue IDs players actually see in match history.
export const QUEUE_LABELS: Record<number, string> = {
  400: "Normal Draft",
  420: "Ranked Solo",
  430: "Normal Blind",
  440: "Ranked Flex",
  450: "ARAM",
  490: "Quickplay",
  700: "Clash",
  900: "URF",
  1300: "Nexus Blitz",
  1700: "Arena",
  1710: "Arena",
};

export function getQueueLabel(queueId: number): string {
  return QUEUE_LABELS[queueId] ?? "ARAM MAYHEM";
}
