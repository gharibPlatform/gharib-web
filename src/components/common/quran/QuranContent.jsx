import { useEffect, useRef, useState } from "react";
import QuranHeader from "./quran header/QuranHeader";
import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";
import { fetchPagesWithinChapter, getChapter } from "@/utils/quran/quran";
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
    const { quranHeaderChapter, setQuranHeaderChapter } = useQuranHeaderChapter();
    const setQuranHeaderVerse = useQuranHeaderVerse((state) => state.setQuranHeaderVerse);
    const { shouldFetch } = useShouldFetch();

    // useEffect(() => {
    //     if ( shouldFetch !== "page") return;
    //     let isMounted = true;

    //     fetchPagesWithinChapter(quranHeaderPage, cache, setCache, setQuranHeaderChapter, setQuranHeaderVerse, true).then((updatedCache) => {
    //         if (isMounted) {
    //             console.log(updatedCache)
    //             setCache(updatedCache);
    //             const keys = Object.keys(updatedCache);
    //             console.log(keys[keys.length - 1])
    //             setLastFetchedPage(+keys[keys.length - 1])
    //         }
    //    });

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [quranHeaderPage]);
    
    useEffect(() => {
        if ( shouldFetch !== "page") return;
        let isMounted = true;

        verseByPage(quranHeaderPage)
        .then((updatedCache) => {
            console.log(updatedCache)
            getChapter(updatedCache[0].verse_key.split(":")[0])
            .then((resp) => {
                setQuranHeaderChapter(resp)
            })
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
                verseByPage(lastFetchedPage + 1)
                .then((resp) => {
                    // stop fetching in the end of the chapter
                    if (resp[0].verse_key.split(":")[0] !== Object.values(cache)[0][0].verse_key.split(":")[0]) {
                        setStopFetching(true);
                        return;
                    }
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