export interface ParsedRiotId {
  gameName: string;
  tagLine: string;
}

export function parseRiotId(raw: string): ParsedRiotId {
  const cleaned = raw.replace(/\s+/g, "");
  const [gameName = "", tagLine = ""] = cleaned.split("#");
  return { gameName, tagLine };
}
