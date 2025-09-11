"use client";
import useGroupStore from "../../../../stores/groupStore";
import KhatmasContent from "../../../../components/khatmas/khatma_content/KhatmasContent";
import useKhatmaStore from "../../../../stores/khatmasStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";

const Page = () => {
  const { khatmaId } = useParams();
  const {
    khatmaMembership,
    khatmaDetails,
    fetchKhatmaDetails,
    fetchKhatmaMembership,
  } = useKhatmaStore();

  const { quranChapters, fetchQuranChapters } = useQuranHeaderChapter();
  const { group, fetchOneGroup } = useGroupStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const [details] = await Promise.all([
          fetchKhatmaDetails(khatmaId),
          fetchKhatmaMembership(khatmaId),
          fetchQuranChapters(),
        ]);

        if (details?.group_data?.id) {
          console.log(
            "Fetching group data for group ID:",
            details.group_data.id
          );
          await fetchOneGroup(details.group_data.id);
        } else {
          console.log("No group data found in khatmaDetails");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response.status);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [khatmaId]);

  if (error === 403) {
    return (
      <div className="text-[var(--r-color)] text-lg pt-4 text-center mx-auto my-auto w-fit">
        Sorry you're not part of the group so you can't see the khatma details
      </div>
    );
  }
  const isDataReady =
    !isLoading &&
    khatmaDetails &&
    khatmaMembership &&
    quranChapters &&
    (!khatmaDetails.group_data?.id || (khatmaDetails.group_data?.id && group));

  return (
    <div className="flex flex-col h-full w-full">
      {!isDataReady ? (
        <div className="text-[var(--lighter-color)] text-lg pt-4 text-center mx-auto w-fit">
          Loading your khatma details...
        </div>
      ) : (
        <KhatmasContent />
      )}
    </div>
  );
};

export default Page;
