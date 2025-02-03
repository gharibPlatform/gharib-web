import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export const audioByVerse = async (recitationId, ayahKey) => {
    try {
      const response = await axios.get(`${BASE_URL}/recitations/${recitationId}/by_ayah/${ayahKey}`);
      return response.data.audio_files[0].url;
    } catch (error) {
      console.error('Error fetching translations:', error);
      throw error;
    }
  };