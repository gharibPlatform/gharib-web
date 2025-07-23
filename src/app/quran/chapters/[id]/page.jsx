"use client";
import QuranContent from "../../../../components/common/quran/quran content/QuranContent";
import { useParams } from "next/navigation";
import { getChapter } from "../../../../utils/quran/quran";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import { useEffect } from "react";
import useShouldFetch from "../../../../stores/shouldFetch";

const Page = () => {
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
      <QuranContent />
    </div>
  );
};

export default Page;
