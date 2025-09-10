"use client";
import QuranContent from "../../../../components/common/quran/quranContent/QuranContent";
import { useParams } from "next/navigation";
import { getChapter } from "../../../../utils/quran/quran";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import { useEffect, useState } from "react";
import useShouldFetch from "../../../../stores/shouldFetchStore";
import useKhatmaStore from "../../../../stores/khatmasStore";
import useQuranHighlightStore from "@/stores/quranHighlightStore";

const Page = () => {
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
      console.log(userKhatmas);
      setIsLoadingUserKhatmas(false);
    }
  }, [userKhatmas]);

  const { id } = useParams();
  const setShouldFetch = useShouldFetch((state) => state.setShouldFetch);
  const setQuranHeaderChapter = useQuranHeaderChapter(
    (state) => state.setQuranHeaderChapter
  );

  useEffect(() => {
    if (id >= 1 && id <= 114) {
      setShouldFetch("chapter");
      getChapter(id).then((resp) => {
        setQuranHeaderChapter(resp);
      });
    }
  }, [id]);

  return (
    <div>
      <QuranContent isLoadingUserKhatmas={isLoadingUserKhatmas} />
    </div>
  );
};

export default Page;
