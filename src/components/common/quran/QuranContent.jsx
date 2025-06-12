import { useEffect, useRef, useState } from "react";
import QuranHeader from "./quran header/QuranHeader";
import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";
import { getChapter, verseByPageAndChapter } from "@/utils/quran/quran";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";
import { verseByPage, verseByChapter } from "@/utils/quran/quran";
import useShouldFetch from "@/stores/shouldFetch";
import ProgressTrackerLine from "../progress tracker line/ProgressTrackerLine";
import useAddPageNumber from "@/stores/pageNumberArray";

export default function QuranContent() {
    const scrollRef = useRef(null); 
    const [cache, setCache] = useState({});
    const [addedPage, setAddedPage] = useState([]);
    const [lastFetchedPage, setLastFetchedPage] = useState();

    const { quranHeaderPage } = useQuranHeaderPage();
    const { quranHeaderChapter, setPriority, setQuranHeaderChapter, setGoToPath } = useQuranHeaderChapter();
    const setQuranHeaderVerse = useQuranHeaderVerse((state) => state.setQuranHeaderVerse);
    const { shouldFetch } = useShouldFetch();
    const { pageNumberArray , currentPageNumber, increment, decremnet, setCurrentPageNumber } = useAddPageNumber();

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    console.log("totale pages are : ", totalPages);
    //fetch for one page
    useEffect(() => {
        if ( shouldFetch !== "page") return;
        let isMounted = true;

        verseByPage(quranHeaderPage)
        .then((updatedCache) => {
            if (!quranHeaderChapter || quranHeaderChapter.id !== updatedCache[0].verse_key.split(":")[0]) {
                getChapter(updatedCache[0].verse_key.split(":")[0]).then((resp) => {
                    setQuranHeaderChapter(resp);
                    setGoToPath(false);
                });
            }
            if (isMounted) {
                const tempObj = { [quranHeaderPage] : updatedCache }
                setCache(tempObj);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [quranHeaderPage]);


    useEffect(() => {
        if (quranHeaderChapter) {
            const total = quranHeaderChapter.pages[1] - quranHeaderChapter.pages[0] + 1;
            setTotalPages(total);
        }
    }, [ quranHeaderChapter ])

    //fetch for one chapter
    useEffect(() => {
        if ( shouldFetch !== "chapter") return;
        let isMounted = true;

        verseByChapter(quranHeaderChapter.id)
        .then((updatedCache) => {
            if ( isMounted ) {
                const keys = Object.keys(updatedCache);
                setLastFetchedPage(+keys[keys.length - 1])
                setCache(updatedCache)
                setPriority(true)
            }
        })

        return () => {
            isMounted = false;
        };
    }, [ quranHeaderChapter ]);

    //scroll to apply lazy loading and fetch surah while scrolling
    let i = 0;
    const handleScroll = () => {
        if (!scrollRef.current) return;
    
        const scrollHeight = scrollRef.current.scrollHeight;
        const scrollTop = scrollRef.current.scrollTop;
        const innerHeight = window.innerHeight;

        if (scrollTop + innerHeight + 3600 >= scrollHeight) {
            if (lastFetchedPage) {
                verseByPageAndChapter(lastFetchedPage + 1, quranHeaderChapter.id)
                    .then((resp) => {
                        setAddedPage(resp);
                    });
                setLastFetchedPage(lastFetchedPage + 1);
            }
        }
    };
    

    useEffect(()=>{
        if(addedPage && addedPage.length > 0 && addedPage[0]){
            setCache({...cache, [addedPage[0].page_number]: addedPage})
        }
    }, [addedPage])

    useEffect(() => {
        const scrollableDiv = scrollRef.current;
        if (!scrollableDiv) return;

        scrollableDiv.addEventListener("scroll", handleScroll);

        return () => {
            scrollableDiv.removeEventListener("scroll", handleScroll);
        };
    }, [lastFetchedPage]);
    
    const handlePageVisible = (pageNumber) => {
        setCurrentPage(parseInt(pageNumber));
    };

    return (
        <div 
            ref={scrollRef} 
            className="w-full overflow-y-auto h-screen no-scrollbar flex flex-col"
        >
            <div className="flex flex-col justify-center">
                <div className="pb-6">
                    <ProgressTrackerLine current={currentPage} total={totalPages} />
                </div>
                <QuranHeader />
                <QuranSurah cache={cache} onPageVisible={handlePageVisible} />
                <QuranFooter />
            </div>
        </div>
    );
}