import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { audioByVerse } from "../../../../utils/quran/quranAudio";
import QuranSurahSeparator from "./QuranSurahSeparator";
import toast from "react-hot-toast";
import useQuranHeaderVerse from "../../../../stores/verseQuranHeaderStore";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import useKhatmaStore from "../../../../stores/khatmasStore";
import { useRouter } from "next/navigation";

const processVerses = (verses) => {
  const allWordsByLine = {};
  let currentVerseKey = null;
  let verseStarts = new Set();

  verses?.forEach((verse) => {
    verse.words.forEach((word) => {
      if (!allWordsByLine[word.line_number]) {
        allWordsByLine[word.line_number] = [];
      }

      if (verse.verse_key !== currentVerseKey) {
        verseStarts.add(word.line_number);
        currentVerseKey = verse.verse_key;
      }

      allWordsByLine[word.line_number].push({
        ...word,
        verse_key: verse.verse_key,
        verse_number: verse.verse_number,
      });
    });
  });

  return { allWordsByLine, verseStarts };
};

const renderWord = (
  word,
  lineNumber,
  wordIndex,
  activeVerse,
  versesState,
  currentReadVerse,
  handleClick
) => {
  const isActive = activeVerse?.verse_key === word.verse_key;
  const isNotYetRead = versesState?.notYetRead.has(word.verse_key);
  const verseNumber = parseInt(word.verse_key.split(":")[1], 10);
  const shouldHighlight = currentReadVerse >= verseNumber && isNotYetRead;

  const wordClassNames = [
    "p-[1px]",
    "pb-3",
    "inline-block",
    "cursor-pointer",
    isActive ? "bg-[var(--g-color)]" : "",
    isNotYetRead ? "text-[var(--g-color)]" : "",
    shouldHighlight ? "text-[var(--o-color)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      key={`line-${lineNumber}-word-${wordIndex}`}
      onClick={(e) => handleClick(e, { verse_key: word.verse_key })}
      className={wordClassNames}
      data-verse-key={word.verse_key}
    >
      {word.text}
    </span>
  );
};

const renderLine = (
  lineNumber,
  allWordsByLine,
  verseStarts,
  activeVerse,
  versesState,
  currentReadVerse,
  handleClick,
  lineRefs
) => {
  const isVerseStart = verseStarts.has(Number(lineNumber));
  const lineClassNames = [
    `verse-line-${lineNumber}`,
    isVerseStart ? "verse-start" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      key={`line-${lineNumber}`}
      className={lineClassNames}
      ref={(el) => {
        if (el) {
          lineRefs.current[lineNumber] = el;
          el.dataset.verseKey = allWordsByLine[lineNumber][0].verse_key;
        }
      }}
      style={{ display: "block" }}
    >
      {allWordsByLine[lineNumber].map((word, wordIndex) =>
        renderWord(
          word,
          lineNumber,
          wordIndex,
          activeVerse,
          versesState,
          currentReadVerse,
          handleClick
        )
      )}
    </div>
  );
};

const renderAllLines = (
  verses,
  activeVerse,
  versesState,
  currentReadVerse,
  handleClick,
  lineRefs
) => {
  const { allWordsByLine, verseStarts } = processVerses(verses);
  const lineNumbers = Object.keys(allWordsByLine).sort((a, b) => a - b);

  return lineNumbers.map((lineNumber) =>
    renderLine(
      lineNumber,
      allWordsByLine,
      verseStarts,
      activeVerse,
      versesState,
      currentReadVerse,
      handleClick,
      lineRefs
    )
  );
};

export default function QuranPage({
  verses,
  pageNumber,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
  versesState,
  currentReadVerse,
}) {
  const pageNumberString = pageNumber.toString().padStart(3, "0");
  const pageNumberRef = useRef(null);
  const lineRefs = useRef({});
  const observerRef = useRef(null);
  const ref = useRef(null);

  //headerVerse for scroll into view
  const { goToVerse, setQuranHeaderVerse, activeVerse, setActiveVerse } =
    useQuranHeaderVerse();
  const { quranHeaderChapter } = useQuranHeaderChapter();
  const { currentKhatma } = useKhatmaStore();
  const router = useRouter();

  useEffect(() => {
    if (goToVerse) {
      console.log(goToVerse);
      if (quranHeaderChapter.id != goToVerse.split(":")[0]) {
        const goToChapter = goToVerse.split(":")[0];
        router.push(`/quran/chapters/${goToChapter}`);
        return;
      }

      const goToVerseNumber = goToVerse.split(":")[1];
      const foundEntry = Object.values(lineRefs.current).find((el) =>
        el?.dataset.verseKey.endsWith(`:${goToVerseNumber}`)
      );

      if (foundEntry)
        console.log("foundEntry", foundEntry);
        foundEntry?.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveVerse({
        verse_key: goToVerse,
      });
    }
  }, [goToVerse]);

  //observing the lines
  useEffect(() => {
    //Creating the observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setQuranHeaderVerse(entry.target.dataset.verseKey.split(":")[1]);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    Object.values(lineRefs.current).forEach((el) => {
      if (el) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
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
      className="w-10/12 rounded-sm text-[var(--w-color)] text-center text-4xl pl-16 pt-16 relative"
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
        {renderAllLines(
          verses,
          activeVerse,
          versesState,
          currentReadVerse,
          handleClick,
          lineRefs
        )}
      </div>

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
