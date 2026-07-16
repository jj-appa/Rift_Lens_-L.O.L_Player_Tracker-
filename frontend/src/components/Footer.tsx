import { ChevronRight, Shield, Target, Zap } from "lucide-react";
import { REGIONS, REGION_LABEL } from "../data/constraints";

const GAME_MODES = [
  "Ranked Solo / Duo",
  "Ranked Flex",
  "Normal Draft",
  "ARAM",
  "Arena",
  "Quickplay",
];

function FooterColumnHeader({ children }: { children: string }) {
  return (
    <div className="font-mono text-xs font-semibold text-gold-400 uppercase tracking-[0.25em] mb-4">
      {children}
    </div>
  );
}

function FooterLinkList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item}>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm tracking-wide text-slate-400 hover:text-slate-100 transition-colors"
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-slate-800 bg-slate-950/95">
      {/* Gold top border */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(200,170,110,0.3), rgba(200,170,110,0.8), rgba(200,170,110,0.3), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Col 1 — Regions */}
          <div>
            <FooterColumnHeader>Regions</FooterColumnHeader>
            <FooterLinkList items={REGIONS.map((r) => REGION_LABEL[r] ?? r)} />
          </div>

          {/* Col 2 — Game Modes */}
          <div>
            <FooterColumnHeader>Game Modes</FooterColumnHeader>
            <FooterLinkList items={GAME_MODES} />
          </div>

          {/* Col 3 — Brand block */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-3 h-3 rotate-45 bg-gold-400 flex-shrink-0" />
                <span className="font-display font-bold text-2xl text-gold-400 tracking-[0.12em]">
                  Rift Lens
                </span>
              </div>
              <p className="text-sm tracking-wide text-slate-400 leading-relaxed mt-2 max-w-sm">
                A League of Legends summoner tracker powered by Official Riot
                Games API. Search current ranked stats, champion mastery, and
                match history across 6 regions.
              </p>
            </div>

            {/* About Project link */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1.5 group w-fit"
              aria-label="About this project"
            >
              <span className="text-sm tracking-wide font-semibold text-gold-400 group-hover:text-slate-100 transition-colors underline underline-offset-4 decoration-gold-400/40 group-hover:decoration-slate-100/40">
                About Project
              </span>
              <ChevronRight
                size={14}
                className="text-gold-400/60 group-hover:text-slate-100/60 group-hover:translate-x-0.5 transition-all"
              />
            </a>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-gold-400/40 via-gold-400/10 to-transparent" />

            {/* Meta */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs tracking-wide font-mono text-slate-400">
                <Zap size={12} className="text-teal-400" />
                <span>Powered by Official Riot Games API</span>
              </div>
              <div className="flex items-center gap-2 text-xs tracking-wide font-mono text-slate-400">
                <Shield size={12} className="text-gold-400" />
                <span>Not affiliated with Riot Games</span>
              </div>
              <div className="flex items-center gap-2 text-xs tracking-wide font-mono text-slate-400">
                <Target size={12} className="text-slate-400" />
                <span>{REGIONS.length} Regions Supported</span>
              </div>
            </div>

            {/* Version tag */}
            <div className="mt-auto pt-2">
              <span className="font-mono text-[11px] text-slate-600 uppercase tracking-widest">
                v1.0.0 · Built with React &amp; FastAPI
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-4 border-t border-slate-800/70 flex items-center justify-center">
          <span className="font-mono text-[11px] text-slate-600 uppercase tracking-widest text-center">
            © 2026 Rift Lens · Riot Games data used under Riot Games API Terms
            of Service
          </span>
        </div>
      </div>
    </footer>
  );
}
