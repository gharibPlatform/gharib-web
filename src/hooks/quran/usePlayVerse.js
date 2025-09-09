import { useCallback } from "react";
import { audioByVerse } from "../../utils/quran/quranAudio";

export function usePlayVerse(setClickBoxBool, verseKey) {
  return useCallback(() => {
    setClickBoxBool(false);
    audioByVerse(1, verseKey).then((resp) => {
      console.log(resp);
    });
  }, [verseKey, setClickBoxBool]);
}