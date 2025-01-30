export default function VerseDropdown({ dropdownRef, searchQuery, setSearchQuery, selectedChapter, onSelectVerse }) {
    const generateVerses = () => {
        if (!selectedChapter || !selectedChapter.verses_count) return [];
        return Array.from({ length: selectedChapter.verses_count }, (_, i) => i + 1);
    };

    const verses = generateVerses();
    const filteredVerses = verses.filter((verse) => verse.toString().includes(searchQuery));

    return (
        <div
            ref={dropdownRef}
            className="bg-[var(--darker-color)] p-2 rounded-sm top-12 mt-2 left-6 w-48 absolute max-h-96 overflow-y-auto no-scrollbar"
        >
            <input
                className="bg-[var(--darker-color)] p-2 placeholder:text-[var(--g-color)] focus:outline-none text-[var(--w-color)]"
                type="text"
                placeholder="Search Verse"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="w-3/4 h-[1px] bg-[var(--g-color)] mb-2"></div>
            {filteredVerses.length > 0 ? (
                filteredVerses.map((verse, i) => (
                    <div
                        key={i}
                        className="p-2 text-[var(--w-color)] cursor-pointer rounded flex items-center gap-5 hover:bg-[var(--dark-color)]"
                        onClick={(e) => onSelectVerse(verse, e)} 
                    >
                        <h2>{verse}</h2>
                    </div>
                ))
            ) : (
                <p className="text-[var(--w-color)] p-2">No results found</p>
            )}
        </div>
    );
}
