import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";
import toast from "react-hot-toast";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import { X } from "lucide-react";

const ChapterTab = ({ chapters, isLoading, quranHeaderChapter }) => {
  const router = useRouter();
  const { setGoToVerse } = useQuranHeaderVerse();

  const handleChapterClick = (chapterId) => {
    setGoToVerse(null);
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
              className={`grid grid-cols-2  py-2 px-4 cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100 ${quranHeaderChapter?.id == chapter.id ? "bg-[var(--main-color-hover)]" : ""}`}
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

  const versesRefs = useRef({});
  const scrollContainerRef = useRef();

  const { goToVerse, setGoToVerse } = useQuranHeaderVerse();

  const handleChapterClick = (chapterId) => {
    router.push(`/quran/chapters/${chapterId}`);
    setGoToVerse(null);
  };

  const handleVerseClick = (verse) => {
    setGoToVerse(`${quranHeaderChapter.id}:${verse}`);
  };

  useEffect(() => {
    const currentVerse = versesRefs.current[goToVerse];
    if (currentVerse && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        currentVerse.offsetTop - scrollContainerRef.current.offsetHeight / 2;
    }
  }, [goToVerse]);

  return (
    <div>
      {isLoading ? (
        <div className="text-[var(--g-color)]">Loading...</div>
      ) : (
        <div className="flex overflow-hidden h-screen">
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

          <div
            className="h-full pb-40 overflow-y-auto"
            ref={scrollContainerRef}
          >
            {Array.from({ length: quranHeaderChapter.verses_count }).map(
              (_, index) => (
                <div
                  onClick={() => handleVerseClick(index + 1)}
                  ref={(el) => (versesRefs.current[index + 1] = el)}
                  className={`flex items-center justify-center p-2 px-4 cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100 ${goToVerse?.split(":")[1] == index + 1 ? "bg-[var(--main-color-hover)]" : ""} `}
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
  const { quranHeaderPage, setQuranHeaderPage } = useQuranHeaderPage();

  const handlePageClick = (pageNumber) => {
    setQuranHeaderPage(pageNumber);
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
                className={`flex items-center p-2 px-8 w-full cursor-pointer hover:bg-[var(--main-color-hover)] rounded-[8px] transition-all duration-100
                            ${quranHeaderPage == index + 1 ? "bg-[var(--main-color-hover)]" : ""}`}
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

export default function QuranSidebar({ onClose }) {
  const { quranChapters, fetchQuranChapters, quranHeaderChapter } =
    useQuranHeaderChapter();

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
      <div className="flex items-center justify-between">
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
        <button
          onClick={onClose}
          className="text-white rounded-full hover:bg-[var(--g-color)] p-2"
        >
          <X size={20} />
        </button>
      </div>

      <div className="w-full h-[1px] bg-[var(--g-color)]"></div>

      <div className="overflow-hidden">
        {tabs.find((tab) => tab.id === activeTab)?.Component}
      </div>
    </div>
  );
}
