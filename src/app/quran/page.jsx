'use client'
import { fetchSurah } from "@/utils/quran";
import QuranContent from "@/components/common/quran/QuranContent";

const Page = () => {
      fetchSurah(114)
      .then(response => {
          console.log('the surah is :', response);
      })
      .catch(error => {
          console.error('error fetching :', error);
      });

  return (
    <div>
        <QuranContent />
    </div>
  );
};

export default Page;
