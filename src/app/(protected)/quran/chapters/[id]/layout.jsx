"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getChapter, verseByKey } from "../../../../../utils/quran/quran";

import useQuranHeaderChapter from "../../../../../stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "../../../../../stores/verseQuranHeaderStore";
import useShouldFetch from "../../../../../stores/shouldFetchStore";
import useKhatmaStore from "../../../../../stores/khatmasStore";

const Layout = ({ children }) => {
  const { id, verseId } = useParams();

  const setQuranHeaderChapter = useQuranHeaderChapter(
    (state) => state.setQuranHeaderChapter
  );
  const { pageToFetch, setPageToFetch } = useQuranHeaderChapter();
  const { setGoToVerse } = useQuranHeaderVerse();
  const setShouldFetch = useShouldFetch((state) => state.setShouldFetch);
  const { fetchUserKhatmas } = useKhatmaStore();

  useEffect(() => {
    fetchUserKhatmas();
  }, [fetchUserKhatmas]);

  useEffect(() => {
    if (id >= 1 && id <= 114) {
      setShouldFetch("chapter");
      getChapter(id).then((resp) => {
        setQuranHeaderChapter(resp);
      });
    }
  }, [id, setShouldFetch, setQuranHeaderChapter]);

  useEffect(() => {
    if (verseId && id >= 1 && id <= 114) {
      console.log("going to verse : ", verseId);
      setGoToVerse(`${id}:${verseId}`);
    }
  }, [id, verseId, setGoToVerse]);

  useEffect(() => {
    if (verseId > 1 && id >= 1 && id <= 114) {
      const fetchVerseData = async () => {
        const verse = await verseByKey(`${id}:${verseId}`);
        setPageToFetch(verse.page_number);
        setGoToVerse(`${id}:${verseId}`);
      };

      console.log("verseId is : ", verseId);
      fetchVerseData();
    }
  }, [id, verseId, setGoToVerse]);

  return <>{children}</>;
};

export default Layout;
