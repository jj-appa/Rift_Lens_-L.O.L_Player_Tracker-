interface SectionTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SectionTabs({ tabs, activeTab, onTabChange }: SectionTabsProps) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/60">
      <div className="max-w-5xl mx-auto px-4 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`font-display px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-gold-400 text-gold-400"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
