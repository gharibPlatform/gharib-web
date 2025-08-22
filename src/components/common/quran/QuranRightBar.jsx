import DropDown from "../drop down /DropDown";
import QuranHighlights from "./quran content/QuranHighlights";
import { useState } from "react";
import { X, Bookmark, Users, Sparkles } from "lucide-react";

export default function QuranRightBar({
  handleVerseClick,
  onClose,
  isLoadingHighlights,
}) {
  const [activeTab, setActiveTab] = useState("highlights");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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
            isLoadingHighlights={isLoadingHighlights}
            handleVerseClick={handleVerseClick}
          />
        )}

        {activeTab === "khatmas" && (
          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold mb-4">Your Khatmas</h3>
            <div className="rounded-lg bg-[var(--main-dark-color)] p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Ramadan Challenge</h4>
                <span className="text-xs bg-[var(--o-color)] px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-white/70 mb-3">
                Family & Friends Group
              </p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="bg-[var(--o-color)] h-2 rounded-full"
                  style={{ width: "42%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span>42% Complete</span>
                <span>24m left</span>
              </div>
            </div>

            <div className="rounded-lg bg-[var(--main-dark-color)] p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Juz Amma Review</h4>
                <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
                  Completed
                </span>
              </div>
              <p className="text-sm text-white/70 mb-3">Personal Reading</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <div className="flex justify-between text-xs">
                <span>100% Complete</span>
                <span>Finished</span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-lg border border-dashed border-white/30 hover:border-white/50 text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2">
              <span>+</span> Create New Khatma
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
