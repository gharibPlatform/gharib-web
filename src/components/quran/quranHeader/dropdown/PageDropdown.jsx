export default function PageDropdown({ dropdownRef, searchQuery, setSearchQuery, onSelectPage }) {
    const generatePages = () => {
        const [startPage, endPage] = [1, 604]
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const pages = generatePages();
    const filteredPages = pages.filter((page) => page.toString().includes(searchQuery));

    return (
        <div
            ref={dropdownRef}
            className=" z-10 bg-[var(--darker-color)] p-2 rounded-sm top-12 mt-2 left-6 w-48 absolute max-h-96 overflow-y-auto no-scrollbar"
        >
            <input
                className="bg-[var(--darker-color)] p-2 placeholder:text-[var(--g-color)] focus:outline-none text-[var(--w-color)]"
                type="text"
                placeholder="Search Page"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="w-3/4 h-[1px] bg-[var(--g-color)] mb-2"></div>
            {filteredPages.length > 0 ? (
                filteredPages.map((page, i) => (
                    <div
                        key={i}
                        className="p-2 text-[var(--w-color)] cursor-pointer rounded flex items-center gap-5 hover:bg-[var(--dark-color)]"
                        onClick={(e) => onSelectPage(page, e)}
                    >
                        <h2>Page {page}</h2>
                    </div>
                ))
            ) : (
                <p className="text-[var(--w-color)] p-2">No results found</p>
            )}
        </div>
    );
}
