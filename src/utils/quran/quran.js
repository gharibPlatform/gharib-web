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

export async function verseByPageAndChapterRange(page, chapterId) {
  const pagesToFetch = [];

  console.log("page is : ", page);
  for (let i = page - 2; i <= page + 2; i++) {
    if (i > 0) pagesToFetch.push(i);
  }

  const results = await Promise.all(
    pagesToFetch.map((p) => verseByPageAndChapter(p, chapterId))
  );

  return results.flat();
}

export const verseByChapterRange = async (
  chapter,
  pageToFetch,
  firstVerseKey = null,
  lastVerseKey = null
) => {
  try {
    let allVerses = {};
    let chapterInfo = chapter;

    let firstPage = chapterInfo.pages[0];
    let lastPage = chapterInfo.pages[1];
    let page = pageToFetch || firstPage;

    if (firstVerseKey) {
      const firstVerseData = await verseByKey(firstVerseKey);
      firstPage = firstVerseData.page_number;
    }

    if (lastVerseKey) {
      const lastVerseData = await verseByKey(lastVerseKey);
      lastPage = lastVerseData.page_number;
    }

    const pagesToFetch = [];
    for (let i = page - 2; i <= page + 2; i++) {
      if (i >= firstPage && i <= lastPage) {
        pagesToFetch.push(i);
      }
    }

    const LAST_PAGE = lastPage
      ? lastPage <= chapter.pages[1]
        ? lastPage
        : chapter.pages[1]
      : chapter.pages[1];

    for (let loadingData = firstPage; loadingData <= LAST_PAGE; loadingData++) {
      allVerses[loadingData] = {
        data: [],
        isLoaded: false,
        lastPage: loadingData == chapter.pages[1],
      };
    }

    for (let p of pagesToFetch) {
      const response = await verseByPageAndChapter(p, chapter.id);
      if (response && response.length > 0) {
        allVerses[p] = {
          data: response,
          isLoaded: true,
          lastPage: p == chapter.pages[1],
        };
      }
    }

    console.log("allVerses is : ", allVerses);

    return allVerses;
  } catch (error) {
    console.error("Error fetching verses in range:", error);
    throw error;
  }
};

export const verseByChapterRangeScroll = async (chapter, pagesToFetch) => {
  try {
    const allVerses = {};
    const firstPage = chapter.pages[0];
    const lastPage = chapter.pages[1];

    console.log("pagesToFetch is : ", pagesToFetch);

    for (let p of pagesToFetch) {
      if (!(p >= firstPage && p <= lastPage)) continue;

      const response = await verseByPageAndChapter(p, chapter.id);
      if (response && response.length > 0) {
        allVerses[p] = {
          data: response,
          isLoaded: true,
        };
      }
    }

    return allVerses;
  } catch (error) {
    console.error("Error fetching verses in range:", error);
    throw error;
  }
};

export const verseByPage = async (
  page,
  chapterId = null,
  lastVerse = null,
  lastSurah = null
) => {
  if (page >= 1 && page <= 604) {
    try {
      let lastPage = null;

      console.log("fetching page : ", page);
      if (lastVerse && lastSurah) {
        const lastSurahKey = [lastSurah, lastVerse].join(":");
        const lastSurahData = await verseByKey(lastSurahKey);
        lastPage = lastSurahData.page_number;
      }

      if (lastPage && lastPage < page) {
        return [];
      }

      const response = await axios.get(
        `${BASE_URL}/verses/by_page/${page}?words=true&word_fields=verse_id,verse_key,location`
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
      `${BASE_URL}/verses/by_key/${key}?words=true&word_fields=verse_id&translations=20,verse_key,location`
    );
    return response.data.verse;
  } catch (error) {
    console.error("Error fetching verses by key:", error);
    throw error;
  }
};

export const tafsirByKey = async (key) => {
  try {
    const response = await axios.get(`${BASE_URL}/tafsirs/169/by_ayah/${key}`);
    return response.data.tafsir;
  } catch (error) {
    console.error("Error fetching tafsirs by key:", error);
    throw error;
  }
};

export const verseByPageAndChapter = async (
  page,
  chapterId,
  lastVerse = null,
  lastSurah = null
) => {
  return await verseByPage(page, chapterId, lastVerse, lastSurah);
};

export const randomVerse = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/random/?words=true`);
    return response.data.verse;
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
