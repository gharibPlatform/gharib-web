"use client";
import QuranContent from "../../../../../components/quran/quranContent/QuranContent";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useShouldFetch from "../../../../../stores/quran/shouldFetchStore";
import useQuranHeaderPage from "../../../../../stores/quran/pageQuranHeaderStore";
import useKhatmaStore from "../../../../../stores/khatamat/khatmasStore";

const Page = () => {
  const { page } = useParams();
  const setShouldFetch = useShouldFetch((state) => state.setShouldFetch);
  const setQuranHeaderPage = useQuranHeaderPage(
    (state) => state.setQuranHeaderPage
  );

  useEffect(() => {
    if (page >= 1 && page <= 604) {
      setShouldFetch("page");
      setQuranHeaderPage(page);
    }
  }, [page]);

  return (
    <div>
      <QuranContent />
    </div>
  );
};

export default Page;
