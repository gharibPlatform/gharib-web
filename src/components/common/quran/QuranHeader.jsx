import { useState } from "react";
export default function QuranHeader() {

    const [sections, setSections] = useState({
    chapter: { rotation: 90, isOpen: false },
    verse: { rotation: 90, isOpen: false },
    juz: { rotation: 90, isOpen: false },
    hizb: { rotation: 90, isOpen: false },
    page: { rotation: 90, isOpen: false },
    });

    const toggleSection = (section) => {
    setSections(prev => ({
        ...prev,
        [section]: {
        rotation: prev[section].rotation === 90 ? 270 : 90,
        isOpen: !prev[section].isOpen,
        },
    }));
    };
    const sectionsData = [
    { name: "Chapter", value: "The Cow" },
    { name: "Verse", value: "114" },
    { name: "Juz", value: "1" },
    { name: "Hizb", value: "2" },
    { name: "Page", value: "22" }
    ];

    return (
    <div className="w-[var(--header-width)] h-14 bg-[var(--dark-color)] rounded-sm flex justify-between px-6 ml-auto mr-auto">
        {sectionsData.map((section, index) => (
        <div key={index} className="flex gap-2 items-center justify-center">
            <h2 className="text-[var(--w-color)] text-xl">{section.name} :</h2>
            <div
            className="flex items-center justify-center bg-[var(--darker-color)] p-2 px-4 rounded-sm h-12 cursor-pointer gap-2"
            onClick={() => toggleSection(section.name.toLowerCase())}
            >
            <h2 className="text-[var(--w-color)] text-xl">{section.value}</h2>
            <svg
                style={{
                transform: `rotate(${sections[section.name.toLowerCase()].rotation}deg)`,
                }}
                className="w-5 h-5 transition-all duration-200 ease"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M15 20L7 12L15 4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </div>
        </div>
        ))}
    </div>
    );
} 