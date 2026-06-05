interface SectionTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SectionTabs({ tabs, activeTab, onTabChange }: SectionTabsProps) {
  return (
    <nav className="border-b border-slate-700/70 bg-slate-700">
      <div className="max-w-5xl mx-auto px-4 flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
