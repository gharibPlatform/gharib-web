import { useEffect, useState, useRef } from "react";
import { listChapters } from "@/utils/quran";
import QuranHeaderSection from "./QuranHeaderSection";
import ChapterDropdown from "./dropdown/chapterDropdown";
import PageDropdown from "./dropdown/PageDropdown";
import VerseDropdown from "./dropdown/VerseDropdown";
export default function QuranHeader() {
    const [quranHeaderData, setQuranHeaderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedChapter, setSelectedChapter] = useState(null);
    
    const chapterButtonRef = useRef(null);
    const verseButtonRef = useRef(null);
    const pageButtonRef = useRef(null);
    const dropdownRef = useRef(null);

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
        const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
        const isInsideChapterButton = chapterButtonRef.current && chapterButtonRef.current.contains(event.target);
        const isInsideVerseButton = verseButtonRef.current && verseButtonRef.current.contains(event.target);
        const isInsidePageButton = pageButtonRef.current && pageButtonRef.current.contains(event.target);

        // If the click is outside all dropdowns and buttons, close all dropdowns
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
        { name: "Verse", value: "Select Verse", ref: verseButtonRef },
        { name: "Page", value: "Select Page", ref: pageButtonRef },
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
                    buttonRef={section.ref} // Use specific ref for each section
                >
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Chapter" && (
                        <ChapterDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filteredChapters={filteredChapters}
                            onSelectChapter={setSelectedChapter}
                        />
                    )}
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Page" && (
                        <PageDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedChapter={selectedChapter}
                        />
                    )}
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Verse" && (
                        <VerseDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedChapter={selectedChapter}
                        />
                    )}
                </QuranHeaderSection>
            ))}
        </div>
    );
}
