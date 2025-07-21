import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";
import toast from "react-hot-toast";

const ChapterTab = ({ chapters, isLoading, quranHeaderChapter }) => {
  const router = useRouter();
  const handleChapterClick = (chapterId) => {
    router.push(`/quran/chapters/${chapterId}`);
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-[var(--g-color)]">Loading...</div>
      ) : (
        <div className="flex flex-col gap-1 p-2 overflow-y-auto h-screen pb-40">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => handleChapterClick(chapter.id)}
              className={`grid grid-cols-2  py-2 px-4 cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100 ${quranHeaderChapter.id == chapter.id ? "bg-[var(--main-color-hover)]" : ""}`}
            >
              <p>{chapter.id}</p>
              <p className="-ml-20">{chapter.name_simple}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const VerseTab = ({ chapters, isLoading, quranHeaderChapter }) => {
  const router = useRouter();
  const handleChapterClick = (chapterId) => {
    router.push(`/quran/chapters/${chapterId}`);
  };
  const { quranHeaderVerse, setQuranHeaderVerse, setGoToVerse } =
    useQuranHeaderVerse();

  const handleVerseClick = (verse) => {
    setQuranHeaderVerse(verse);
    setGoToVerse(verse);
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-[var(--g-color)]">Loading...</div>
      ) : (
        <div className="flex">
          <div className="w-3/4 flex flex-col gap-1 p-2 overflow-y-auto h-screen pb-40">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => handleChapterClick(chapter.id)}
                className={`grid grid-cols-[1fr_3fr] py-2 px-4 cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100 ${quranHeaderChapter.id == chapter.id ? "bg-[var(--main-color-hover)]" : ""}`}
              >
                <p>{chapter.id}</p>
                <p className="">{chapter.name_simple}</p>
              </div>
            ))}
          </div>

          <div className="h-screen pb-40 overflow-y-auto">
            {Array.from({ length: quranHeaderChapter.verses_count }).map(
              (_, index) => (
                <div
                  onClick={() => handleVerseClick(index + 1)}
                  className={`flex items-center justify-center p-2 px-4 cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100 ${quranHeaderVerse == index + 1 ? "bg-[var(--main-color-hover)]" : ""} `}
                >
                  {index + 1}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PageTab = ({ isLoading, quranHeaderChapter }) => {
  const router = useRouter();
  const handlePageClick = (pageNumber) => {
    router.push(`/quran/pages/${pageNumber}`);
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-[var(--g-color)]">Loading...</div>
      ) : (
        <div className="flex">
          <div className="h-screen pb-40 overflow-y-auto w-full">
            {Array.from({ length: 604 }).map((_, index) => (
              <div
                className="flex items-center p-2 px-8 w-full cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100 "
                onClick={() => handlePageClick(index + 1)}
              >
                Page {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function QuranSidebar() {
  const { quranChapters, fetchQuranChapters, quranHeaderChapter } =
    useQuranHeaderChapter();

  const [activeTab, setActiveTab] = useState("chapter");
  const [isLoading, setIsLoading] = useState(true);

  console.log(quranHeaderChapter);
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
    {
      id: "chapter",
      label: "Chapter",
      Component: (
        <ChapterTab
          chapters={quranChapters}
          isLoading={isLoading}
          quranHeaderChapter={quranHeaderChapter}
        />
      ),
    },
    {
      id: "verse",
      label: "Verse",
      Component: (
        <VerseTab
          chapters={quranChapters}
          isLoading={isLoading}
          quranHeaderChapter={quranHeaderChapter}
        />
      ),
    },
    { id: "page", label: "Page", Component: <PageTab isLoading={isLoading} /> },
  ];

  return (
    <div className="flex flex-col gap-4 pt-4 bg-[var(--main-color)] border-r border-[var(--g-color)] text-white px-4 w-[600px]">
      <div className="flex justify-between gap-4 py-1.5 px-2 bg-[var(--secondary-color)] rounded-sm ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`hover:bg-[var(--main-color-hover)] px-4 py-2 rounded-sm transition-all duration-100 ${
              activeTab === tab.id ? "bg-[var(--main-color-hover)]" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="w-full h-[1px] bg-[var(--g-color)]"></div>

      <div>{tabs.find((tab) => tab.id === activeTab)?.Component}</div>
    </div>
  );
}
