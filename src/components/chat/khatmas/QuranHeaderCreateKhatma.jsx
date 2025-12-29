import { listChapters } from "../../../utils/quran/quran";
import QuranHeaderSection from "../../quran/quranHeader/QuranHeaderSection";
import ChapterDropdown from "../../quran/quranHeader/dropdown/ChapterDropdown";
import VerseDropdown from "../../quran/quranHeader/dropdown/VerseDropdown";
import PageDropdown from "../../quran/quranHeader/dropdown/PageDropdown";
import useQuranHeaderChapter from "../../../stores/quran/chapterQuranHeaderStore";
import useQuranHeaderPage from "../../../stores/quran/pageQuranHeaderStore";
import useQuranHeaderVerse from "../../../stores/quran/verseQuranHeaderStore";
import { useState, useEffect, useRef } from "react";

export default function QuranHeader({ selectionType }) {
  const [quranHeaderData, setQuranHeaderData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const chapterButtonRef = useRef(null);
  const verseButtonRef = useRef(null);
  const pageButtonRef = useRef(null);

  const dropdownRef = useRef(null);

  // Different hooks for different purpose (from and to)
  // Chapter
  const fromChapter = useQuranHeaderChapter((state) => state.fromChapter);
  const setFromChapter = useQuranHeaderChapter((state) => state.setFromChapter);

  const toChapter = useQuranHeaderChapter((state) => state.toChapter);
  const setToChapter = useQuranHeaderChapter((state) => state.setToChapter);

  const selectedChapter = selectionType === "from" ? fromChapter : toChapter;
  const setSelectedChapter =
    selectionType === "from" ? setFromChapter : setToChapter;

  // Page
  const fromPage = useQuranHeaderPage((state) => state.fromPage);
  const setFromPage = useQuranHeaderPage((state) => state.setFromPage);

  const toPage = useQuranHeaderPage((state) => state.toPage);
  const setToPage = useQuranHeaderPage((state) => state.setToPage);

  const selectedPage = selectionType === "from" ? fromPage : toPage;
  const setSelectedPage = selectionType === "from" ? setFromPage : setToPage;

  // Verse
  const fromVerse = useQuranHeaderVerse((state) => state.fromVerse);
  const setFromVerse = useQuranHeaderVerse((state) => state.setFromVerse);

  const toVerse = useQuranHeaderVerse((state) => state.toVerse);
  const setToVerse = useQuranHeaderVerse((state) => state.setToVerse);

  const selectedVerse = selectionType === "from" ? fromVerse : toVerse;
  const setSelectedVerse = selectionType === "from" ? setFromVerse : setToVerse;

  // logic to hanle when the user choses a starting chapter or verse or page that is greater than the ending chapter or verse or page
  useEffect(() => {
    if (selectedPage && toPage) {
      if (toPage < selectedPage) {
        setToPage(selectedPage);
        setSelectedPage(toPage);
      }
    }

    if (selectedChapter && toChapter) {
      if (toChapter.id < selectedChapter.id) {
        setToChapter(selectedChapter);
        setSelectedChapter(toChapter);
      }
    }

    if (selectedChapter && toChapter) {
      if (selectedChapter.id === toChapter.id) {
        if (selectedVerse && toVerse) {
          if (toVerse < selectedVerse) {
            setToVerse(selectedVerse);
            setSelectedVerse(toVerse);
          }
        }
      } else if (toChapter.id < selectedChapter.id) {
        setToChapter(selectedChapter);
        setSelectedChapter(toChapter);
      }
    }
  }, [
    selectedPage,
    toPage,
    selectedChapter,
    toChapter,
    selectedVerse,
    toVerse,
  ]);

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

  return (
    <div className="h-20 bg-[var(--dark-color)] rounded-sm flex justify-between px-6 ml-auto mr-auto scroll-mt-16 gap-2">
      {sectionsData.map((section, index) => (
        <QuranHeaderSection
          key={index}
          section={section}
          sections={sections}
          toggleSection={toggleSection}
          buttonRef={section.ref}
          fontSize={14}
        >
          {sections[section.name.toLowerCase()].isOpen &&
            section.name === "Chapter" && (
              <ChapterDropdown
                dropdownRef={dropdownRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredChapters={filteredChapters}
                onSelectChapter={(chapter, e) => {
                  setSelectedChapter(chapter);
                  setSelectedPage(null);
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
                  setSelectedChapter(null);
                  setSelectedVerse(null);
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
                  setSelectedPage(null);
                  setSelectedVerse(verse);
                }}
              />
            )}
        </QuranHeaderSection>
      ))}
    </div>
  );
}
