import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export const listChapters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters`);
    return response.data.chapters
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};

export const getChapter = async (chapterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}`);
    return response.data.chapter;
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};

export const getChapterInfo = async (chapterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}/info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};

export const verseByChapter = async (chapterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/by_chapter/${chapterId}?words=true`);
    return response.data.verses;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};

export const verseByPage = async (page) => {
  if(page >= 1 && page <=604){
    try {
      const response = await axios.get(`${BASE_URL}/verses/by_page/${page}?words=true`);
      return response.data.verses;
    } catch (error) {
      console.error('Error fetching translations:', error);
      throw error;
    }
  }
    
};

export const randomVerse = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/random/?words=true`);
    return response.data.verses;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};

export const fetchPagesWithinChapter = async (
  currentPage,
  cache,
  setCache,
  setQuranHeaderChapter,
  setQuranHeaderVerse,
  maxPage = 604,
  fetchOnlyOneChapter = false // New argument to fetch only one chapter
) => {
  try {
    const totalPagesToFetch = 2; // Default fetch: 2 before, 2 after, + current page
    
    // Ensure the current page is cached first
    if (!cache[currentPage]) {
      const currentPageData = await verseByPage(currentPage);
      const currentChapter = currentPageData[0]?.verse_key.split(":")[0];
      const currentChapterToPass = await getChapter(currentChapter);
      setQuranHeaderChapter(currentChapterToPass);

      cache[currentPage] = currentPageData;
    }

    const currentChapter = cache[currentPage][0]?.verse_key.split(":")[0];

    // Check if this is the first page of the chapter
    const firstPageInChapter = async () => {
      const firstVerse = cache[currentPage]?.[0] || (await verseByPage(currentPage))[0];
      return firstVerse.verse_number === 1;
    };

    let pagesToFetch;
    if (fetchOnlyOneChapter) {
      // If fetching only one chapter, fetch all pages within the current chapter
      pagesToFetch = [];
      let page = currentPage;
      while (page > 0 && page <= maxPage) {
        const pageData = await verseByPage(page);
        if (pageData[0]?.verse_key.split(":")[0] === currentChapter) {
          pagesToFetch.push(page);
          page++;
        } else {
          break;
        }
      }
    } else if (await firstPageInChapter()) {
      // If it's the first page of the chapter, fetch 4 pages after
      pagesToFetch = Array.from(
        { length: 5 },
        (_, i) => currentPage + i
      ).filter((page) => page > 0 && page <= maxPage && !cache[page]);
    } else {
      // Normal behavior: fetch 2 before and 2 after
      pagesToFetch = Array.from(
        { length: totalPagesToFetch * 2 + 1 },
        (_, i) => currentPage - totalPagesToFetch + i
      ).filter((page) => page > 0 && page <= maxPage && !cache[page]);
    }

    const isSameChapter = async (page) => {
      if (cache[page]) return true; // If already cached, no need to fetch
      const pageData = await verseByPage(page);
      return pageData.every((verse) => verse.verse_key.split(":")[0] === currentChapter);
    };

    const validPages = [];
    for (const page of pagesToFetch) {
      if (await isSameChapter(page)) {
        validPages.push(page);
      } else if (page > currentPage) {
        break;
      }
    }

    // Fetch only the missing pages
    const requests = validPages.map((page) => verseByPage(page));
    const allData = await Promise.all(requests);

    // Update cache with new pages
    const newCache = { ...cache };
    validPages.forEach((page, index) => {
      newCache[page] = allData[index];
    });

    // Ensure the height remains static or grows
    setCache(newCache);

    if (cache[currentPage]?.length > 0) {
      setQuranHeaderVerse(cache[currentPage][0].verse_number);
    }

    return newCache;
  } catch (error) {
    console.error("Error fetching pages within chapter:", error.message);
    return cache;
  }
};