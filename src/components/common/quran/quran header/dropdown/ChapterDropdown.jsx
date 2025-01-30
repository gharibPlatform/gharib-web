export default function ChapterDropdown({ dropdownRef, searchQuery, setSearchQuery, filteredChapters, onSelectChapter }) {
    return (
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
                        onClick={(e) => onSelectChapter(chapter, e)}
                    >
                        <h2>{chapter.id}</h2>
                        <h2>{chapter.name_simple}</h2>
                    </div>
                ))
            ) : (
                <p className="text-[var(--w-color)] p-2">No results found</p>
            )}
        </div>
    );
}
