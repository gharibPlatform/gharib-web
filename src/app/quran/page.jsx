'use client'
import { verseByChapter } from "@/utils/quran";
import QuranContent from "@/components/common/quran/QuranContent";
import { useState, useEffect } from "react";

const Page = () => {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        verseByChapter(2)
            .then(res => {
                console.log('the surah is :', res[1].words);
                setResponse(res[7].words);
            })
            .catch(error => {
                console.error('error fetching :', error);
            });
    }, []);

  return (
    <div>
        <QuranContent />
        <div className="flex justify-center items-center absolute top-1/2 left-1/2">
          {response.map((resp, index) => (
            <div className="text-3xl text-[var(--w-color)] rtl" data-font="code_v1" key={index}>{resp.text}</div>
          ))}
        </div>
    </div>
  );
};

export default Page;
