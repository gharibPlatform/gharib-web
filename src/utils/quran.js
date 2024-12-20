import axios from 'axios';

const BASE_URL = 'https://api.quran.com/v4';

export const fetchSurahs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters`);
    return response.data.chapters;
  } catch (error) {
    console.error('Error fetching Surahs:', error);
    throw error;
  }
};


export const fetchSurahDetails = async (surahId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters/${surahId}`);
    return response.data.chapter;
  } catch (error) {
    console.error(`Error fetching Surah ${surahId} details:`, error);
    throw error;
  }
};

export const fetchAyah = async (surahId, ayahNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/verses/by_key/${surahId}:${ayahNumber}`);
    return response.data.verse;
  } catch (error) {
    console.error(`Error fetching Ayah ${ayahNumber} from Surah ${surahId}:`, error);
    throw error;
  }
};

export const fetchTranslations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/translations`);
    return response.data.translations;
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};

export const fetchRecitations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/recitations`);
    return response.data.recitations;
  } catch (error) {
    console.error('Error fetching recitations:', error);
    throw error;
  }
};

export const fetchSurahAudio = async (reciterId, surahId) => {
  try {
    const response = await axios.get(`${BASE_URL}/recitations/${reciterId}/by_chapter/${surahId}`);
    return response.data.audio_files[0]?.url;
  } catch (error) {
    console.error(`Error fetching audio for Surah ${surahId} with reciter ${reciterId}:`, error);
    throw error;
  }
};
