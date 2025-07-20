import { useEffect, useState } from "react";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import { usePathname, useRouter } from "next/navigation";

const ChapterTab = ({ chapters, isLoading }) => {
  const pathname = usePathname();
  const currentChapterId = pathname.split('/').filter(Boolean).pop();

  const router = useRouter();
  const handleChapterClick = (chapterId) => {
    router.push(`/quran/chapters/${chapterId}`)
  }

  return(
  <div>
    {isLoading ? (
      <div className="text-[var(--g-color)]">Loading...</div>
    ) : (
      <div className="flex flex-col gap-1 p-2">
        {chapters.map(chapter=>(
          <div 
            key={chapter.id}
            onClick={() => handleChapterClick(chapter.id)}
            className={`grid grid-cols-2  py-2 px-4 cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] ${currentChapterId == chapter.id ? "bg-[var(--main-color-hover)]" : ""}`}
          >
            <p>{chapter.id}</p>
            <p className="-ml-16">{chapter.name_simple}</p>
          </div>
        ))}
      </div>
    )}
  </div>)
};

const VerseTab = () => <div>Verse Content</div>;
const PageTab = () => <div>Page Content</div>;

export default function QuranSidebar() {
  const { quranChapters, fetchQuranChapters } = useQuranHeaderChapter();
  const [activeTab, setActiveTab] = useState("chapter");

  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchQuranChapters();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  
  const tabs = [
    { id: "chapter", label: "Chapter", Component: <ChapterTab chapters={quranChapters} isLoading={isLoading}/> },
    { id: "verse", label: "Verse", Component: <VerseTab /> },
    { id: "page", label: "Page", Component: <PageTab /> },
  ];

  return (
    <div className="flex flex-col gap-4 pt-4 bg-[var(--main-color)] border border-[var(--g-color)] text-white px-4">
      {/* Tab Navigation */}
      <div className="flex gap-4 py-1.5 px-2 bg-[var(--secondary-color)] rounded-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`hover:bg-[var(--main-color-hover)] px-4 py-2 rounded-sm ${
              activeTab === tab.id ? "bg-[var(--main-color-hover)]" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full h-[1px] bg-[var(--g-color)]"></div>

      <div>
        {tabs.find((tab) => tab.id === activeTab)?.Component}
      </div>
    </div>
  );
}