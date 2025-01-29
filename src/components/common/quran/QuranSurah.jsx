import React, { useEffect, useState, useRef } from "react";
import { fetchPagesWithinChapter } from "@/utils/quran";
import QuranPage from "./QuranPage";

const QuranInfiniteScroll = () => {
    const [pagesData, setPagesData] = useState([]);
    const currentPage = 1; 
    // const pageNumberString = currentPage.toString().padStart(3, "0");

    useEffect(()=>{
        let isMounted = true;
        fetchPagesWithinChapter(currentPage, 3).then((data) => {
            if (isMounted) {
                setPagesData(data); 
            }
        });

        return () => {
            isMounted = false;
        };
    }, [currentPage]);

    console.log(pagesData)
    return (
        <div className="flex items-center justify-center pt-6">
            <div
                style={{
                    direction: "rtl",
                }}
                className="bg-[var(--dark-color)] w-3/4 rounded-sm h-screen no-scrollbar overflow-y-auto text-[var(--w-color)] text-center text-4xl pl-16 pr-16 pt-12"
            >
                
            {Object.entries(pagesData).map(([key, verses]) => (
                <QuranPage 
                    verses={verses} 
                    pageNumber={key} 
                />
            ))}
            {/* <div className="pt-32"></div> */}
            </div>
        </div>
    );
};

export default QuranInfiniteScroll;
