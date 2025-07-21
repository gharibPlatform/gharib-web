import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { audioByVerse } from "../../../../utils/quran/quranAudio";
import QuranSurahSeparator from "./QuranSurahSeparator";
import toast from "react-hot-toast";
import useQuranHeaderVerse from "../../../../stores/verseQuranHeaderStore";

export default function QuranPage({
  verses,
  pageNumber,
  changeProgress,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
}) {
  const pageNumberString = pageNumber.toString().padStart(3, "0");
  const pageNumberRef = useRef(null);

  // Add refs for each verse
  const verseRefs = useRef({});
  const observerRef = useRef(null);
  const ref = useRef(null);

  const [activeVerse, setActiveVerse] = useState(null); //state for focusing in the background when clicking on it or when navigating to it;
  //headerVerse for scroll into view
  const { goToVerse, setQuranHeaderVerse } = useQuranHeaderVerse();
  
  useEffect(() => {
    if (goToVerse) {
      const foundEntry = Object.entries(verseRefs.current).find(([key, _]) =>
        key.endsWith(`:${goToVerse}`)
      );

      if (foundEntry)
        foundEntry[1].scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveVerse(goToVerse);
    }
  }, [goToVerse]);

  //observing the verses
  useEffect(() => {
    //Creating the observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const verseKey = entry.target.dataset.verseKey.split(":")[1];
            setQuranHeaderVerse(verseKey);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    //Observing the verses
    console.log(verseRefs.current);

    Object.values(verseRefs.current).forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    //Cleaning
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [verses]);

  //pop up of verse when clicking on it
  const handleClick = (event, verse) => {
    setClickBoxBool(true);
    const rect = event.target.getBoundingClientRect();

    setBoxPosition({
      x: rect.left - 400,
      y: rect.top + window.scrollY - 30,
    });

    setVerseKey(verse.verse_key);
  };

  return (
    <div
      className="w-9/12 rounded-sm text-[var(--w-color)] text-center text-4xl pl-16 pt-16 relative"
      style={{ minHeight: "100vh" }}
      data-page-number={pageNumber}
      ref={ref}
    >
      <div
        style={{
          fontFamily: `p${pageNumberString}-v1`,
          direction: "rtl",
        }}
      >
        {/* actual verses */}
        {Array.isArray(verses) &&
          verses.flatMap((verse, index) => (
            <div
              key={verse.verse_key}
              id={`verse-${verse.verse_key}`}
              data-verse-key={verse.verse_key}
              className={`scroll-mt-20 hover:bg-[var(--main-color-hover)] ${activeVerse == verse.verse_key.split(":")[1] ? "bg-[var(--g-color)]" : ""}`}
              ref={(el) => {
                if (verseRefs.current[verse.verse_key]) {
                  delete verseRefs.current[verse.verse_key];
                }
                if (el) verseRefs.current[verse.verse_key] = el;
              }}
              style={{ display: "inline" }}
            >
              {/* Surah separator logic */}
              {verse.verse_number === 1 &&
                (index !== 0 ? (
                  <QuranSurahSeparator
                    chapterId={verse.verse_key.split(":")[0].padStart(3, "0")}
                    pageNumber={pageNumber}
                    pageNumberBool={true}
                    basmalaPre={true}
                  />
                ) : Number(verse.verse_key.split(":")[0]) === 1 ||
                  Number(verse.verse_key.split(":")[0]) === 9 ? (
                  <QuranSurahSeparator
                    chapterId={verse.verse_key.split(":")[0].padStart(3, "0")}
                  />
                ) : (
                  <QuranSurahSeparator
                    chapterId={verse.verse_key.split(":")[0].padStart(3, "0")}
                    basmalaPre={true}
                  />
                ))}

              {verse.words.map((word, wordIndex) => (
                <span
                  key={`${index}-${wordIndex}`}
                  onClick={(e) => handleClick(e, verse)}
                  className="p-1 pb-3 inline-block cursor-pointer"
                >
                  {word.text}{" "}
                </span>
              ))}
            </div>
          ))}
      </div>

      {/* footer page number*/}
      <div className="pt-12 gap-6 flex items-center justify-center text-base">
        <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
        <div ref={pageNumberRef} className="px-6 text-[var(--lighter-color)]">
          {pageNumber}
        </div>
        <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
      </div>
    </div>
  );
}
