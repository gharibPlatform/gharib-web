import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { audioByVerse } from "../../../../utils/quran/quranAudio";
import QuranSurahSeparator from "./QuranSurahSeparator";
import toast from "react-hot-toast";
import useQuranHeaderVerse from "../../../../stores/verseQuranHeaderStore";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import useKhatmaStore from "../../../../stores/khatmasStore";

import { useRouter } from "next/navigation";
export default function QuranPage({
  verses,
  pageNumber,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
}) {
  const pageNumberString = pageNumber.toString().padStart(3, "0");
  const pageNumberRef = useRef(null);

  const verseRefs = useRef({});
  const observerRef = useRef(null);
  const ref = useRef(null);

  //headerVerse for scroll into view
  const { goToVerse, setQuranHeaderVerse, activeVerse, setActiveVerse } =
    useQuranHeaderVerse();
  const { quranHeaderChapter } = useQuranHeaderChapter();
  const { currentKhatma } = useKhatmaStore();

  const [versesState, setVersesState] = useState({
    alreadyRead: new Set(),
    notYetRead: new Set(),
    notInKhatma: new Set(),
  });

  useEffect(() => {
    if (currentKhatma) {
      const alreadyReadKeys = new Set();
      const notYetReadKeys = new Set();
      const notInKhatmaKeys = new Set();

      verses.forEach((verse) => {
        const [surah, ayah] = verse.verse_key.split(":").map(Number);

        if (
          surah > currentKhatma.endShareSurah ||
          (surah === currentKhatma.endShareSurah &&
            ayah > currentKhatma.endShareVerse) ||
          surah < currentKhatma.startShareSurah ||
          (surah === currentKhatma.startShareSurah &&
            ayah < currentKhatma.startShareVerse)
        ) {
          notInKhatmaKeys.add(verse.verse_key);
        } else if (
          surah < currentKhatma.currentSurah ||
          (surah === currentKhatma.currentSurah &&
            ayah < currentKhatma.currentVerse)
        ) {
          alreadyReadKeys.add(verse.verse_key);
        } else {
          notYetReadKeys.add(verse.verse_key);
        }
      });

      setVersesState({
        notInKhatma: notInKhatmaKeys,
        alreadyRead: alreadyReadKeys,
        notYetRead: notYetReadKeys,
      });
    }
  }, [currentKhatma, verses]);

  const router = useRouter();

  useEffect(() => {
    if (goToVerse) {
      if (quranHeaderChapter.id != goToVerse.split(":")[0]) {
        const goToChapter = goToVerse.split(":")[0];
        router.push(`/quran/chapters/${goToChapter}`);
        return;
      }

      const goToVerseNumber = goToVerse.split(":")[1];
      const foundEntry = Object.entries(verseRefs.current).find(([key, _]) =>
        key.endsWith(`:${goToVerseNumber}`)
      );

      if (foundEntry)
        foundEntry[1].scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveVerse({
        verse_key: goToVerse,
      });
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
              className={`scroll-mt-20 hover:bg-[var(--main-color-hover)] 
                ${activeVerse?.verse_key == verse.verse_key ? "bg-[var(--g-color)]" : ""}
                ${currentKhatma && versesState?.alreadyRead.has(verse.verse_key) ? "text-[var(--o-color)]" : ""}
                ${currentKhatma && versesState?.notYetRead.has(verse.verse_key) ? "text-[var(--g-color)]" : ""}
                ${currentKhatma && versesState?.notInKhatma.has(verse.verse_key) ? "text-[var(--w-color)]" : ""}
              `}
              ref={(el) => {
                if (verseRefs.current[verse.verse_key]) {
                  delete verseRefs.current[verse.verse_key];
                }
                if (el) verseRefs.current[verse.verse_key] = el;
              }}
              style={{ display: "inline" }}
              onClick={() => setActiveVerse(verse)}
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
                  {word.text}
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
