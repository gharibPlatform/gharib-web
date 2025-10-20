import { useEffect } from "react";
import { verseByChapterRange } from "../../utils/quran/quran";
import useQuranHeaderChapter from "../../stores/chapterQuranHeaderStore";

export function useFetchChapterData(
  shouldFetch,
  quranHeaderChapter,
  currentKhatma,
  setCache,
  setLastFetchedPage,
  setPriority,
  setIsLoading = () => {}
) {
  const { pageToFetch } = useQuranHeaderChapter();

  useEffect(() => {
    if (shouldFetch !== "chapter" || !quranHeaderChapter) return;
    let isMounted = true;

    console.log("currentKhatma is : ", currentKhatma);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (pageToFetch) {
          console.log("pageToFetch is : ", pageToFetch);
        }

        const updatedCache = currentKhatma
          ? await verseByChapterRange(
              quranHeaderChapter,
              pageToFetch,
              currentKhatma?.startShareVerse,
              currentKhatma?.endShareVerse
            )
          : await verseByChapterRange(quranHeaderChapter, pageToFetch);

        if (isMounted) {
          const loadedPages = Object.values(updatedCache).filter(
            (page) => page.isLoaded
          );

          const keys = Object.keys(loadedPages);
          console.log("keys are : ", keys);
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
  }, [quranHeaderChapter, shouldFetch, currentKhatma, pageToFetch]);
}
