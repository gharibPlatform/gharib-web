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
    let isFetching = false; 

    const handleScroll = () => {
      if (!scrollRef.current || isFetching) return;

      const totalPages =
        quranHeaderChapter?.pages[1] - quranHeaderChapter?.pages[0] + 1;
      const scrollHeight = scrollRef.current.scrollHeight;
      const scrollTop = scrollRef.current.scrollTop;
      const innerHeight = window.innerHeight;

      if (
        scrollTop + innerHeight + 3600 >=
          scrollHeight - scrollHeight * totalPages &&
        lastFetchedPage
      ) {
        const nextPage = lastFetchedPage + 1;
        isFetching = true; 

        verseByPageAndChapter(
          nextPage,
          quranHeaderChapter.id,
          currentKhatma?.endShareVerse,
          currentKhatma?.endShareSurah
        ).then((resp) => {
          isFetching = false; 

          if (resp.length > 0 && resp[0].page_number === nextPage) {
            setAddedPage(resp);
            setLastFetchedPage(nextPage);
          }
        });
      }
    };

    const scrollableDiv = scrollRef.current;
    if (!scrollableDiv) return;

    scrollableDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDiv.removeEventListener("scroll", handleScroll);
    };
  }, [
    lastFetchedPage,
    quranHeaderChapter,
    currentKhatma,
    setAddedPage,
    setLastFetchedPage,
    scrollRef,
  ]);
}
