import axios from "axios";

const BASE_URL = "https://api.quran.com/api/v4";

export const listChapters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters`);
    return response.data.chapters;
  } catch (error) {
    console.error("Error fetching Surahs:", error);
    throw error;
  }
};

export const getChapter = async (chapterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}`);
    return response.data.chapter;
  } catch (error) {
    console.error("Error fetching Surahs:", error);
    throw error;
  }
};

export const getChapterInfo = async (chapterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}/info`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Surahs:", error);
    throw error;
  }
};

export const verseByChapter = async (
  chapterId,
  firstVerse = null,
  lastVerse = null
) => {
  try {
    let allVerses = {};
    let chapterInfo = await getChapter(chapterId);
    console.log(chapterInfo);

    let firstPage = chapterInfo.pages[0];
    let lastPage = chapterInfo.pages[1];

    if (firstVerse) {
      const firstVerseKey = [chapterId, firstVerse].join(":");
      const firstVerseData = await verseByKey(firstVerseKey);
      firstPage = firstVerseData.page_number;
    }

    if (lastVerse) {
      const lastVerseKey = [chapterId, lastVerse].join(":");
      const lastVerseData = await verseByKey(lastVerseKey);
      lastPage = lastVerseData.page_number;
    }

    let pagesFetched = 0;
    const maxPagesPerFetch = 5;

    for (let currentPage = firstPage; currentPage <= lastPage; currentPage++) {
      if (pagesFetched >= maxPagesPerFetch) break;

      const response = await verseByPageAndChapter(currentPage, chapterId);

      if (response.length === 0) break;

      allVerses[currentPage] = response;
      pagesFetched++;
    }

    return allVerses;
  } catch (error) {
    console.error("Error fetching verses:", error);
    throw error;
  }
};

export const verseByPage = async (page, chapterId = null, lastVerse = null) => {
  if (page >= 1 && page <= 604) {
    try {
      let lastPage = null;

      if (lastVerse) {
        const lastVerseKey = [chapterId, lastVerse].join(":");
        const lastVerseData = await verseByKey(lastVerseKey);
        lastPage = lastVerseData.page_number;
      }
      if (lastPage && lastPage < page) {
        return [];
      }
      
      const response = await axios.get(
        `${BASE_URL}/verses/by_page/${page}?words=true`
      );

      let verses = response.data.verses;

      if (chapterId) {
        verses = verses.filter(
          (verse) => verse.verse_key.split(":")[0] == chapterId
        );
      }

      return verses;
    } catch (error) {
      console.error("Error fetching translations:", error);
      throw error;
    }
  }
};

export const verseByKey = async (key) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/verses/by_key/${key}?words=true`
    );
    return response.data.verse;
  } catch (error) {
    console.error("Error fetching verses by key:", error);
    throw error;
  }
};

export const verseByPageAndChapter = async (
  page,
  chapterId,
  lastVerse = null
) => {
  return await verseByPage(page, chapterId, lastVerse);
};

export const randomVerse = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/random/?words=true`);
    return response.data.verses;
  } catch (error) {
    console.error("Error fetching translations:", error);
    throw error;
  }
};

export const fetchPagesWithinChapter = async (
  currentPage,
  cache,
  setCache,
  setQuranHeaderChapter,
  setQuranHeaderVerse,
  maxPage = 604
) => {
  try {
    const totalPagesToFetch = 4; // Fetch only 4 pages after

    // Ensure the current page is cached first
    if (!cache[currentPage]) {
      const currentPageData = await verseByPage(currentPage);
      const currentChapter = currentPageData[0]?.verse_key.split(":")[0];
      const currentChapterToPass = await getChapter(currentChapter);
      setQuranHeaderChapter(currentChapterToPass);

      cache[currentPage] = currentPageData;
    }

    const currentChapter = cache[currentPage][0]?.verse_key.split(":")[0];

    // Fetch 4 pages after the current page
    const pagesToFetch = Array.from(
      { length: totalPagesToFetch },
      (_, i) => currentPage + i + 1
    ).filter((page) => page > 0 && page <= maxPage && !cache[page]);

    const isSameChapter = async (page) => {
      if (cache[page]) return true; // If already cached, no need to fetch
      const pageData = await verseByPage(page);
      return pageData.every(
        (verse) => verse.verse_key.split(":")[0] === currentChapter
      );
    };

    const validPages = [];
    for (const page of pagesToFetch) {
      if (await isSameChapter(page)) {
        validPages.push(page);
      } else {
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
