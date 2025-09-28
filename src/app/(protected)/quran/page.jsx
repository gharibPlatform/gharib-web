"use client";
import { useState, useEffect, use } from "react";
import QuranOverview from "../../../components/quran/quranOverview/QuranOverview";
import indexToStringSurah from "../../../../indexToStringSurah.json";
import { verseByKey } from "../../../utils/quran/quran";
import { listChapters } from "../../../utils/quran/quran";

const Page = () => {
  const [verse, setVerse] = useState(null);
  const [surahName, setSurahName] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomVerse = () => {
    const surahIds = Object.keys(indexToStringSurah);
    const randomSurahId = surahIds[Math.floor(Math.random() * surahIds.length)];
    const totalVerses = indexToStringSurah[randomSurahId].verses;
    const randomVerseNumber = Math.floor(Math.random() * totalVerses) + 1;
    const surahName = indexToStringSurah[randomSurahId].name;

    const verseKey = `${randomSurahId}:${randomVerseNumber}`;
    return [verseKey, surahName];
  };

  const fetchRandomVerse = async () => {
    try {
      const [randomVerseKey, surahName] = getRandomVerse();
      console.log("randomVerseKey", randomVerseKey);
      console.log("surahName", surahName);
      const randomVerseData = await verseByKey(randomVerseKey);
      setVerse(randomVerseData);
      setSurahName(surahName);
      console.log("randomVerseKey", randomVerseKey);
      console.log("randomVerseData", randomVerseData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChapters = async () => {
    try {
      const chapters = await listChapters();
      setChapters(chapters);
      console.log("chapters", chapters);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    fetchRandomVerse();
  }, []);

  useEffect(() => {
    if (verse && chapters) {
      setIsLoading(false);
    }
  }, [verse, chapters]);

  return (
    <div className="overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center pt-8 text-[var(--g-color)]">
          Loading Verse...
        </div>
      ) : (
        <QuranOverview chapters={chapters} randomVerse={verse} surahName={surahName} />
      )}
    </div>
  );
};
export default Page;
