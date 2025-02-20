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

export default function QuranContent() {
    const scrollRef = useRef(null); 
    const [cache, setCache] = useState({});
    const [addedPage, setAddedPage] = useState([]);
    const [lastFetchedPage, setLastFetchedPage] = useState();

    const { quranHeaderPage } = useQuranHeaderPage();
    const { quranHeaderChapter, setPriority, setQuranHeaderChapter, setGoToPath } = useQuranHeaderChapter();
    const setQuranHeaderVerse = useQuranHeaderVerse((state) => state.setQuranHeaderVerse);
    const { shouldFetch } = useShouldFetch();

    useEffect(() => {
        if ( shouldFetch !== "page") return;
        let isMounted = true;

        verseByPage(quranHeaderPage)
        .then((updatedCache) => {
            console.log(updatedCache)
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
        if ( shouldFetch !== "chapter") return;
        let isMounted = true;

        verseByChapter(quranHeaderChapter.id)
        .then((updatedCache) => {
            console.log(updatedCache)
            if ( isMounted ) {
                console.log(updatedCache)
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

    const [stopFetching, setStopFetching] = useState(false);

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const scrollHeight = scrollRef.current.scrollHeight;
        const scrollTop = scrollRef.current.scrollTop;
        const innerHeight = window.innerHeight;

        if (scrollTop + innerHeight + 3600 >= scrollHeight || !stopFetching) {

            if(lastFetchedPage) {
                verseByPageAndChapter(lastFetchedPage + 1, quranHeaderChapter.id)
                .then((resp) => {
                    setAddedPage(resp)
                })
                setLastFetchedPage(lastFetchedPage + 1)
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

    return (
        <div 
            ref={scrollRef} 
            className="w-full overflow-y-auto h-screen no-scrollbar flex flex-col"
        >
            <div className="flex flex-col justify-center pt-6">
                <QuranHeader />
                <QuranSurah cache={cache} />
                <QuranFooter />
            </div>
        </div>
    );
}