import { useState } from "react";
import type { Player } from "./types/player";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SectionTabs from "./components/SectionTabs";
import ProfileSidebar from "./components/ProfileSidebar";
import RecentGames from "./components/RecentGames";
import NotFound from "./components/NotFound";
import { MOCK_PLAYERS } from "./data/mockPlayers";

const TABS = ["Summary", "Mastery", "Champions"];

export default function App() {
  const [region, setRegion] = useState("NA");
  const [query, setQuery] = useState("");
  const [player, setPlayer] = useState<Player | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("Summary");

  function handleSearch() {
    if (!query.trim()) return;
    // TODO: replace with real API call
    const match = MOCK_PLAYERS[query.trim().toLowerCase()];
    if (match) {
      setPlayer({ ...match, name: query.trim(), region });
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
    <div className="min-h-screen bg-slate-900 text-slate-100">
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
          query={query}
          region={region}
          setRegion={setRegion}
          onRetry={handleSearch}
        />
      )}

      {/* ── Homepage ── */}
      {!player && !notFound && (
        <div className="flex flex-col items-center bg-gradient-to-b from-slate-900 to-slate-800 min-h-[calc(100vh-57px)]">
          <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-center">
              League of Legends
              <span className="block text-yellow-400">Player Tracker</span>
            </h1>
            <p className="text-slate-400 mb-10 text-center max-w-sm">
              Search any summoner to view their stats, rank, and match history.
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
                <div className="bg-slate-800 rounded-xl p-10 text-center text-slate-500">
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
