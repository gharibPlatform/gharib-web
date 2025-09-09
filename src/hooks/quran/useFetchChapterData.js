import { useEffect } from "react";
import { verseByChapter } from "../../utils/quran/quran";

export function useFetchChapterData(
  shouldFetch,
  quranHeaderChapter,
  currentKhatma,
  setCache,
  setLastFetchedPage,
  setPriority
) {
  useEffect(() => {
    if (shouldFetch !== "chapter") return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        const updatedCache = currentKhatma
          ? await verseByChapter(
              quranHeaderChapter.id,
              currentKhatma?.startShareVerse,
              currentKhatma?.endShareVerse
            )
          : await verseByChapter(quranHeaderChapter.id);

        if (isMounted) {
          const keys = Object.keys(updatedCache);
          setLastFetchedPage(+keys[keys.length - 1]);
          setCache(updatedCache);
          setPriority(true);
        }
      } catch (error) {
        console.error("Error fetching chapter data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [quranHeaderChapter, shouldFetch, currentKhatma]);
}
