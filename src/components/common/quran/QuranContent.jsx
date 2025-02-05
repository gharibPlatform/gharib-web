import { useEffect, useRef, useState } from "react";
import QuranHeader from "./quran header/QuranHeader";
import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";
import { fetchPagesWithinChapter } from "@/utils/quran/quran";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";
import { verseByPage } from "@/utils/quran/quran";
export default function QuranContent() {
    const scrollRef = useRef(null); 
    const [cache, setCache] = useState({});
    const { quranHeaderPage } = useQuranHeaderPage();
    const [addedPage, setAddedPage] = useState([]);
    const setQuranHeaderChapter = useQuranHeaderChapter((state) => state.setQuranHeaderChapter);
    const setQuranHeaderVerse = useQuranHeaderVerse((state) => state.setQuranHeaderVerse);

    useEffect(() => {
        let isMounted = true;

        fetchPagesWithinChapter(quranHeaderPage, cache, setCache, setQuranHeaderChapter, setQuranHeaderVerse).then((updatedCache) => {
            if (isMounted) {
                console.log(updatedCache)
                setCache(updatedCache);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [quranHeaderPage]);

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const scrollHeight = scrollRef.current.scrollHeight;
        const scrollTop = scrollRef.current.scrollTop;
        const innerHeight = window.innerHeight;

        console.log("Height:", scrollHeight);
        console.log("Top:", scrollTop);
        console.log("Window : ", innerHeight);

        if (scrollTop + innerHeight + 3600 >= scrollHeight) {
            verseByPage(12)
            .then((resp) => {
                setAddedPage(resp)
                // console.log(resp[0].page_number)
            })
        }
    };
    useEffect(()=>{
        if(addedPage && addedPage.length > 0 && addedPage[0]){
            setCache({...cache, [addedPage[0].page_number]: addedPage})
            console.log({...cache, [addedPage[0].page_number]: addedPage})
        }
    }, [addedPage])

    useEffect(() => {
        const scrollableDiv = scrollRef.current;
        if (!scrollableDiv) return;

        scrollableDiv.addEventListener("scroll", handleScroll);
        console.log("Event listener added");

        return () => {
            scrollableDiv.removeEventListener("scroll", handleScroll);
            console.log("Event listener removed");
        };
    }, []);

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