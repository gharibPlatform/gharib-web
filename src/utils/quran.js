import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export const listChapters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters`);
    return response.chapters;
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};

export const getChapter = async (chapterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}`);
    return response.data;
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

export const fetchPagesAroundCenter = async (currentPage, totalPagesToFetch = 4) => {
  // Generate page numbers: from (currentPage - 4) to (currentPage + 4)
  const pages = Array.from(
    { length: totalPagesToFetch * 2 + 1 },
    (_, i) => currentPage - totalPagesToFetch + i
  );

  const requests = pages.map((page) => verseByPage(page)); 

  try {
    const allData = await Promise.all(requests); 
    return pages.reduce((result, page, index) => {
      result[page] = allData[index]; 
      return result;
    }, {});
  } catch (error) {
    console.error("Error fetching pages around center:", error.message);
    return {};
  }
};