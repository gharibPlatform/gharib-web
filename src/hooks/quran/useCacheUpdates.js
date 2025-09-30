import { useEffect } from "react";

export function useCacheUpdates(cache, addedPage, setCache) {
  useEffect(() => {
    if (addedPage && addedPage.length > 0 && addedPage[0]) {
      const page_number = addedPage[0].page_number;
      if (cache[page_number]) {
        return;
      }

      setCache({
        ...cache,
        [page_number]: {
          data: addedPage,
          isLoaded: true,
        },
      });
    }
  }, [addedPage]);
}
