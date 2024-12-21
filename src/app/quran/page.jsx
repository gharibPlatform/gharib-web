'use client'
import { verseByChapter } from "@/utils/quran";
import QuranContent from "@/components/common/quran/QuranContent";
import { useState } from "react";

const Page = () => {
    const [response, setResponse] = useState("");
      verseByChapter(114)
      .then(response => {
          console.log('the surah is :', response[0].words);
          setResponse(response[0].words)
      })
      .catch(error => {
          console.error('error fetching :', error);
      });
      // response

  return (
    <div>
        <QuranContent />
        {/* {response.} */}
    </div>
  );
};

export default Page;
