import { useEffect, useState, useRef } from "react";
import { listChapters } from "@/utils/quran";
import QuranHeaderSection from "./QuranHeaderSection";
import ChapterDropdown from "./dropdown/chapterDropdown";
import PageDropdown from "./dropdown/PageDropdown";
import VerseDropdown from "./dropdown/VerseDropdown";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore"
import { convertChapterToPage } from "@/utils/quran";

export default function QuranHeader() {
    const setQuranHeaderPage = useQuranHeaderPage((state) => state.setQuranHeaderPage);

    const [quranHeaderData, setQuranHeaderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedVerse, setSelectedVerse] = useState(null);
    const [selectedPage, setSelectedPage] = useState();

    const chapterButtonRef = useRef(null);
    const verseButtonRef = useRef(null);
    const pageButtonRef = useRef(null);
    const dropdownRef = useRef(null);

    const setSelected = (chapter) => {
        setSelectedPage(chapter.pages[0]);
        setQuranHeaderPage(chapter.pages[0]);
        setSelectedVerse(1);
        setSelectedChapter(chapter);

    }
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
        const isInsideChapterButton = chapterButtonRef.current && chapterButtonRef.current.contains(event.target);
        const isInsideVerseButton = verseButtonRef.current && verseButtonRef.current.contains(event.target);
        const isInsidePageButton = pageButtonRef.current && pageButtonRef.current.contains(event.target);
        const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);

        if (!isInsideDropdown && !isInsideChapterButton && !isInsideVerseButton && !isInsidePageButton) {
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
        { name: "Chapter", value: selectedChapter ? selectedChapter.name_simple : "Select Chapter", ref: chapterButtonRef },
        { name: "Verse", value: selectedVerse ? `Verse ${selectedVerse}` : "Select Verse", ref: verseButtonRef },
        { name: "Page", value: selectedPage ? `Page ${selectedPage}` : "Select Page", ref: pageButtonRef },
    ];

    const filteredChapters = quranHeaderData.filter((chapter) =>
        chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-[var(--header-width)] h-14 bg-[var(--dark-color)] rounded-sm flex justify-between px-6 ml-auto mr-auto">
            {sectionsData.map((section, index) => (
                <QuranHeaderSection
                    key={index}
                    section={section}
                    sections={sections}
                    toggleSection={toggleSection}
                    buttonRef={section.ref} 
                >
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Chapter" && (
                        <ChapterDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filteredChapters={filteredChapters}
                            onSelectChapter={(chapter, e) => {
                                setSelected(chapter);
                                toggleSection(section.name.toLowerCase(), e)
                            }}
                        />
                    )}
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Page" && (
                        <PageDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSelectPage={(page, e)=>{
                                setSelectedPage(page);
                                setQuranHeaderPage(page);
                                toggleSection(section.name.toLowerCase(), e)
                            }}
                        />
                    )}
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Verse" && (
                        <VerseDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedChapter={selectedChapter}
                            onSelectVerse={(verse, e)=>{
                                setSelectedVerse(verse);
                                toggleSection(section.name.toLowerCase(), e)
                            }}
                        />
                    )}
                </QuranHeaderSection>
            ))}
        </div>
    );
}
