"use client";
import useGroupStore from "../../../../stores/groupStore";
import KhatmasContent from "../../../../components/khatmas/khatma_content/KhatmasContent";
import useKhatmaStore from "../../../../stores/khatmasStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import useUserStore from "../../../../stores/userStore";
import { useCalculateTimeLeft } from "../../../../hooks/logic/calculateTimeLeft";
import Circle from "../../../../components/common/circle/Circle";
import indexToStringSurah from "../../../../../indexToStringSurah.json";

const JoinKhatma = ({ khatmaDetails, membersInKhatma }) => {
  const timeLeft = useCalculateTimeLeft(khatmaDetails?.endDate);
  const orangeDegree = (khatmaDetails?.progress * 360) / 100;

  // const handleJoinKhatma = async () => {
  //   try {
  //     await joinKhatma(khatmaDetails.id);
  //   } catch (error) {
  //     console.error("Error joining khatma:", error);
  //   }
  // };

  const handleClickVerse = (surah, verse) => {
    const verseKey = surah + ":" + verse;
    router.push(`/quran/chapters/${surah}?verse=${verseKey}`);
  };

  return (
    <div className="flex flex-col p-4 h-full w-full gap-4 overflow-hidden bg-[var(--secondary-color)]">
      <div className="bg-[var(--main-color)] rounded-lg text-white p-4">
        <h1 className="text-2xl font-bold text-center">{khatmaDetails.name}</h1>
        <p className="text-center text-gray-300 mt-2">
          Join this khatma to start tracking your progress
        </p>
      </div>

      <div className="flex h-full w-full gap-4">
        {/* Left Column - Group Info */}
        <div className="flex flex-col w-2/3 gap-4">
          {/* Group Progress Card */}
          <div className="bg-[var(--main-color)] rounded-lg text-white p-6 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-4">Group Progress</h2>
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <Circle
                width={180}
                height={180}
                orangeDegree={orangeDegree}
                blueDegree={0}
                fontSize={24}
                groupProgress={khatmaDetails?.progress || 0}
                personalProgress={0}
                backgroundColor={"var(--main-color)"}
              />

              <div className="text-center">
                <div className="text-xs text-gray-400">Time left</div>
                <div className="text-lg font-bold text-white">{timeLeft}</div>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <div className="bg-[var(--o-color)] w-3 h-3 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Group Progress</span>
                </div>
              </div>
            </div>

            <div className="mt-auto border-t border-[var(--dark-color)] pt-4">
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Start verse:</span>
                  <button
                    onClick={() =>
                      handleClickVerse(
                        khatmaDetails.startSurah,
                        khatmaDetails.startVerse
                      )
                    }
                    className="bg-[var(--dark-color)] hover:bg-[var(--b-color)] px-2 py-1 rounded text-xs transition-colors"
                  >
                    {indexToStringSurah[khatmaDetails.startSurah].name}-
                    {khatmaDetails.startVerse}
                  </button>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">End verse:</span>
                  <button
                    onClick={() =>
                      handleClickVerse(
                        khatmaDetails.endSurah,
                        khatmaDetails.endVerse
                      )
                    }
                    className="bg-[var(--dark-color)] hover:bg-[var(--b-color)] px-2 py-1 rounded text-xs transition-colors"
                  >
                    {indexToStringSurah[khatmaDetails.endSurah].name}-
                    {khatmaDetails.endVerse}
                  </button>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Created at:</span>
                  <span className="text-white">
                    {new Date(khatmaDetails.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">End date:</span>
                  <span className="text-white">
                    {khatmaDetails.endDate
                      ? new Date(khatmaDetails.endDate).toLocaleDateString()
                      : "Not set"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Intention:</span>
                  <span className="text-white text-right max-w-[150px] truncate">
                    {khatmaDetails.intentions || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Launcher:</span>
                  <span className="text-white">
                    {khatmaDetails.launcher_data?.username || "Not specified"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3 gap-4">
          <div className="bg-[var(--main-color)] rounded-lg text-white p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Members</h2>
              <div className="bg-[var(--dark-color)] px-3 py-1 rounded-full text-xs">
                {membersInKhatma.length} users
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 mb-3 px-1 text-gray-400 text-xs">
              <span className="col-span-8 font-medium">Name</span>
              <span className="col-span-4 font-medium text-right">
                Progress
              </span>
            </div>
            <div className="overflow-y-auto flex-1 pr-1">
              {membersInKhatma
                .sort((a, b) => b.progress - a.progress)
                .map((user, index) => (
                  <div
                    key={`${user.groupMembership.userName}-${index}`}
                    className={`grid grid-cols-12 gap-3 py-2 px-2 hover:bg-[var(--dark-color)] rounded-lg transition-colors items-center cursor-pointer text-sm ${
                      index === 0 ? "bg-[var(--dark-color)]" : ""
                    }`}
                  >
                    <span className="col-span-8 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[var(--dark-color)] rounded-full flex items-center justify-center text-xs font-bold">
                        #{index + 1}
                      </div>
                      <span
                        className={`truncate ${index === 0 ? "text-[var(--o-color)]" : "text-white"}`}
                      >
                        {user.groupMembership.username}
                      </span>
                    </span>
                    <span className="col-span-4 text-right">
                      <span
                        className={`font-bold ${index === 0 ? "text-[var(--o-color)]" : "text-[var(--b-color)]"}`}
                      >
                        {user.progress}%
                      </span>
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-[var(--main-color)] rounded-lg text-white p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to join?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Join this khatma and get your share of verses to complete
              </p>
              <button
                // onClick={handleJoinKhatma}
                className="w-full bg-[var(--o-color)] hover:bg-[var(--o-color-hover)] text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Join Khatma
              </button>
              <p className="text-xs text-gray-400 mt-2">
                You'll be assigned a portion of verses to complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const { khatmaId } = useParams();
  const {
    khatmaMembership,
    khatmaDetails,
    membersInKhatma,
    fetchKhatmaDetails,
    fetchKhatmaMembership,
    fetchMembersInKhatma,
  } = useKhatmaStore();

  const { user } = useUserStore();

  const { quranChapters, fetchQuranChapters } = useQuranHeaderChapter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const [details] = await Promise.all([
          fetchKhatmaDetails(khatmaId),
          fetchMembersInKhatma(khatmaId),
          fetchQuranChapters(),
        ]);

        const members = useKhatmaStore.getState().membersInKhatma;
        console.log("members is : ", members);
        console.log("user.username is : ", user.username);

        let isMember = members?.find(
          (member) => member.groupMembership.username === user.username
        );
        if (isMember) {
          await fetchKhatmaMembership(khatmaId);
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
    !isLoading && khatmaDetails && membersInKhatma && quranChapters;

  useEffect(() => {
    console.log("isLoading is : ", isLoading);
    console.log("khatmaDetails is : ", khatmaDetails);
    console.log("khatmaMembership is : ", khatmaMembership);
    console.log("membersInKhatma is : ", membersInKhatma);
    console.log("quranChapters is : ", quranChapters);
  }, [
    khatmaMembership,
    isLoading,
    khatmaDetails,
    membersInKhatma,
    quranChapters,
  ]);

  return (
    <div className="flex flex-col h-full w-full">
      {!isDataReady ? (
        <div className="text-[var(--lighter-color)] text-lg pt-4 text-center mx-auto w-fit">
          Loading your khatma details...
        </div>
      ) : isMember ? (
        <KhatmasContent />
      ) : (
        <>
          <div>
            <JoinKhatma
              khatmaDetails={khatmaDetails}
              membersInKhatma={membersInKhatma}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
