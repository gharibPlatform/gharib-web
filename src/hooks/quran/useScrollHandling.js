import { useEffect } from "react";
import { verseByPageAndChapter } from "../../utils/quran/quran";

export function useScrollHandling(
  scrollRef,
  lastFetchedPage,
  quranHeaderChapter,
  currentKhatma,
  setAddedPage,
  setLastFetchedPage
) {
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const scrollHeight = scrollRef.current.scrollHeight;
      const scrollTop = scrollRef.current.scrollTop;
      const innerHeight = window.innerHeight;

      if (scrollTop + innerHeight + 3600 >= scrollHeight && lastFetchedPage) {
        const nextPage = lastFetchedPage + 1;

        verseByPageAndChapter(
          nextPage,
          quranHeaderChapter.id,
          currentKhatma?.endShareVerse,
          currentKhatma?.endShareSurah
        ).then((resp) => {
          setAddedPage(resp);
        });

        setLastFetchedPage(nextPage);
      }
    };

    const scrollableDiv = scrollRef.current;
    if (!scrollableDiv) return;

    scrollableDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDiv.removeEventListener("scroll", handleScroll);
    };
  }, [lastFetchedPage, quranHeaderChapter, currentKhatma]);
}
