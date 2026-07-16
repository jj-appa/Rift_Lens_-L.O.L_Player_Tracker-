import {
  ArrowLeft,
  Clock,
  Code,
  Code2,
  Container,
  Database,
  Globe,
  Palette,
  Server,
  Shield,
  Swords,
  Trophy,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const FEATURES = [
  {
    title: "Ranked Analytics",
    description:
      "Track Solo/Duo and Flex queue standings - current tier, division, LP, and win/loss record for any searched summoner.",
    color: "#c8aa6e",
    icon: Trophy,
  },
  {
    title: "Match History",
    description:
      "Per game breakdown of KDA, CS, damage dealt, duration, and queue type, with color coded win/loss results.",
    color: "#2dd4bf",
    icon: Clock,
  },
  {
    title: "Champion Mastery",
    description:
      "Top champion pool at a glance, displaying mastery level and point totals.",
    color: "#c084fc",
    icon: Swords,
  },
  {
    title: "Any-Region Search",
    description:
      "Look up a Riot ID across NA, EUW, BR, JP, KR, or RU. The backend routes each request to the right regional cluster.",
    color: "#60a5fa",
    icon: Globe,
  },
];

const TECH_STACK = [
  { name: "React 18", role: "UI Framework", icon: Code, color: "#60a5fa" },
  { name: "TypeScript", role: "Type Safety", icon: Code2, color: "#3178c6" },
  { name: "FastAPI", role: "Backend API", icon: Server, color: "#05998b" },
  {
    name: "Riot Games API",
    role: "Data Source",
    icon: Database,
    color: "#c8aa6e",
  },
  { name: "Tailwind CSS", role: "Styling", icon: Palette, color: "#38bdf8" },
  {
    name: "Docker",
    role: "Containerization",
    icon: Container,
    color: "#2496ed",
  },
  {
    name: "CI/CD",
    role: "Automated Pipeline",
    icon: Workflow,
    color: "#8b5cf6",
  },
];

const DATA_ROWS: [string, string][] = [
  ["Routing", "Region-routed (Americas / Asia / Europe)"],
  ["Rate Limit", "20 req / 1s · 100 req / 120s"],
  ["Data Points", "Matches, Ranks, Mastery, Summoner Info"],
];

function SectionHeader({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-8">
      <span className="eyebrow">{children}</span>
      <span className="gold-diamond w-2 h-2" />
    </div>
  );
}

export default function AboutProject() {
  return (
    <div className="min-h-screen bg-transparent text-slate-100 flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-800">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 60% 0%, #c8aa6e18, transparent 60%)",
            }}
          />
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-gold-400 transition-colors mb-8 group"
            >
              <ArrowLeft
                size={12}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              Back to Dashboard
            </Link>

            <div
              className="grid gap-8 md:gap-12"
              style={{ gridTemplateColumns: "1fr auto" }}
            >
              <div>
                <div className="eyebrow tracking-[0.25em] mb-3">
                  Project Overview
                </div>
                <h1 className="font-display font-bold text-4xl md:text-6xl text-gold-400 mb-4 leading-none tracking-tight">
                  Rift Lens
                </h1>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                  A summoner analytics dashboard built on the Riot Games API.
                  Designed to surface the data that matters: ranked standing,
                  champion mastery, and match level breakdown. All in a single
                  dark, high-contrast interface.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  {["Riot Games API", "6 Regions", "React + FastAPI"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded border border-slate-800 text-xs font-mono text-slate-400"
                        style={{ background: "rgba(200,170,110,0.06)" }}
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Version block */}
              <div className="hidden md:flex flex-col items-end justify-start gap-1 pt-2">
                <span className="fine-print text-[10px]">Version</span>
                <span className="font-display font-bold text-5xl text-gold-400/35 leading-none">
                  1.0
                </span>
                <span className="mono-caption">July 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* What It Does */}
        <section className="max-w-5xl mx-auto px-4 py-14">
          <SectionHeader>What It Does</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card-hover p-6 relative group">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${f.color}, transparent 60%)`,
                    }}
                  />
                  <div className="flex items-start gap-4">
                    <div
                      className="icon-chip w-10 h-10 mt-0.5"
                      style={{
                        background: `${f.color}15`,
                        border: `1px solid ${f.color}33`,
                      }}
                    >
                      <Icon size={18} style={{ color: f.color }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-slate-100 mb-2">
                        {f.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-t border-slate-800 bg-slate-900/20">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <SectionHeader>Tech Stack</SectionHeader>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TECH_STACK.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="card-hover rounded bg-slate-900/60 flex flex-col items-center gap-3 p-4 text-center"
                  >
                    <div
                      className="icon-chip w-9 h-9"
                      style={{
                        background: `${tech.color}15`,
                        border: `1px solid ${tech.color}33`,
                      }}
                    >
                      <Icon size={16} style={{ color: tech.color }} />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-100">
                        {tech.name}
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                        {tech.role}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Data Source */}
        <section className="border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 py-14">
            <SectionHeader>Data Source</SectionHeader>

            <div className="card p-6 flex flex-col gap-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div
                  className="icon-chip w-10 h-10"
                  style={{
                    background: "#c8aa6e15",
                    border: "1px solid #c8aa6e33",
                  }}
                >
                  <Database size={18} className="text-gold-400" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-slate-100">
                    Riot Games API
                  </div>
                  <div className="mono-caption">
                    Account-V1 · League-V4 · Match-V5 · Summoner-V4 · Mastery-V4
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-gold-400/40 via-gold-400/10 to-transparent" />

              <div className="flex flex-col gap-2.5">
                {DATA_ROWS.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="fine-print text-xs text-slate-500">
                      {k}
                    </span>
                    <span className="font-mono text-xs text-slate-200 text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-1 p-3 rounded border border-slate-800 bg-slate-900/60">
                <div className="flex items-start gap-2">
                  <Shield size={12} className="text-gold-400 mt-0.5 shrink-0" />
                  <p className="font-mono text-[10px] text-slate-500 leading-relaxed">
                    Rift Lens isn't endorsed by Riot Games and doesn't reflect
                    the views or opinions of Riot Games or anyone officially
                    involved in producing or managing Riot Games properties..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 py-14 text-center">
          <div className="eyebrow text-slate-500 mb-4">Ready to explore?</div>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-slate-100 mb-6">
            Back to the <span className="text-gold-400">Rift</span>
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded border border-gold-400/60 text-gold-400 font-semibold text-sm hover:bg-gold-400/10 transition-colors"
          >
            Open Dashboard
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
