import { useEffect } from "react";
import { getChapter, verseByPage } from "../../utils/quran/quran";

export function useFetchPageData(
  shouldFetch,
  quranHeaderPage,
  quranHeaderChapter,
  setQuranHeaderChapter,
  setGoToPath,
  setCache,
  setIsLoading = () => {} 
) {
  useEffect(() => {
    if (shouldFetch !== "page") return;
    let isMounted = true;

    setIsLoading(true);

    verseByPage(quranHeaderPage)
      .then((updatedCache) => {
        if (
          !quranHeaderChapter ||
          quranHeaderChapter.id !== updatedCache[0].verse_key.split(":")[0]
        ) {
          getChapter(updatedCache[0].verse_key.split(":")[0]).then((resp) => {
            setQuranHeaderChapter(resp);
            setGoToPath(false);
          });
        }
        if (isMounted) {
          const tempObj = { [quranHeaderPage]: updatedCache };
          setCache(tempObj);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching page data:", error);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [quranHeaderPage, shouldFetch]);
}
