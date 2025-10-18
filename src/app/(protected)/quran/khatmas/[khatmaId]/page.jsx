"use client";
import QuranContent from "../../../../../components/common/quran/quranContent/QuranContent";
import { useParams } from "next/navigation";
import useKhatmaStore from "../../../../../stores/khatmasStore";
import useQuranHeaderChapter from "../../../../../stores/chapterQuranHeaderStore";
import { useState, useEffect } from "react";
import { getChapter } from "../../../../../utils/quran/quran";
import useShouldFetch from "../../../../../stores/shouldFetchStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const { khatmaId } = useParams();
  const {
    khatmaMembership,
    khatmaDetails,
    fetchKhatmaMembership,
    fetchKhatmaDetails,
    setCurrentKhatma,
  } = useKhatmaStore();

  const { quranHeaderChapter, setQuranHeaderChapter } = useQuranHeaderChapter();
  const { setShouldFetch } = useShouldFetch();
  const [isLoadingKhatmaDetails, setIsLoadingKhatmaDetails] = useState(true);

  useEffect(() => {
    fetchKhatmaMembership(khatmaId);
    fetchKhatmaDetails(khatmaId);
  }, [khatmaId]);

  useEffect(() => {
    if (khatmaMembership && khatmaDetails) {
      setIsLoadingKhatmaDetails(false);
    }
  }, [khatmaMembership]);

  useEffect(() => {
    if (!isLoadingKhatmaDetails) {
      const currentSurah = khatmaMembership.currentSurah;

      if (currentSurah >= 1 && currentSurah <= 114) {
        getChapter(currentSurah).then((resp) => {
          setQuranHeaderChapter(resp);
          setShouldFetch("chapter");
          setCurrentKhatma(khatmaMembership);
        });
      }
    }
  }, [isLoadingKhatmaDetails]);

  const { userKhatmas, fetchUserKhatmas } = useKhatmaStore();
  const [isLoadingUserKhatmas, setIsLoadingUserKhatmas] = useState(true);

  useEffect(() => {
    const fetchKhatmas = async () => {
      try {
        await fetchUserKhatmas();
        setIsLoadingUserKhatmas(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKhatmas();
  }, []);

  useEffect(() => {
    if (userKhatmas) {
      console.log("userKhatmas : ", userKhatmas);
      setIsLoadingUserKhatmas(false);
    }
  }, [userKhatmas]);

  const isValid =
    khatmaMembership &&
    khatmaMembership.status == "ongoing" &&
    khatmaMembership.progress != 100;

  useEffect(() => {
    if (!isValid && !isLoadingKhatmaDetails && khatmaMembership) {
      router.push("/quran");
    }
  }, [isValid, isLoadingKhatmaDetails, khatmaMembership]);

  return (
    <div>
      <QuranContent
        isKhatmaMode={true}
        isLoadingKhatmaDetails={isLoadingKhatmaDetails}
        userKhatmas={userKhatmas}
      />
    </div>
  );
};

export default Page;
