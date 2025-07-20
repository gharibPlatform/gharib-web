import { useState } from "react";

export default function QuranSidebar() {
  const [activeTab, setActiveTab] = useState("chapter");
  const tabs = [
    { id: "chapter", label: "Chapter" },
    { id: "verse", label: "Verse" },
    { id: "page", label: "Page" },
  ];

  const tabsContent = {
    chapter: <div>Chpater</div>,
    verse: <div>Verse</div>,
    page: <div>Page</div>,
  };

  return (
    <div className="flex flex-col gap-4 pt-4 bg-[var(--main-color)] border border-[var(--g-color)] text-white px-4">
      <div className="flex gap-4 py-1.5 px-2 bg-[var(--secondary-color)] rounded-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`hover:bg-[var(--main-color-hover)] px-4 py-2 rounded-sm ${activeTab === tab.id ? "bg-[var(--main-color-hover)]" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full h-[1px] bg-[var(--g-color)]"></div>

      <div>{tabsContent[activeTab]}</div>
    </div>
  );
}
