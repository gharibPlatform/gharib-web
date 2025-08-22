import QuranHighlights from "./quran content/QuranHighlights";
import KhatmaCard from "./quran khatmas/KhatmaCard";
import { useState } from "react";
import { X, Bookmark, Users, Sparkles, Plus, Target } from "lucide-react";

export default function QuranRightBar({
  handleVerseClick,
  onClose,
  highlights,
  isLoadingHighlights,
}) {
  const [activeTab, setActiveTab] = useState("highlights");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const khatmas = [
    {
      id: 1,
      title: "Ramadan Challenge",
      group: "Family & Friends Group",
      personalProgress: 25,
      groupProgress: 42,
      timeLeft: "24m left",
      startDate: "Mar 10, 2023",
      endDate: "Apr 10, 2023",
      type: "group",
    },
    {
      id: 3,
      title: "Weekend Recitation",
      group: "Community Center",
      personalProgress: 15,
      groupProgress: 35,
      timeLeft: "2 days left",
      startDate: "Mar 15, 2023",
      endDate: "Apr 15, 2023",
      type: "group",
    },
  ];

  const handleContinueKhatma = (khatma) => {
    console.log(khatma);
  };
  if (isCollapsed) {
    return (
      <div className="w-16 h-[var(--height)] border-l border-[var(--g-color)] bg-[var(--main-color)] flex flex-col items-center py-4">
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-full hover:bg-[var(--main-dark-color)] mb-6 transition-colors"
          title="Expand sidebar"
        >
          <Sparkles size={24} className="text-white" />
        </button>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("highlights")}
            className={`p-2 rounded-lg transition-colors ${activeTab === "highlights" ? "bg-[var(--o-color)] text-white" : "hover:bg-[var(--main-dark-color)] text-white/70"}`}
            title="Highlights"
          >
            <Bookmark size={20} />
          </button>

          <button
            onClick={() => setActiveTab("khatmas")}
            className={`p-2 rounded-lg transition-colors ${activeTab === "khatmas" ? "bg-[var(--o-color)] text-white" : "hover:bg-[var(--main-dark-color)] text-white/70"}`}
            title="Khatmas"
          >
            <Users size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-[520px] h-[var(--height)] border-l border-[var(--g-color)] bg-[var(--main-color)] flex flex-col pb-5">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[var(--g-color)] sticky top-0 bg-[var(--main-color)] z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-full hover:bg-[var(--main-dark-color)] transition-colors"
            title="Collapse sidebar"
          >
            <Sparkles size={20} className="text-white" />
          </button>
          <h2 className="text-white font-semibold text-xl">Quran Tools</h2>
        </div>
        <button
          onClick={onClose}
          className="text-white rounded-full hover:bg-[var(--g-color)] p-2 transition-colors"
          title="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--g-color)]">
        <button
          onClick={() => setActiveTab("highlights")}
          className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${activeTab === "highlights" ? "text-[var(--o-color)] border-b-2 border-[var(--o-color)]" : "text-white/70 hover:text-white"}`}
        >
          <Bookmark size={18} />
          Highlights
        </button>
        <button
          onClick={() => setActiveTab("khatmas")}
          className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${activeTab === "khatmas" ? "text-[var(--o-color)] border-b-2 border-[var(--o-color)]" : "text-white/70 hover:text-white"}`}
        >
          <Users size={18} />
          Khatmas
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "highlights" && (
          <QuranHighlights
            highlights={highlights}
            isLoadingHighlights={isLoadingHighlights}
            handleVerseClick={handleVerseClick}
          />
        )}

        {activeTab === "khatmas" && (
          <div className="p-4 text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Your Khatmas</h3>
              <span className="text-sm text-white/70">
                {khatmas.length} in progress
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {khatmas.map((khatma) => (
                <KhatmaCard
                  key={khatma.id}
                  khatma={khatma}
                  onContinue={handleContinueKhatma}
                />
              ))}
            </div>

            <div className="bg-[var(--main-dark-color)] rounded-xl p-4 border border-dashed border-white/20 mb-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Target size={18} />
                Start a new Khatma
              </h4>
              <p className="text-sm text-white/70 mb-3">
                Begin a new reading journey with friends or by yourself
              </p>
              <button className="w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors flex items-center justify-center gap-1">
                <Plus size={18} />
                Create New Khatma
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
