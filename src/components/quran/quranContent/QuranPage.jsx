import { useRef } from "react";
import useQuranHeaderVerse from "../../../stores/verseQuranHeaderStore";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import Image from "next/image";

const isBasmalaPre = (chapterId, pageNumber, chapterFirstPageNumber) => {
  const isFirstPage = pageNumber === chapterFirstPageNumber;
  const isNoBasmala = chapterId === 9 || chapterId === 1;
  if (!isFirstPage || isNoBasmala) {
    return null;
  }

  return (
    <div className="flex items-center justify-center pb-12">
      <Image alt="basmala" src="/Basmala.svg" width={200} height={200} />
    </div>
  );
};

const isSurahPre = (pageNumber, chapterFirstPageNumber, chapterId) => {
  const isFirstPage = pageNumber === chapterFirstPageNumber;
  if (isFirstPage) {
    return (
      <div>
        <div
          className="text-5xl font-arabic leading-relaxed transition-colors group-hover:text-[var(--b-color)]"
          style={{ color: "var(--w-color)", fontFamily: "surahnames" }}
        >
          {chapterId.toString().padStart(3, "0")}
          surah
        </div>
      </div>
    );
  }
  return false;
};

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

const QuranPageSkeleton = ({ pageNumber, lineRefs }) => {
  return (
    <div
      ref={(el) => {
        if (el) {
          lineRefs.current[pageNumber] = el;
          el.dataset.pageNumber = pageNumber;
        }
      }}
      className="w-10/12 rounded-sm text-[var(--w-color)] text-center text-4xl pl-16 pt-16 relative"
      style={{ minHeight: "100vh" }}
      data-page-number={pageNumber}
    >
      {/* Skeleton lines as big boxes */}
      <div
        style={{
          direction: "rtl",
        }}
        className="space-y-4"
      >
        {Array.from({ length: 15 }).map((_, lineIndex) => (
          <div
            key={`skeleton-line-${lineIndex}`}
            className="w-full h-10 bg-[var(--light-color)] rounded-sm animate-pulse opacity-20"
          />
        ))}
      </div>

      {/* Page number skeleton */}
      <div className="pt-12 gap-6 flex items-center justify-center text-base">
        <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)] opacity-30"></div>
        <div className="px-6 text-[var(--lighter-color)] opacity-50">
          {pageNumber}
        </div>
        <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)] opacity-30"></div>
      </div>
    </div>
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
  isLoaded = false,
  lineRefs,
}) {
  const pageNumberString = pageNumber.toString().padStart(3, "0");
  const pageNumberRef = useRef(null);
  const ref = useRef(null);
  const { activeVerse, setActiveVerse, goToVerse } = useQuranHeaderVerse();
  const { quranHeaderChapter } = useQuranHeaderChapter();

  if (!isLoaded || !verses || verses.length === 0) {
    return <QuranPageSkeleton pageNumber={pageNumber} lineRefs={lineRefs} />;
  }

  const handleClick = (event, verseKey) => {
    setClickBoxBool(true);
    console.log("verseKey", verseKey);
    const rect = event.target.getBoundingClientRect();

    setBoxPosition({
      x: rect.left - 400,
      y: rect.top + window.scrollY - 30,
    });

    const completeVerse = verses.find((verse) => verse.verse_key === verseKey);
    setVerseKey(verseKey);
    setActiveVerse(completeVerse);
  };

  return (
    <div
      className="w-10/12 rounded-sm text-[var(--w-color)] text-center text-4xl mx-auto pt-16 relative"
      // style={{ minHeight: "100vh" }}
      data-page-number={pageNumber}
      ref={ref}
    >
      <div
        style={{
          fontFamily: `p${pageNumberString}-v1`,
          direction: "rtl",
        }}
      >
        {isSurahPre(
          parseInt(pageNumber),
          quranHeaderChapter.pages[0],
          quranHeaderChapter.id
        )}
        {isBasmalaPre(
          quranHeaderChapter.id,
          parseInt(pageNumber),
          quranHeaderChapter.pages[0]
        )}
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

  const verseKeysInThisLine = Array.from(
    new Set(allWordsByLine[lineNumber].map((word) => word.verse_key))
  );

  const primaryVerseKey = allWordsByLine[lineNumber][0].verse_key;

  return (
    <div
      key={`line-${lineNumber}`}
      className={lineClassNames}
      ref={(el) => {
        if (el) {
          lineRefs.current[lineNumber] = el;
          el.dataset.verseKey = primaryVerseKey;
          el.dataset.verseKeys = verseKeysInThisLine.join(",");
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
    "transition-all duration-300 ",
    isActive ? "bg-[var(--g-color)]" : "",
    isNotYetRead ? "text-[var(--g-color)]" : "",
    shouldHighlight ? "text-[var(--o-color)]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      key={`line-${lineNumber}-word-${wordIndex}`}
      onClick={(e) => handleClick(e, word.verse_key)}
      className={wordClassNames}
      data-verse-key={word.verse_key}
    >
      {word.text}
    </span>
  );
};
