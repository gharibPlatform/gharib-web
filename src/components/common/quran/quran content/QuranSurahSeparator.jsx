export default function QuranSurahSeparator({ chapterId, paddingTopValue, pageNumber }) {
    return (
        <div>
            {pageNumber ? (
                <div style={{fontFamily: "Cairo"}} className="flex flex-col">
                    <div className="pt-12 pb-12 gap-6 flex items-center justify-center text-base">
                        <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
                        <div className="px-6 text-[var(--lighter-color)]">{pageNumber}</div>
                        <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
                    </div>
                    <div style={{ fontFamily: "surahnames", paddingTop: paddingTopValue }} className="flex justify-center items-center text-6xl pb-12">
                        <div>surah</div>
                        <div>{chapterId}</div>
                    </div>
                </div>
            ) : (
                <div style={{ fontFamily: "surahnames", paddingTop: paddingTopValue }} className="flex justify-center items-center text-6xl pb-12">
                    <div>surah</div>
                    <div>{chapterId}</div>
                </div>
            )}
            <div></div>
        </div>
    );
}
