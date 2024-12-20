function QuranHeader() {
    return(
        <div className="flex justify-center pt-6">
            <div className="w-[var(--header-width)] h-12 bg-[var(--dark-color)] rounded-sm flex justify-between px-6">
                <h2 className="text-[var(--w-color)] text-xl flex items-center justify-center">The cow </h2>
                <h2 className="text-[var(--w-color)] text-xl flex items-center justify-center">145</h2>
                <h2 className="text-[var(--w-color)] text-xl flex items-center justify-center">Juzs</h2>
                <h2 className="text-[var(--w-color)] text-xl flex items-center justify-center">Hizbs</h2>
            </div>
        </div>
    )
}

export default function QuranContent() {
    return(
        <div className="w-full h-2">
            <QuranHeader />
        </div>
    )
}