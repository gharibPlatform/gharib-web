import { useEffect } from "react";

export function useCacheUpdates(cache, addedPage, setCache) {
  useEffect(() => {
    if (addedPage && addedPage.length > 0 && addedPage[0]) {
      setCache({ ...cache, [addedPage[0].page_number]: addedPage });
    }
  }, [addedPage]);
}