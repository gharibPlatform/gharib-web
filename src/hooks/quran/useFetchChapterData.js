import { useEffect } from "react";
import { verseByChapter } from "../../utils/quran/quran";

export function useFetchChapterData(
  shouldFetch,
  quranHeaderChapter,
  currentKhatma,
  setCache,
  setLastFetchedPage,
  setPriority,
  setIsLoading = () => {} 
) {
  useEffect(() => {
    if (shouldFetch !== "chapter") return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);

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
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching chapter data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [quranHeaderChapter, shouldFetch, currentKhatma]);
}
