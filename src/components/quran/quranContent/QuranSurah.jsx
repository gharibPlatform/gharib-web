import { useState, useEffect, useRef } from "react";
import QuranPage from "./QuranPage";
import useQuranHeaderVerse from "../../../stores/quran/verseQuranHeaderStore";
import useQuranHeaderChapter from "../../../stores/quran/chapterQuranHeaderStore";
import useKhatmaStore from "../../../stores/khatamat/khatmasStore";
import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import QuranFooter from "../QuranFooter";

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
  currentKhatmaBool,
}) {
  const [versesState, setVersesState] = useState({
    alreadyRead: new Set(),
    notYetRead: new Set(),
    notInKhatma: new Set(),
  });

  const virtuosoRef = useRef(null);
  const lineRefs = useRef({});
  const observerRef = useRef(null);

  // Header verse for scroll into view
  const { goToVerse, setActiveVerse, setQuranHeaderVerse, setGoToVerse } =
    useQuranHeaderVerse();
  const { quranHeaderChapter, pageToFetch } = useQuranHeaderChapter();
  const { setReadVersesKeys } = useKhatmaStore();
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
    console.log("goToVerse is : ", goToVerse);

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
        const pageIndex = Object.keys(cache).indexOf(verseCheck.pageNumber);
        if (pageIndex !== -1 && virtuosoRef.current) {
          virtuosoRef.current.scrollToIndex({
            index: pageIndex,
            align: "center",
            behavior: "smooth",
          });
          setActiveVerse({
            verse_key: goToVerse,
          });
        }
      }
    }
  }, [goToVerse]);

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

    console.log("creating the observer...", observerRef.current);
    // Create the observer
    ((observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("entry is : ", entry);
          if (entry.isIntersecting) {
            const currentVerseKeys = entry.target.dataset.verseKeys.split(",");

            const verseNumber =
              currentVerseKeys[currentVerseKeys.length - 1].split(":")[1];
            setQuranHeaderVerse(verseNumber);

            const allVerseKeysInLine =
              entry.target.dataset.verseKeys.split(",");

            console.log("Marked as read 2 : ", entry.target.dataset.verseKeys);

            allVerseKeysInLine.forEach((verseKey) => {
              setReadVersesKeys(verseKey.trim());
            });

            console.log("Marked as read:", allVerseKeysInLine);
          }
        });
      },

      {
        threshold: 0.5,
      }
    )),
      // Observe all lines
      allLines.forEach((el) => {
        if (el) {
          observerRef.current.observe(el);
        }
      }));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [cache, isLoading]);

  useEffect(() => {
    if (currentKhatma && currentKhatmaBool && !isLoading) {
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

  useEffect(() => {
    setActiveVerse({
      verse_key: goToVerse,
    });
  }, [pageToFetch]);

  const handleBeginningOfTheSurah = () => {
    setQuranHeaderVerse(1);
    //two different state updates to insure that the goToVerse is acutally changing means the useEffect that depends on it for the scrollIntoView is firing well... means two renders
    //could consider another way to do this by using a unique id for each goToVerse like so  :
    //setGoToVerse(`${quranHeaderChapter.id}:${1}:${Date.now()}`); and then later I would still get the same goToVerse but the useEffect
    // would Fire because the state actually changed but I dont know whether this will cause errors later so I would just be good with the two renders...
    setGoToVerse(null);
    setTimeout(() => {
      setGoToVerse(`${quranHeaderChapter.id}:${1}`);
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-8">
      <Virtuoso
        key={pageToFetch || "default"}
        ref={virtuosoRef}
        style={{ height: "100vh", width: "100%" }}
        totalCount={Object.keys(cache).length}
        increaseViewportBy={1200}
        initialTopMostItemIndex={
          pageToFetch ? Object.keys(cache).map(Number).indexOf(pageToFetch) : 0
        }
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
        components={{
          Footer: () => (
            <div className="w-full flex justify-center pt-12 pb-24">
              <QuranFooter
                handleBeginningOfTheSurah={handleBeginningOfTheSurah}
              />
            </div>
          ),
        }}
      />
    </div>
  );
}
