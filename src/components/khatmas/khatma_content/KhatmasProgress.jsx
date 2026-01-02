import Circle from "../../common/circle/Circle";
import useKhatmaStore from "../../../stores/khatamat/khatmasStore";
import PersonalTrackerLine from "./PersonalTrackerLine";
import { useRouter } from "next/navigation";
import useQuranHeaderVerse from "../../../stores/quran/verseQuranHeaderStore";
import indexToStringSurah from "../../../utils/consts/indexToStringSurah.json";
import { useCalculateTimeLeft } from "../../../hooks/logic/calculateTimeLeft";
import { useAbsoluteVerseDomain } from "../../../hooks/logic/useAbsoluteVerseDomain";
import { useEffect } from "react";

export default function KhatmasProgress() {
  const { khatmaDetails, khatmaMembership, membersInKhatma } = useKhatmaStore();
  const { setGoToVerse } = useQuranHeaderVerse();

  const router = useRouter();
  const timeLeft = useCalculateTimeLeft(khatmaDetails?.endDate);
  const orangeDegree = (khatmaDetails?.progress * 360) / 100;
  const blueDegree = (khatmaMembership?.progress * 360) / 100;

  const handleClickVerse = (surah, verse) => {
    const verseKey = surah + ":" + verse;
    router.push(`/quran/chapters/${surah}`);
    setGoToVerse(verseKey);
  };

  const [currentAbsoluteVerse, goalAbsoluteVerse] = useAbsoluteVerseDomain(
    khatmaMembership?.startShareSurah,
    khatmaMembership?.startShareVerse,
    khatmaMembership?.endShareSurah,
    khatmaMembership?.endShareVerse,
    khatmaMembership?.currentSurah,
    khatmaMembership?.currentVerse
  );

  return (
    <div className="flex flex-col p-4 h-full w-full gap-4 overflow-hidden bg-[var(--secondary-color)]">
      <div className="bg-[var(--main-color)] rounded-lg text-white p-4">
        <h1 className="text-2xl font-bold text-center">{khatmaDetails.name}</h1>
      </div>

      <div className="flex h-full w-full gap-4">
        {/* Left Column - 2/3 width */}
        <div className="flex flex-col w-2/3 gap-4">
          {/* Personal Progress Card */}
          <div className="bg-[var(--main-color)] rounded-lg text-white p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Personal Progress</h2>
              <div className="bg-[var(--dark-color)] px-3 py-1 rounded-full text-xs">
                {`${khatmaMembership?.progress}%`}
              </div>
            </div>
            <div className="mb-4">
              <PersonalTrackerLine
                progress={khatmaMembership?.progress}
                currentVerse={currentAbsoluteVerse || 0}
                wantedVerse={goalAbsoluteVerse || 0}
              />
            </div>

            <div className="mb-4">
              <h3 className="text-xs text-gray-400 mb-2">Current position:</h3>
              <div className="flex justify-center mb-4">
                <button
                  onClick={() =>
                    handleClickVerse(
                      khatmaMembership.currentSurah,
                      khatmaMembership.currentVerse
                    )
                  }
                  className="bg-[var(--dark-color)] hover:bg-[var(--b-color)] px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  {/* {currentChapter.name_simple} */}
                  {
                    indexToStringSurah[khatmaMembership.currentSurah].name
                  } - {khatmaMembership.currentVerse}
                </button>
              </div>

              <h3 className="text-xs text-gray-400 mb-2">
                Your share is from:
              </h3>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() =>
                    handleClickVerse(
                      khatmaMembership.startShareSurah,
                      khatmaMembership.startShareVerse
                    )
                  }
                  className="bg-[var(--dark-color)] hover:bg-[var(--b-color)] px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-1"
                >
                  <span className="text-[10px] text-gray-400">Start</span>
                  {indexToStringSurah[khatmaMembership.startShareSurah].name}-
                  {khatmaMembership.startShareVerse}
                </button>

                <div className="text-gray-400 text-sm">→</div>

                <button
                  onClick={() =>
                    handleClickVerse(
                      khatmaMembership.endShareSurah,
                      khatmaMembership.endShareVerse
                    )
                  }
                  className="bg-[var(--dark-color)] hover:bg-[var(--b-color)] px-3 py-2 rounded-lg transition-colors text-sm flex items-center gap-1"
                >
                  <span className="text-[10px] text-gray-400">End</span>
                  {indexToStringSurah[khatmaMembership.endShareSurah].name}-
                  {khatmaMembership.endShareVerse}
                </button>
              </div>
            </div>

            <div className="mt-auto pt-3 border-t border-[var(--dark-color)]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">
                  {goalAbsoluteVerse || 0} Verses
                </span>
                <span className="text-gray-400">
                  Joined:{" "}
                  {new Date(khatmaMembership.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Members Card */}
          <div className="bg-[var(--main-color)] rounded-lg text-white p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Members</h2>
              <div className="bg-[var(--dark-color)] px-3 py-1 rounded-full text-xs">
                {membersInKhatma?.length} users
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 mb-3 px-1 text-gray-400 text-xs">
              <span className="col-span-7 font-medium">Name</span>
              <span className="col-span-3 font-medium">Joined</span>
              <span className="col-span-2 font-medium text-right">
                Progress
              </span>
            </div>
            <div className="overflow-y-auto flex-1 pr-1">
              {membersInKhatma
                .sort((a, b) => b.progress - a.progress)
                .map((user, index) => (
                  <div
                    key={`${user.user.userName}-${index}`}
                    className={`grid grid-cols-12 gap-3 py-2 px-2 hover:bg-[var(--dark-color)] rounded-lg transition-colors items-center cursor-pointer text-sm ${
                      index === 0 ? "bg-[var(--dark-color)]" : ""
                    }`}
                  >
                    <span className="col-span-7 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[var(--dark-color)] rounded-full flex items-center justify-center text-xs font-bold">
                        #{index + 1}
                      </div>
                      <span
                        className={`truncate ${index === 0 ? "text-[var(--o-color)]" : "text-white"}`}
                      >
                        {user.user.username}
                      </span>
                    </span>
                    <span className="col-span-3 text-xs text-gray-400">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                    <span className="col-span-2 text-right">
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
        </div>

        {/* Right Column - 1/3 width */}
        <div className="flex flex-col w-1/3 gap-4">
          {/* Group Progress Card */}
          <div className="bg-[var(--main-color)] rounded-lg text-white p-6 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-4">Group Progress</h2>
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <Circle
                width={180}
                height={180}
                orangeDegree={orangeDegree}
                blueDegree={blueDegree}
                fontSize={24}
                groupProgress={khatmaDetails?.progress || 0}
                personalProgress={khatmaMembership?.progress || 0}
                backgroundColor={"var(--main-color)"}
              />

              <div className="text-center">
                <div className="text-xs text-gray-400">Time left</div>
                <div className="text-lg font-bold text-white">{timeLeft}</div>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <div className="bg-[var(--b-color)] w-3 h-3 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Personal</span>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="bg-[var(--o-color)] w-3 h-3 rounded-sm"></div>
                  <span className="text-xs text-gray-400">Group</span>
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
                  <span className="text-white text-right max-w-[100px] truncate">
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
      </div>
    </div>
  );
}
