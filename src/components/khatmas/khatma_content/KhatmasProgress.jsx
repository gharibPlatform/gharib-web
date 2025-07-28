import Circle from "../../common/circle/Circle";
import useKhatmaStore from "../../../stores/khatmasStore";
import PersonalTrackerLine from "./PersonalTrackerLine";
import { useEffect, useState } from "react";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import { useRouter } from "next/navigation";
import useQuranHeaderVerse from "../../../stores/verseQuranHeaderStore";

export default function KhatmasProgress() {
  const { khatmaDetails, khatmaMembership, khatmaSelfMembership } =
    useKhatmaStore();

  const { setGoToVerse, setRange, totalVerses } = useQuranHeaderVerse();
  const { quranChapters } = useQuranHeaderChapter();

  const router = useRouter();

  const timeLeft = 28;

  const orangeDegree = (khatmaDetails.progress * 360) / 100;

  const personalProgress =
    khatmaSelfMembership.progress / khatmaMembership.length;

  const blueDegree = (personalProgress * 360) / 100;

  const [selfStartChapter, setSelfStartChapter] = useState();
  const [selfEndChapter, setSelfEndChapter] = useState();
  const [groupStartChapter, setGroupStartChapter] = useState();
  const [groupEndChapter, setGroupEndChapter] = useState();
  const [loading, setLoading] = useState(true);

  //getting the chapters from the quranChapters for the id/name_simple
  useEffect(() => {
    if (khatmaSelfMembership && quranChapters) {
      const startChapterSelf = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaSelfMembership.startShareSurah.toLowerCase()
      );

      const endChapterSelf = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaSelfMembership.endShareSurah.toLowerCase()
      );

      const startChapterGroup = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaDetails.startSurah.toLowerCase()
      );

      const endChapterGruop = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaDetails.endSurah.toLowerCase()
      );

      setSelfStartChapter(startChapterSelf);
      setSelfEndChapter(endChapterSelf);
      setGroupStartChapter(startChapterGroup);
      setGroupEndChapter(endChapterGruop);
      setRange(
        startChapterSelf.id,
        khatmaSelfMembership.startShareVerse,
        endChapterSelf.id,
        khatmaSelfMembership.endShareVerse,
        quranChapters
      );
      setLoading(false);
    }
  }, [khatmaSelfMembership, quranChapters, setRange]);

  const handleClickVerse = (chapterId, verse) => {
    router.push(`/quran/chapters/${chapterId}`);
    setGoToVerse(verse);
  };

  useEffect(() => {
    console.log(totalVerses);
  }, [totalVerses]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-9rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--o-color)]"></div>
      </div>
    );
  }

  return (
    <div className="flex px-10 w-full h-[calc(100vh-9rem)] gap-4 overflow-hidden">
      <div className="flex flex-col w-2/3 gap-4">
        {/* Personal Progress */}
        <div className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col min-h-0">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4">Personal Progress</h2>
            <div className="flex flex-col justify-between gap-8">
              <PersonalTrackerLine
                progress={khatmaSelfMembership.progress}
                currentVerse={khatmaSelfMembership.currentVerse}
                wantedVerse={totalVerses}
              />
              <h3>Your share is from:</h3>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-grow mt-6">
            <h3 className="text-3xl flex items-center justify-center gap-4">
              <a
                className="cursor-pointer hover:text-[var(--b-color)]"
                onClick={() =>
                  handleClickVerse(
                    selfStartChapter.id,
                    khatmaSelfMembership.startShareVerse
                  )
                }
              >
                {selfStartChapter.name_simple}{" "}
                {khatmaSelfMembership.startShareVerse}
              </a>{" "}
              to{" "}
              <a
                className="cursor-pointer hover:text-[var(--b-color)]"
                onClick={() =>
                  handleClickVerse(
                    selfEndChapter.id,
                    khatmaSelfMembership.endShareVerse
                  )
                }
              >
                {selfEndChapter.name_simple}{" "}
                {khatmaSelfMembership.endShareVerse}
              </a>
            </h3>

            <div className="flex items-center justify-between mt-4">
              <h3 className="text-center text-[var(--g-color)]">
                {totalVerses} Verses
              </h3>
              <h3 className="text-center text-[var(--g-color)]">
                joined khatma at : {khatmaSelfMembership.created_at}
              </h3>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-semibold mb-4">Members</h2>

          <div className="grid grid-cols-12 gap-4 mb-3 px-2">
            <span className="col-span-6 font-medium">Name</span>
            <span className="col-span-3 font-medium">Joined</span>
            <span className="col-span-3 font-medium text-right">Progress</span>
          </div>

          <div className="overflow-y-auto flex-1 pr-2">
            {khatmaMembership
              .sort((a, b) => b.progress - a.progress)
              .map((user, index) => (
                <div
                  key={`${user.groupMembership.userName}-${index}`}
                  className={`grid grid-cols-12 gap-4 py-3 px-2 hover:bg-[var(--darker-color)] rounded-[4px] items-center cursor-pointer ${
                    index % 2 === 0 ? "" : "bg-[var(--secondary-color)]"
                  } ${index == 0 ? "text-[var(--o-color)]" : ""}`}
                >
                  <span className="col-span-6 truncate flex items-center">
                    <div className="flex gap-2 items-center">
                      <span className="w-6 text-right">#{index + 1}</span>
                      <span>{user.groupMembership.username}</span>
                    </div>
                  </span>
                  <span className="col-span-3 text-sm">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                  <span className="col-span-3 text-right">
                    <span className="font-bold">{user.progress}%</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/3 ">
        <div className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-semibold">Group Progress</h2>
          <div className="flex-grow flex flex-col items-center justify-center gap-4">
            <Circle
              width={180}
              height={180}
              orangeDegree={orangeDegree}
              blueDegree={blueDegree}
              fontSize={20}
              groupProgress={`${khatmaDetails.progress}`}
              personalProgress={`${personalProgress}%`}
              backgroundColor={"var(--dark-color)"}
            />

            <h2>Time left: {timeLeft}h</h2>

            {/* legend */}
            <div className="flex gap-4 mb-6">
              <div className="flex gap-2 items-center">
                <div className="bg-[var(--b-color)] w-6 h-6 rounded-[4px]"></div>
                <span>Personal</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[var(--o-color)] w-6 h-6 rounded-[4px]"></div>
                <span>Group</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--secondary-color)] pt-4 mt-auto">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Start verse:</span>
                <span
                  className="cursor-pointer hover:text-[var(--b-color)]"
                  onClick={() =>
                    handleClickVerse(
                      groupStartChapter.id,
                      khatmaDetails.startVerse
                    )
                  }
                >
                  {groupStartChapter.name_simple} : {khatmaDetails.startVerse}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">End verse:</span>
                <span
                  className="cursor-pointer hover:text-[var(--b-color)]"
                  onClick={() =>
                    handleClickVerse(groupEndChapter.id, khatmaDetails.endVerse)
                  }
                >
                  {groupEndChapter.name_simple} : {khatmaDetails.endVerse}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Created at:</span>
                <span>
                  {new Date(khatmaDetails.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">End date:</span>
                <span>
                  {khatmaDetails.endDate
                    ? new Date(khatmaDetails.endDate).toLocaleDateString()
                    : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Intention:</span>
                <span className="text-right">
                  {khatmaDetails.intentions || "Not specified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Launcher:</span>
                <span className="text-right">
                  {khatmaDetails.launcher_data?.username || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
