import { useEffect, useState, useRef } from "react";
import { listChapters } from "@/utils/quran";

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
                <div key={index} className="flex gap-2 items-center justify-center relative">
                    <h2 className="text-[var(--w-color)] text-xl">{section.name} :</h2>
                    <div
                        ref={section.name.toLowerCase() === "chapter" ? buttonRef : null}
                        className="flex items-center justify-center bg-[var(--darker-color)] p-2 px-4 rounded-sm h-12 cursor-pointer gap-2"
                        onClick={(event) => {
                            toggleSection(section.name.toLowerCase(), event);
                        }}
                    >
                        <h2 className="text-[var(--w-color)] text-xl">{section.value}</h2>
                        <svg
                            style={{ transform: `rotate(${sections[section.name.toLowerCase()].rotation}deg)` }}
                            className="w-5 h-5 transition-all duration-200 ease"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15 20L7 12L15 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {sections[section.name.toLowerCase()].isOpen && section.name === "Chapter" && (
                        <div
                            ref={dropdownRef}
                            className="bg-[var(--darker-color)] p-2 rounded-sm top-12 mt-2 left-6 w-48 absolute max-h-96 overflow-y-auto no-scrollbar"
                        >
                            <input
                                className="bg-[var(--darker-color)] p-2 placeholder:text-[var(--g-color)] focus:outline-none text-[var(--w-color)]"
                                type="text"
                                placeholder="Search Surah"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <div className="w-3/4 h-[1px] bg-[var(--g-color)] mb-2"></div>
                            {filteredChapters.length > 0 ? (
                                filteredChapters.map((chapter, i) => (
                                    <div
                                        key={i}
                                        className="p-2 text-[var(--w-color)] cursor-pointer rounded flex items-center gap-5 hover:bg-[var(--dark-color)]"
                                    >
                                        <h2>{chapter.id}</h2>
                                        <h2>{chapter.name_simple}</h2>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[var(--w-color)] p-2">No results found</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}