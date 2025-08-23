export default function QuranHeaderSection({ section, sections, toggleSection, buttonRef, children, fontSize }) {
    return (
        <div 
         className="flex gap-2 items-center justify-center relative"
         style={{fontSize: `${fontSize}px`}}
         >
            <h2 className="text-[var(--w-color)] text-nowrap">{section.name} :</h2>
            <div
                ref={buttonRef}
                className="flex items-center justify-center bg-[var(--darker-color)] px-3 rounded-sm h-12 cursor-pointer gap-2"
                onClick={(event) => {
                    toggleSection(section.name.toLowerCase(), event);
                }}
            >
                <h2 className="text-[var(--w-color)] text-nowrap">{section.value}</h2>
                <svg
                    style={{ transform: `rotate(${sections[section.name.toLowerCase()].rotation}deg)` }}
                    className="w-3 h-3 transition-all duration-200 ease"
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