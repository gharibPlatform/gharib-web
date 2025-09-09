"use client";
import QuranContent from "../../../../components/common/quran/quranContent/QuranContent";
import { useParams } from "next/navigation";
import useKhatmaStore from "../../../../stores/khatmasStore";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import { useState, useEffect } from "react";

const Page = () => {
  const { khatmaId } = useParams();
  const { khatmaMembership, fetchKhatmaMembership } = useKhatmaStore();
  const { setQuranHeaderChapter } = useQuranHeaderChapter();
  const [isLoadingKhatmaDetails, setIsLoadingKhatmaDetails] = useState(true);

  useEffect(() => {
    fetchKhatmaMembership(khatmaId);
  }, []);

  useEffect(() => {
    if (khatmaMembership) {
      setIsLoadingKhatmaDetails(false);
    }
  }, [khatmaMembership]);

  useEffect(() => {
    if (!isLoadingKhatmaDetails) {
      const currentSurah = khatmaMembership.currentSurah;
      if (currentSurah >= 1 && currentSurah <= 114) {
        getChapter(currentSurah).then((resp) => {
          setQuranHeaderChapter(resp);
        });
      }
    }
  }, [isLoadingKhatmaDetails]);

  return (
    <div>
      <QuranContent
        isKhatmaMode={true}
        isLoadingKhatmaDetails={isLoadingKhatmaDetails}
      />
    </div>
  );
};

export default Page;
