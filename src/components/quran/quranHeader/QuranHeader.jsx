import { useEffect, useState, useRef } from "react";
import { listChapters, verseByChapter } from "../../../utils/quran/quran";
import QuranHeaderSection from "./QuranHeaderSection";
import ChapterDropdown from "/src/components/common/quran/quranHeader/dropdown/ChapterDropdown";
import PageDropdown from "./dropdown/PageDropdown";
import VerseDropdown from "./dropdown/VerseDropdown";
import useQuranHeaderPage from "../../../stores/pageQuranHeaderStore";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "../../../stores/verseQuranHeaderStore";
import { useRouter, usePathname } from "next/navigation";
import useBegginingOfTheSurah from "../../../stores/begginingOfTheSurah";
import toast from "react-hot-toast";

export default function QuranHeader() {
  const { beginningOfTheSurah, setBeginningOfTheSurah } =
    useBegginingOfTheSurah();
  const {
    quranHeaderChapter,
    setPriority,
    setQuranHeaderChapter,
    goToPath,
    setGoToPath,
    priority,
  } = useQuranHeaderChapter();
  const { quranHeaderPage, goToPathPages, setGoToPathPages } =
    useQuranHeaderPage();
  const { quranHeaderVerse, setQuranHeaderVerse } = useQuranHeaderVerse();

  const [quranHeaderData, setQuranHeaderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(quranHeaderChapter);
  const [selectedVerse, setSelectedVerse] = useState(quranHeaderVerse);
  const [selectedPage, setSelectedPage] = useState(quranHeaderPage);

  const chapterButtonRef = useRef(null);
  const verseButtonRef = useRef(null);
  const pageButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  //three effects to set the chapter, page, verse based on the header (local storage)
  useEffect(() => {
    setSelectedChapter(quranHeaderChapter);
  }, [quranHeaderChapter]);
  useEffect(() => {
    setSelectedVerse(quranHeaderVerse);
  }, [quranHeaderVerse]);
  useEffect(() => {
    if (quranHeaderPage) {
      setSelectedPage(quranHeaderPage);
    }
  }, [quranHeaderPage]);

  const router = useRouter();

  //priority set for chapter and page
  useEffect(() => {
    setSelectedChapter(quranHeaderChapter);
    if (quranHeaderChapter) {
      if (priority) {
        setSelectedPage(quranHeaderChapter.pages[0]);
      }
      setGoToPathPages(false);
    }
  }, [quranHeaderChapter, quranHeaderVerse]);

  //push to page
  useEffect(() => {
    if (selectedPage && goToPathPages) {
      const newPath = `/quran/pages/${selectedPage}`;
      router.push(newPath);
      setPriority(false);
    }
  }, [selectedPage]);

  //push to chapter
  useEffect(() => {
    if (selectedChapter && goToPath) {
      const newPath = `/quran/chapters/${selectedChapter.id}`;
      router.push(newPath);
      setPriority(true);
    }
  }, [selectedChapter]);

  useEffect(() => {
    listChapters().then((resp) => {
      setQuranHeaderData(resp);
    });
  }, []);

  const [sections, setSections] = useState({
    chapter: { rotation: 90, isOpen: false },
    verse: { rotation: 90, isOpen: false },
    page: { rotation: 90, isOpen: false },
  });

  const toggleSection = (section, e) => {
    e.stopPropagation();
    setSections((prev) => ({
      ...prev,
      [section]: {
        rotation: prev[section].isOpen ? 90 : 270,
        isOpen: !prev[section].isOpen,
      },
    }));
  };

  const handleClickOutside = (event) => {
    const isInsideChapterButton =
      chapterButtonRef.current &&
      chapterButtonRef.current.contains(event.target);
    const isInsideVerseButton =
      verseButtonRef.current && verseButtonRef.current.contains(event.target);
    const isInsidePageButton =
      pageButtonRef.current && pageButtonRef.current.contains(event.target);
    const isInsideDropdown =
      dropdownRef.current && dropdownRef.current.contains(event.target);

    if (
      !isInsideDropdown &&
      !isInsideChapterButton &&
      !isInsideVerseButton &&
      !isInsidePageButton
    ) {
      setSections({
        chapter: { rotation: 90, isOpen: false },
        verse: { rotation: 90, isOpen: false },
        page: { rotation: 90, isOpen: false },
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    toast.success(selectedVerse);
  }, [selectedVerse]);

  const sectionsData = [
    {
      name: "Chapter",
      value: selectedChapter ? selectedChapter.name_simple : "Select Chapter",
      ref: chapterButtonRef,
    },
    {
      name: "Verse",
      value: selectedVerse ? `Verse ${selectedVerse}` : "Select Verse",
      ref: verseButtonRef,
    },
    {
      name: "Page",
      value: selectedPage ? `Page ${selectedPage}` : "Select Page",
      ref: pageButtonRef,
    },
  ];

  const filteredChapters = quranHeaderData.filter((chapter) =>
    chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //scroll into view to the top of the surah
  const surahTopRef = useRef(null);
  if (beginningOfTheSurah) {
    if (surahTopRef.current) {
      setBeginningOfTheSurah(false);
      surahTopRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  return (
    <div
      ref={surahTopRef}
      className="h-12 z-50 rounded-sm flex gap-24 justify-between px-6 ml-auto mr-auto scroll-mt-16"
    >
      {sectionsData.map((section, index) => (
        <QuranHeaderSection
          key={index}
          section={section}
          sections={sections}
          toggleSection={toggleSection}
          buttonRef={section.ref}
          fontSize={18}
        >
          {sections[section.name.toLowerCase()].isOpen &&
            section.name === "Chapter" && (
              <ChapterDropdown
                dropdownRef={dropdownRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredChapters={filteredChapters}
                onSelectChapter={(chapter, e) => {
                  setQuranHeaderChapter(chapter);
                  setGoToPath(true);
                  toggleSection(section.name.toLowerCase(), e);
                }}
              />
            )}

          {sections[section.name.toLowerCase()].isOpen &&
            section.name === "Page" && (
              <PageDropdown
                dropdownRef={dropdownRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectPage={(page, e) => {
                  setSelectedPage(page);
                  setGoToPathPages(true);
                  toggleSection(section.name.toLowerCase(), e);
                }}
              />
            )}

          {sections[section.name.toLowerCase()].isOpen &&
            section.name === "Verse" && (
              <VerseDropdown
                dropdownRef={dropdownRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedChapter={selectedChapter}
                onSelectVerse={(verse, e) => {
                  toggleSection(section.name.toLowerCase(), e);
                  setQuranHeaderVerse(verse);
                }}
              />
            )}
        </QuranHeaderSection>
      ))}
    </div>
  );
}
