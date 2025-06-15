import { useEffect, useRef, useState } from "react";
import QuranHeader from "./quran header/QuranHeader";
import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";
import { getChapter, verseByPageAndChapter } from "@/utils/quran/quran";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import { verseByPage, verseByChapter } from "@/utils/quran/quran";
import useShouldFetch from "@/stores/shouldFetch";
import ProgressTrackerLine from "../progress tracker line/ProgressTrackerLine";
import toast from "react-hot-toast";

export default function QuranContent() {
    const scrollRef = useRef(null); 
    const [cache, setCache] = useState({});
    const [addedPage, setAddedPage] = useState([]);
    const [lastFetchedPage, setLastFetchedPage] = useState();

    const { quranHeaderPage } = useQuranHeaderPage();
    const { quranHeaderChapter, setPriority, setQuranHeaderChapter, setGoToPath } = useQuranHeaderChapter();
    const { shouldFetch } = useShouldFetch();

    const [currentVerse, setCurrentVerse] = useState(1);
    const totalVersesInChapter = quranHeaderChapter?.verses_count || 1;
    const [progress, setProgress] = useState(0);
    const rate = 100 / totalVersesInChapter;

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
    
    // updating the cache
    useEffect(()=>{
        if(addedPage && addedPage.length > 0 && addedPage[0]){
            setCache({...cache, [addedPage[0].page_number]: addedPage})
        }
    }, [addedPage])

    // onscroll update the cache 
    useEffect(() => {
        const scrollableDiv = scrollRef.current;
        if (!scrollableDiv) return;

        scrollableDiv.addEventListener("scroll", handleScroll);

        return () => {
            scrollableDiv.removeEventListener("scroll", handleScroll);
        };
    }, [lastFetchedPage]);

    const handleVerseVisible = (verseKey) => {
        const verseNum = parseInt(verseKey.split(":")[1]);
        setCurrentVerse(verseNum);
    };

    const changeProgress = ( verseKey ) => {
        setProgress(verseKey * rate);
    }
    
    useEffect(() => {
        toast.error(`the progress is : ${progress}`);
    }, [progress]);

return (
    <div 
        ref={scrollRef} 
        className="w-full overflow-y-auto h-screen no-scrollbar flex flex-col relative"
    >
        <div className="flex flex-col justify-center relative">
            <div className="pb-6 sticky top-0 left-0 z-50">
                <ProgressTrackerLine progress={progress}/>
            </div>
            <QuranHeader />
            <QuranSurah 
             cache={cache} 
             onPageVisible={handleVerseVisible} 
             changeProgress={changeProgress}
            />
            <QuranFooter />
        </div>
    </div>
);
}