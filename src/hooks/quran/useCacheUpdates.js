import { useEffect } from "react";

export function useCacheUpdates(cache, addedPage, setCache) {
  useEffect(() => {
    console.log("Added page:", addedPage);
    if (addedPage && addedPage.length > 0) {
      const page_number = addedPage[0].page_number;
      console.log("Updating cache with page:", page_number, addedPage);

      setCache((prevCache) => {
        console.log("Prev cache:", prevCache);
        return {
          ...prevCache,
          [page_number]: {
            data: addedPage,
            isLoaded: true,
          },
        };
      });
    }
  }, [addedPage, setCache]);
}
