import { useState, useEffect } from "react";
import QuranPage from "./QuranPage";

export default function QuranSurah({
  cache,
  setClickBoxBool,
  setBoxPosition,
  setVerseKey,
  currentKhatma,
  currentReadVerse,
  isLoading = false,
  totalPages,
}) {
  const [versesState, setVersesState] = useState({
    alreadyRead: new Set(),
    notYetRead: new Set(),
    notInKhatma: new Set(),
  });

  useEffect(() => {
    if (currentKhatma && !isLoading) {
      const alreadyReadKeys = new Set();
      const notYetReadKeys = new Set();
      const notInKhatmaKeys = new Set();

      Object.values(cache)
        .flatMap((page) => page.data)
        .forEach((verse) => {
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
  }, [currentKhatma, cache, isLoading]);

  useEffect(() => {
    console.log("cache is : ", cache);
  }, [cache]);

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      {Object.entries(cache).map(([pageNumber, { data, isLoaded }]) =>
        !isLoaded ? (
          <QuranPage
            key={`skeleton-${pageNumber}`}
            verses={[]}
            pageNumber={pageNumber}
            setClickBoxBool={setClickBoxBool}
            setBoxPosition={setBoxPosition}
            setVerseKey={setVerseKey}
            versesState={versesState}
            currentReadVerse={currentReadVerse}
            isLoaded={false}
            totalPages={totalPages}
          />
        ) : (
          <QuranPage
            key={pageNumber}
            verses={data}
            pageNumber={pageNumber}
            setClickBoxBool={setClickBoxBool}
            setBoxPosition={setBoxPosition}
            setVerseKey={setVerseKey}
            versesState={versesState}
            currentReadVerse={currentReadVerse}
            isLoaded={isLoaded}
            totalPages={totalPages}
          />
        )
      )}
    </div>
  );
}
