"use client";
import { useState, useEffect, use } from "react";
import QuranOverview from "../../../components/quran/quranOverview/QuranOverview";
import indexToStringSurah from "../../../../indexToStringSurah.json";
import { verseByKey } from "../../../utils/quran/quran";

const Page = () => {
  const [verse, setVerse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomVerse = () => {
    const surahIds = Object.keys(indexToStringSurah);
    const randomSurahId = surahIds[Math.floor(Math.random() * surahIds.length)];
    const totalVerses = indexToStringSurah[randomSurahId].verses;
    const randomVerseNumber = Math.floor(Math.random() * totalVerses) + 1;

    const verseKey = `${randomSurahId}:${randomVerseNumber}`;
    return verseKey;
  };

  const fetchRandomVerse = async () => {
    try {
      const randomVerseKey = getRandomVerse();

      const randomVerseData = await verseByKey(randomVerseKey);
      setVerse(randomVerseData);
      console.log("randomVerseKey", randomVerseKey);
      console.log("randomVerseData", randomVerseData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRandomVerse();
  }, []);

  useEffect(() => {
    if (verse) {
      setIsLoading(false);
      console.log("verse", verse);
    }
  }, [verse]);

  return (
    <div className="overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading Verse...
        </div>
      ) : (
        <QuranOverview randomVerse={verse} />
      )}
    </div>
  );
};
export default Page;
