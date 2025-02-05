import React, { useEffect, useState } from "react";
import { fetchPagesWithinChapter } from "@/utils/quran/quran";
import QuranPage from "./QuranPage";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";

const QuranInfiniteScroll = () => {
    const [cache, setCache] = useState({}); 
    const { quranHeaderPage } = useQuranHeaderPage();
    const setQuranHeaderChapter = useQuranHeaderChapter((state) => state.setQuranHeaderChapter);
    const setQuranHeaderVerse = useQuranHeaderVerse((state) => state.setQuranHeaderVerse);
    
    useEffect(() => {
        let isMounted = true;
        
        fetchPagesWithinChapter(quranHeaderPage, cache, setCache, setQuranHeaderChapter, setQuranHeaderVerse).then((updatedCache) => {
            if (isMounted) {
                setCache(updatedCache);
            }
        });

        return () => { 
            isMounted = false;
        };
    }, [quranHeaderPage]); 

    return (
        <div className="flex flex-col items-center justify-center pt-6">
            {Object.entries(cache).map(([pageNumber, verses]) => (
                <QuranPage key={pageNumber} verses={verses} pageNumber={pageNumber} />
            ))}
        </div>
    );
};

export default QuranInfiniteScroll;
