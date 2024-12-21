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

export const getChapter = async (surahId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};

export const getChapterInfo = async (surahId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${surahId}/info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};

export const verseByChapter = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/by_chapter/${chapterId}?words=true`);
    return response.data.verses;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};

export const verseByPage = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/by_page/${chapterId}?words=true`);
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

