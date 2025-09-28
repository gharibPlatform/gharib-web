import { useState, useEffect } from "react";
import QuranPage from "./QuranPage";

export default function QuranSurah({
  cache,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
  currentKhatma,
  currentReadVerse
}) {
  const [versesState, setVersesState] = useState({
    alreadyRead: new Set(),
    notYetRead: new Set(),
    notInKhatma: new Set(),
  });

  useEffect(() => {
    if (currentKhatma) {
      const alreadyReadKeys = new Set();
      const notYetReadKeys = new Set();
      const notInKhatmaKeys = new Set();

      Object.values(cache).flat().forEach((verse) => {
        const [surah, ayah] = verse.verse_key.split(":").map(Number);

        if (
          surah > currentKhatma.endShareSurah ||
          (surah === currentKhatma.endShareSurah &&
            ayah > currentKhatma.endShareVerse) ||
          surah < currentKhatma.startShareSurah ||
          (surah === currentKhatma.startShareSurah &&
            ayah < currentKhatma.startShareVerse)
        ) {
          notInKhatmaKeys.add(verse.verse_key);
        } else if (
          surah < currentKhatma.currentSurah ||
          (surah === currentKhatma.currentSurah &&
            ayah < currentKhatma.currentVerse)
        ) {
          alreadyReadKeys.add(verse.verse_key);
        } else {
          notYetReadKeys.add(verse.verse_key);
        }
      });

      setVersesState({
        notInKhatma: notInKhatmaKeys,
        alreadyRead: alreadyReadKeys,
        notYetRead: notYetReadKeys,
      });
    }
  }, [currentKhatma, cache]);

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      {Object.entries(cache).map(([pageNumber, verses]) => (
        <QuranPage
          key={pageNumber}
          verses={verses}
          pageNumber={pageNumber}
          setClickBoxBool={setClickBoxBool}
          setBoxPosition={setBoxPosition}
          setVerseKey={setVerseKey}
          versesState={versesState}
          currentReadVerse={currentReadVerse}
        />
      ))}
    </div>
  );
}
