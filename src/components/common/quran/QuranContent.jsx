import { useEffect, useRef, useState } from "react";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import useShouldFetch from "@/stores/shouldFetch";

import QuranHeader from "./quran header/QuranHeader";
import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";
import ProgressTrackerLine from "../progress tracker line/ProgressTrackerLine";
import KhatmasInQuran from "./KhatmasInQuran";

import { getChapter, verseByPageAndChapter } from "@/utils/quran/quran";
import { verseByPage, verseByChapter } from "@/utils/quran/quran";

import toast from "react-hot-toast";

export default function QuranContent() {
    const scrollRef = useRef(null); 
    const [cache, setCache] = useState({});
    const [addedPage, setAddedPage] = useState([]);
    const [lastFetchedPage, setLastFetchedPage] = useState();

    const { quranHeaderPage } = useQuranHeaderPage();
    const { quranHeaderChapter, setPriority, setQuranHeaderChapter, setGoToPath } = useQuranHeaderChapter();
    const { shouldFetch } = useShouldFetch();

    
    const [currentVerse, setCurrentVerse] = useState();
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

    //change the progress for the tracker line
    const changeProgress = ( verseKey ) => {
        setCurrentVerse(verseKey);
        setProgress(verseKey * rate);
    }

    //hide header and footer when scrolling
    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollTop = useRef(0);

    useEffect(() => {
    const handleScroll = () => {
        const currentScroll = scrollRef.current.scrollTop;
        const scrollDirection = currentScroll > lastScrollTop.current ? 'down' : 'up';
        
        if (scrollDirection === 'down' && currentScroll > 50) {
            setIsFooterVisible(false);
            setIsHeaderVisible(false);
        } else {
            setIsFooterVisible(true);
            setIsHeaderVisible(true);
        }
        
        lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
    };
    }, []);

    //list of khatmas to test
    const khatmas = [
        {
            name: "Khatma 1",
            startingVerse: "2:1",
            endingVerse: "2:50"
        },
        {
            name: "Khatma 2",
            startingVerse: "2:51",
            endingVerse: "2:100"
        },
        {
            name: "Khatma 3",
            startingVerse: "2:101",
            endingVerse: "2:150"
        },
        {
            name: "Khatma 4",
            startingVerse: "2:151",
            endingVerse: "2:200"
        },
        {
            name: "Khatma 5",
            startingVerse: "2:201",
            endingVerse: "2:286"
        }
    ];

    const [khatmasWithProgress, setKhatmasWithProgress] = useState(khatmas);
    
    //updating progress of the khatmas logic 
    useEffect(() => {
    const updated = khatmas.map(khatma => {
        const start = parseInt(khatma.startingVerse.split(":")[1]);
        const end = parseInt(khatma.endingVerse.split(":")[1]);

        let progress = 0;
        if (currentVerse >= start && currentVerse <= end) {
            const total = end - start + 1;
            const current = currentVerse - start + 1;
            progress = (current / total) * 100;
        }

        return {
            ...khatma,
            progress: currentVerse > end ? 100 : Math.min(Math.max(progress, 0), 100) 
        };
    });

    setKhatmasWithProgress(updated);
    }, [currentVerse]);

    return (
        <div className="flex flex-col h-screen">
            <ProgressTrackerLine progress={progress}/>

            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar relative">
                <div className="sticky top-10 right-5 float-right z-30 p-2 flex flex-col gap-1">
                    {khatmasWithProgress.map((khatma) => {
                        return <KhatmasInQuran name={khatma.name} percentage={Math.round(khatma.progress || 0)} />
                    })}
                </div>

                <QuranSurah cache={cache} changeProgress={changeProgress} />
            </div>

            <div className={`transition-all duration-300 ease-in-out 
                            ${isFooterVisible ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'}
                            `}>
                <QuranFooter />
            </div>
        </div>
    );
}