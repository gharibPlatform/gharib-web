import { useState, useEffect, useRef } from "react";
import QuranPage from "./QuranPage";
import useQuranHeaderVerse from "../../../stores/verseQuranHeaderStore";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import useKhatmaStore from "../../../stores/khatmasStore";
import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";

export default function QuranSurah({
  cache,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
  currentKhatma,
  currentReadVerse,
  isLoading = false,
  isKhatmaMode,
  scrollFetchPage,
}) {
  const [versesState, setVersesState] = useState({
    alreadyRead: new Set(),
    notYetRead: new Set(),
    notInKhatma: new Set(),
  });

  const lineRefs = useRef({});
  const observerRef = useRef(null);

  // Header verse for scroll into view
  const { goToVerse, setQuranHeaderVerse, setActiveVerse } =
    useQuranHeaderVerse();
  const { quranHeaderChapter, pageToFetch } = useQuranHeaderChapter();
  const { readVersesKeys, setReadVersesKeys } = useKhatmaStore();
  const router = useRouter();

  const getLineRefs = (pageNumber) => {
    if (!lineRefs.current[pageNumber]) {
      lineRefs.current[pageNumber] = { current: {} };
    }

    return lineRefs.current[pageNumber];
  };

  const doesVerseExist = (verseKey) => {
    for (const [pageNumber, pageRefs] of Object.entries(lineRefs.current)) {
      if (!pageRefs?.current) continue;

      for (const [lineNumber, element] of Object.entries(pageRefs.current)) {
        if (!element?.dataset?.verseKeys) continue;
        if (element.dataset.verseKeys.split(",").includes(verseKey)) {
          return { result: true, pageNumber, lineNumber };
        }
      }
    }
    return { result: false, pageNumber: null, lineNumber: null };
  };

  useEffect(() => {
    const cachePageNumbers = new Set(Object.keys(cache));

    for (const pageNumber in lineRefs.current) {
      if (!cachePageNumbers.has(pageNumber)) {
        delete lineRefs.current[pageNumber];
      }
    }
  }, [cache]);

  // Scroll to verse logic
  useEffect(() => {
    if (goToVerse && quranHeaderChapter && !isKhatmaMode) {
      console.log("Navigating to verse:", goToVerse);
      console.log("lineRefs is : ", lineRefs);

      console.log(
        "bool is :",
        quranHeaderChapter?.id != goToVerse.split(":")[0]
      );

      console.log("quranHeaderChapter is : ", quranHeaderChapter);

      if (quranHeaderChapter?.id != goToVerse.split(":")[0]) {
        const goToChapter = goToVerse.split(":")[0];
        router.push(`/quran/chapters/${goToChapter}`);
        return;
      }

      const verseCheck = doesVerseExist(goToVerse);

      console.log("verseCheck is : ", verseCheck);
      if (!verseCheck?.result) {
        router.push(
          `/quran/chapters/${quranHeaderChapter.id}/${goToVerse.split(":")[1]}`
        );
        return;
      }

      if (verseCheck?.result) {
        const pageRefs = lineRefs.current[verseCheck.pageNumber];
        const foundEntry = pageRefs.current[verseCheck.lineNumber];

        console.log("foundEntry is : ", foundEntry);
        if (foundEntry) {
          foundEntry.scrollIntoView({ behavior: "smooth", block: "center" });
          setActiveVerse({
            verse_key: goToVerse,
          });
        }
      }
    }
  }, [goToVerse]);

  useEffect(
    () => {
      if (!pageToFetch) return;
      const el = document.querySelector(`[data-page-number="${pageToFetch}"]`);
      if (el) {
        setActiveVerse({
          verse_key: goToVerse,
        });
        el.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    },
    [cache[pageToFetch]],
    pageToFetch
  );

  // Observing logic for intersection observer
  useEffect(() => {
    if (isLoading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const verseKeysLines = {};
    const allLines = [];

    Object.values(lineRefs.current).forEach((pageRefs) => {
      const pageLines = Object.values(pageRefs.current);
      pageLines.forEach((el) => {
        if (el) {
          const verseKey = el.dataset.verseKey;
          if (!verseKeysLines[verseKey]) {
            verseKeysLines[verseKey] = [];
          }
          verseKeysLines[verseKey].push(el);
          allLines.push(el);
        }
      });
    });

    // Create the observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentVerseKey = entry.target.dataset.verseKey;
            const currentVerseLines = verseKeysLines[currentVerseKey];

            if (!currentVerseLines) return;

            const lineIndex = currentVerseLines.indexOf(entry.target);

            if (lineIndex === currentVerseLines.length - 1) {
              const verseNumber = currentVerseKey.split(":")[1];
              setQuranHeaderVerse(verseNumber);

              const allVerseKeysInLine =
                entry.target.dataset.verseKeys.split(",");

              allVerseKeysInLine.forEach((verseKey) => {
                setReadVersesKeys(verseKey.trim());
              });

              console.log("Marked as read:", allVerseKeysInLine);
            }
          }
        });
      },
      {
        threshold: 1,
      }
    );

    // Observe all lines
    allLines.forEach((el) => {
      if (el) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [cache, isLoading]);

  useEffect(() => {
    if (currentKhatma && !isLoading) {
      const alreadyReadKeys = new Set();
      const notYetReadKeys = new Set();
      const notInKhatmaKeys = new Set();

      Object.values(cache)
        .flatMap((page) => page.data)
        .forEach((verse) => {
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
  }, [currentKhatma, cache, isLoading]);

  useEffect(() => {
    console.log("cache is : ", cache);
  }, [cache]);

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <Virtuoso
        style={{ height: "400vh", width: "100%" }}
        totalCount={Object.keys(cache).length}
        rangeChanged={({ startIndex }) => {
          const [pageNumber] = Object.entries(cache)[startIndex] || [];
          if (pageNumber) {
            scrollFetchPage(parseInt(pageNumber) + 1);
          }
        }}
        itemContent={(index) => {
          const [pageNumber, { data, isLoaded }] = Object.entries(cache)[index];
          return (
            <QuranPage
              key={pageNumber}
              verses={isLoaded ? data : []}
              pageNumber={pageNumber}
              setClickBoxBool={setClickBoxBool}
              setBoxPosition={setBoxPosition}
              setVerseKey={setVerseKey}
              versesState={versesState}
              currentReadVerse={currentReadVerse}
              isLoaded={isLoaded}
              lineRefs={getLineRefs(pageNumber)}
            />
          );
        }}
      />
    </div>
  );
}
