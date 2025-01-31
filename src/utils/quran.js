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
  try {
    const response = await axios.get(`${BASE_URL}/verses/by_page/${page}?words=true`);
    return response.data.verses;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
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
  totalPagesToFetch = 4,
  maxPage = 604,
  setQuranHeaderChapter,
  setQuranHeaderVerse
) => {
  try {
    const currentPageData = await verseByPage(currentPage);    
    const currentChapter = currentPageData[0]?.verse_key.split(":")[0];
    const currentChapterToPass = await getChapter(currentChapter);
    
    // Pass chapter to store
    setQuranHeaderChapter(currentChapterToPass);

    const pagesToCheck = Array.from(
      { length: totalPagesToFetch * 2 + 1 },
      (_, i) => currentPage - totalPagesToFetch + i
    ).filter((page) => page > 0 && page <= maxPage); 

    const isSameChapter = async (page) => {
      const pageData = await verseByPage(page);
      return pageData.every((verse) => verse.verse_key.split(":")[0] === currentChapter);
    };

    const validPages = [];
    for (const page of pagesToCheck) {
      if (page === currentPage || (await isSameChapter(page))) {
        validPages.push(page);
      } else if (page > currentPage) {
        break;
      }
    }

    const requests = validPages.map((page) => verseByPage(page));
    const allData = await Promise.all(requests);

    // Create an object with page numbers as keys and corresponding verses as values
    const result = validPages.reduce((acc, page, index) => {
      acc[page] = allData[index]; 
      return acc;
    }, {});

    // Set Quran header verse (first verse ID from the first valid page)
    if (validPages.length > 0 && allData[0].length > 0) {
      const firstVerseNumber = allData[0][0].verse_number;
      setQuranHeaderVerse(firstVerseNumber);
    }

    return result;
  } catch (error) {
    console.error("Error fetching pages within chapter:", error.message);
    return {};
  }
};

