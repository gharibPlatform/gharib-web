import React, { useEffect, useState, useRef } from "react";
import { fetchPagesWithinChapter } from "@/utils/quran";
import QuranPage from "./QuranPage";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";

const QuranInfiniteScroll = () => {
    const [pagesData, setPagesData] = useState([]);
    const { quranHeaderPage } = useQuranHeaderPage();
    
    useEffect(()=>{
        let isMounted = true;
        fetchPagesWithinChapter(quranHeaderPage, 3).then((data) => {
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
