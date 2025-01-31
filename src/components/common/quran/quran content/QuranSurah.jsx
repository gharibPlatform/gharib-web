import React, { useEffect, useState, useRef } from "react";
import { fetchPagesWithinChapter } from "@/utils/quran";
import QuranPage from "./QuranPage";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";

const QuranInfiniteScroll = () => {
    const [pagesData, setPagesData] = useState([]);
    const { quranHeaderPage } = useQuranHeaderPage();
    const setQuranHeaderChapter = useQuranHeaderChapter((state) => state.setQuranHeaderChapter);
    const setQuranHeaderVerse = useQuranHeaderVerse((state) => state.setQuranHeaderVerse);
    
    useEffect(()=>{
        let isMounted = true;
        fetchPagesWithinChapter(quranHeaderPage, 4, 604, setQuranHeaderChapter, setQuranHeaderVerse).then((data) => {
            if (isMounted) {
                setPagesData(data); 
            }
        });

        return () => { 
            isMounted = false;
        };
    }, [quranHeaderPage]);

    return (
        <div className="flex flex-col items-center justify-center pt-6">
            {Object.entries(pagesData).map(([key, verses]) => (
                <QuranPage 
                    verses={verses} 
                    pageNumber={key} 
                />
            ))}
        </div>
    );
};

export default QuranInfiniteScroll;
