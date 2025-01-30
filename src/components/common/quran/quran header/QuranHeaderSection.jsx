export default function QuranHeaderSection({ section, sections, toggleSection, buttonRef, children }) {
    return (
        <div className="flex gap-2 items-center justify-center relative">
            <h2 className="text-[var(--w-color)] text-xl">{section.name} :</h2>
            <div
                ref={buttonRef}
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
            {children}
        </div>
    );
}