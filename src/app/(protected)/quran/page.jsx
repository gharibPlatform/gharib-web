"use client";
import { useState, useEffect } from "react";
import QuranOverview from "../../../components/quran/quranOverview/QuranOverview";
import indexToStringSurah from "../../../../indexToStringSurah.json";
import { verseByKey } from "../../../utils/quran/quran";
import SideBar from "../../../components/common/sidebar/Sidebar";
import useQuranHeaderChapter from "../../../stores/quran/chapterQuranHeaderStore";

const Page = () => {
  const [verse, setVerse] = useState(null);
  const [surahName, setSurahName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { quranChapters, fetchQuranChapters } = useQuranHeaderChapter();

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
    if (!quranChapters) {
      try {
        console.log("fetching quranChapters");
        fetchQuranChapters();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchChapters();
    fetchRandomVerse();
  }, []);

  useEffect(() => {
    if (verse && quranChapters) {
      setIsLoading(false);
    }
  }, [verse, quranChapters]);

  return (
    <div className="flex w-screen h-screen">
      <SideBar />

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full text-[var(--g-color)]">
            Loading Verse...
          </div>
        ) : (
          <QuranOverview
            chapters={quranChapters}
            randomVerse={verse}
            surahName={surahName}
          />
        )}
      </div>
    </div>
  );
};
export default Page;
