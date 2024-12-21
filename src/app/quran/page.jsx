'use client'
import { fetchSurah, fetchSurahs } from "@/utils/quran";
import QuranContent from "@/components/common/quran/QuranContent";

const Page = () => {
  console.log(fetchSurah(114));
  return (
    <div>
        <QuranContent />
    </div>
  );
};

export default Page;
