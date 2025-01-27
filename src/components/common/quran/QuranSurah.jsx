import { useState, useEffect } from "react";
import { verseByChapter } from "@/utils/quran";

export default function QuranSurah() {
    const [verses, setVerses] = useState([]);
    const [specialChapterBool, setSpecialChapterBool] = useState(false);
    const chapterNumber = "009";

    useEffect(() => {
        verseByChapter(chapterNumber).then((data) => {
            if (data && data.length > 0) {
                setVerses(data);
                console.log(data)
            }
        });
    }, []); 

    return (
        <div className="flex items-center justify-center pt-12">
            <div style={{ fontFamily: `p${chapterNumber}-v1` }} className="bg-[var(--dark-color)] w-3/4 h-screen rounded-sm overflow-y-auto no-scrollbar text-[var(--w-color)] justify-center text-center text-4xl pl-16 pr-16 pt-12 pb-12">   

                {verses.flatMap(verse => 
                    verse.words.map((word) => (
                        <span className="p-1 ">{word.text} </span>
                    ))
                )}
                <div className="h-1 pt-24 pb-12"></div>
            </div>
        </div>
    );
}
