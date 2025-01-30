import { useEffect, useState, useRef } from "react";
import { listChapters } from "@/utils/quran";
import QruanHeaderSection from "./QuranHeaderSection";
import ChapterDropdown from "./dropdown/ChapterDropdown";

export default function QuranHeader() {
    const [quranHeaderData, setQuranHeaderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null); 
    const buttonRef = useRef(null); 

    useEffect(() => {
        listChapters().then((resp) => {
            console.log(resp);
            setQuranHeaderData(resp);
        });
    }, []);

    const [sections, setSections] = useState({
        chapter: { rotation: 90, isOpen: false },
        verse: { rotation: 90, isOpen: false },
        juz: { rotation: 90, isOpen: false },
        hizb: { rotation: 90, isOpen: false },
        page: { rotation: 90, isOpen: false },
    });

    const toggleSection = (section, e) => {
        e.stopPropagation();
        setSections((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (key === section) {
                    newState[key] = {
                        rotation: newState[key].isOpen ? 90 : 270,
                        isOpen: !newState[key].isOpen,
                    };
                } else {
                    newState[key] = {
                        rotation: 90,
                        isOpen: false,
                    };
                }
            });
            return newState;
        });
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setSections((prev) => {
                const newState = { ...prev };
                Object.keys(newState).forEach((key) => {
                    newState[key] = {
                        rotation: 90,
                        isOpen: false,
                    };
                });
                return newState;
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
        { name: "Chapter", value: "The Cow" },
        { name: "Verse", value: "114" },
        { name: "Juz", value: "1" },
        { name: "Hizb", value: "2" },
        { name: "Page", value: "22" },
    ];

    const filteredChapters = quranHeaderData.filter((chapter) =>
        chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-[var(--header-width)] h-14 bg-[var(--dark-color)] rounded-sm flex justify-between px-6 ml-auto mr-auto">
            {sectionsData.map((section, index) => (
                <QruanHeaderSection
                    key={index}
                    section={section}
                    sections={sections}
                    toggleSection={toggleSection}
                    buttonRef={section.name.toLowerCase() === "chapter" ? buttonRef : null}
                >
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Chapter" && (
                        <ChapterDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filteredChapters={filteredChapters}
                        />
                    )}
                </QruanHeaderSection>
            ))}
        </div>
    );
}