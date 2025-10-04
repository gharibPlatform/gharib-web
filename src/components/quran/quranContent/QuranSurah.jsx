import { useState, useEffect, useRef } from "react";
import QuranPage from "./QuranPage";
import { verseByKey } from "../../../utils/quran/quran";
import useQuranHeaderVerse from "../../../stores/verseQuranHeaderStore";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import useKhatmaStore from "../../../stores/khatmasStore";
import { useRouter } from "next/navigation";

export default function QuranSurah({
  cache,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
  currentKhatma,
  currentReadVerse,
  isLoading = false,
  totalPages,
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
  const { quranHeaderChapter } = useQuranHeaderChapter();
  const { readVersesKeys, setReadVersesKeys } = useKhatmaStore();
  const router = useRouter();

  const getLineRefs = (pageNumber) => {
    if (!lineRefs.current[pageNumber]) {
      lineRefs.current[pageNumber] = { current: {} };
    }

    return lineRefs.current[pageNumber];
  };

  const doesVerseExist = (verseKey) => {
    for (const pageNumber in lineRefs.current) {
      const pageRefs = lineRefs.current[pageNumber];

      for (const lineNumber in pageRefs.current) {
        const element = pageRefs.current[lineNumber];
        if (element?.dataset.verseKeys?.includes(verseKey)) {
          return {
            result: true,
            pageNumber: pageNumber,
            lineNumber: lineNumber,
          };
        }
      }
    }

    return { result: false, pageNumber: null, lineNumber: null };
  };

  // Scroll to verse logic
  useEffect(() => {
    if (goToVerse && quranHeaderChapter) {
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

      if (!verseCheck?.result) {
        router.push(`/quran/chapters/${quranHeaderChapter.id}/${goToVerse.split(":")[1]}`);
        return;

        // verseByKey(goToVerse).then((resp) => {
        //   const targetPageNumber = resp.page_number;

        //   const pageContainer = document.querySelector(
        //     `[data-page-number="${targetPageNumber}"]`
        //   );

        //   if (pageContainer) {
        //     pageContainer.scrollIntoView({
        //       behavior: "smooth",
        //       block: "center",
        //     });
        //     setActiveVerse({
        //       verse_key: goToVerse,
        //     });
        //   }
        // });
      }

      if (verseCheck?.result) {

        const pageRefs = lineRefs.current[verseCheck.pageNumber];
        const foundEntry = pageRefs.current[verseCheck.lineNumber];

        if (foundEntry) {
          foundEntry.scrollIntoView({ behavior: "smooth", block: "center" });
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
      {Object.entries(cache).map(([pageNumber, { data, isLoaded }]) =>
        !isLoaded ? (
          <QuranPage
            key={`skeleton-${pageNumber}`}
            verses={[]}
            pageNumber={pageNumber}
            setClickBoxBool={setClickBoxBool}
            setBoxPosition={setBoxPosition}
            setVerseKey={setVerseKey}
            versesState={versesState}
            currentReadVerse={currentReadVerse}
            isLoaded={false}
            lineRefs={getLineRefs(pageNumber)}
          />
        ) : (
          <QuranPage
            key={pageNumber}
            verses={data}
            pageNumber={pageNumber}
            setClickBoxBool={setClickBoxBool}
            setBoxPosition={setBoxPosition}
            setVerseKey={setVerseKey}
            versesState={versesState}
            currentReadVerse={currentReadVerse}
            isLoaded={isLoaded}
            lineRefs={getLineRefs(pageNumber, true)}
          />
        )
      )}
    </div>
  );
}
