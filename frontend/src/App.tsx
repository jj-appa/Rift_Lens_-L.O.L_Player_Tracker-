import { useState } from "react";
import type { Player } from "./types/player";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SectionTabs from "./components/SectionTabs";
import ProfileSidebar from "./components/ProfileSidebar";
import RecentGames from "./components/RecentGames";
import NotFound from "./components/NotFound";
import { MOCK_PLAYERS } from "./data/mockPlayers";
import { parseRiotId } from "./utils/riotId";

const TABS = ["Summary", "Mastery", "Champions"];

export default function App() {
  const [region, setRegion] = useState("NA");
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [player, setPlayer] = useState<Player | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("Summary");

  function handleSearch() {
    if (!query.trim()) return;
    setSearchedQuery(query.trim());
    // TODO: replace with real API call — pass gameName + tagLine to /api/puuid
    const { gameName, tagLine } = parseRiotId(query);
    if (!gameName) {
      setPlayer(null);
      setNotFound(true);
      return;
    }

    const match = Object.values(MOCK_PLAYERS).find(
      (p) => p.name.replace(/\s+/g, "").toLowerCase() === gameName.toLowerCase()
    );

    if (match) {
      setPlayer({ ...match, name: gameName, tag: tagLine || match.tag, region });
      setNotFound(false);
      setActiveTab("Summary");
    } else {
      setPlayer(null);
      setNotFound(true);
    }
  }

  function handleLogoClick() {
    setPlayer(null);
    setNotFound(false);
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <NavBar
        onLogoClick={handleLogoClick}
        showSearch={!!player || notFound}
        region={region}
        setRegion={setRegion}
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      {/* ── Not found ── */}
      {notFound && !player && (
        <NotFound
          query={searchedQuery}
          region={region}
          setRegion={setRegion}
          onRetry={handleSearch}
        />
      )}

      {/* ── Homepage ── */}
      {!player && !notFound && (
        <div className="flex flex-col items-center min-h-[calc(100vh-57px)]">
          <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-20">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3 text-center tracking-wide text-amber-400">
              Rift Lens
            </h1>
            <p className="text-slate-400 mb-10 text-center max-w-sm">
              Search any League of Legends summoner to view their stats, rank, and match history.
            </p>
            <div className="w-full max-w-xl">
              <SearchBar
                region={region}
                setRegion={setRegion}
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
              />
            </div>
          </main>
        </div>
      )}

      {/* ── Profile page ── */}
      {player && (
        <>
          <SectionTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Two-column layout — stacks vertically on small screens */}
          <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-5 items-start">
            <ProfileSidebar
              player={player}
              onShowMoreMastery={() => setActiveTab("Mastery")}
            />

            <div className="flex-1 min-w-0 w-full">
              {activeTab === "Summary" && <RecentGames player={player} />}
              {activeTab !== "Summary" && (
                <div className="card p-10 text-center text-slate-500">
                  <p className="text-4xl mb-3">🚧</p>
                  <p className="font-medium">{activeTab} — coming soon</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
