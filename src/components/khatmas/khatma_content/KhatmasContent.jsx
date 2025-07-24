import { useState, useEffect } from "react";
import ChatHeader from "../../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import Personal from "../expandContent/progress/Personal";
import Group from "../expandContent/progress/Group";
import Members from "../expandContent/progress/Members";
import {
  postKhatmaMembership,
  getKhatmaMembership,
} from "../../../utils/apiKhatma";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import QuranHeader from "../../chat/khatmas/QuranHeaderCreateKhatma";
import useKhatmaStore from "../../../stores/khatmasStore";

const JoinKhatmaForm = ({ onClose, khatmaId }) => {
  const [currentSurah, setCurrentSurah] = useState("");
  const [currentVerse, setCurrentVerse] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    fromChapter: fromChapterStart,
    toChapter: toChapterStart,
    fromVerse: fromVerseStart,
    toVerse: toVerseStart,
  } = useQuranHeaderChapter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const membershipData = {
        startShareSurah: fromChapterStart.translated_name.name.toLowerCase(),
        startShareVerse: fromVerseStart,
        endShareSurah: fromChapterEnd.translated_name.name.toLowerCase(),
        endShareVerse: fromVerseEnd,
        currentSurah,
        currentVerse,
        progress: 0,
        finishDate,
        status: "ongoing",
        groupMembership: groupId,
        khatma: khatmaId,
      };

      await postKhatmaMembership(khatmaId, membershipData);
      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error("Failed to join khatma:", err);
      setError(err.response?.data?.message || "Failed to join khatma");
      if (err.response?.data?.non_field_errors) {
        setError(err.response.data.non_field_errors[0]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[var(--main-color)] p-6 rounded-lg border border-[var(--g-color)] max-w-md w-full">
          <h2 className="text-[var(--w-color)] text-xl mb-4">Success!</h2>
          <p className="text-[var(--w-color)]">
            You have successfully joined the khatma.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--main-color)] p-6 rounded-lg border border-[var(--g-color)]  overflow-y-auto max-h-[90vh]">
        <h2 className="text-[var(--w-color)] text-xl mb-4">Join Khatma</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[var(--w-color)] block mb-2">
              Your Share (Start)
            </label>
            <QuranHeader selectionType="from" />
          </div>

          <div>
            <label className="text-[var(--w-color)] block mb-2">
              Your Share (End)
            </label>
            <QuranHeader selectionType="to" />
          </div>

          <div>
            <label className="text-[var(--w-color)] block mb-2">
              Current Progress
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentSurah}
                onChange={(e) => setCurrentSurah(e.target.value)}
                placeholder="Current Surah"
                className="flex-1 bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4"
                required
              />
              <input
                type="number"
                value={currentVerse}
                onChange={(e) => setCurrentVerse(e.target.value)}
                placeholder="Current Verse"
                className="flex-1 bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[var(--w-color)] block mb-2">
              Target Finish Date
            </label>
            <input
              type="datetime-local"
              value={finishDate}
              onChange={(e) => setFinishDate(e.target.value)}
              className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4"
              required
            />
          </div>

          {error && <p className="text-[var(--r-color)]">{error}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[var(--w-color)] bg-[var(--g-color)] rounded-[4px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] hover:bg-[var(--b-color-hover)] ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Joining..." : "Join Khatma"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function KhatmasContent({
  nameHeader,
  khatmaId = 1,
  groupId = 13,
}) {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isCheckingMembership, setIsCheckingMembership] = useState(true);
  const [membershipError, setMembershipError] = useState(null);
  const [membershipData, setMembershipData] = useState(null);
  const { khatmaMembership, fetchKhatmaMembership } = useKhatmaStore();

  useEffect(() => {
    const checkMembership = async () => {
      try {
        await fetchKhatmaMembership(khatmaId);

        if (response?.results?.length > 0) {
          const memberData = response.results.find(
            (m) => m.groupMembership === groupId && m.khatma === khatmaId
          );

          if (memberData) {
            setIsMember(true);
            setMembershipData(memberData);
          }
        }
      } catch (err) {
        console.error("API Error:", err);

        if (err.response?.data?.error !== "khatma membership not found") {
          setMembershipError("Failed to connect to server");
        }
      } finally {
        setIsCheckingMembership(false);
      }
    };

    if (khatmaId) {
      checkMembership();
    }
  }, [khatmaId, groupId]);

  if (isCheckingMembership) {
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-[var(--g-color)]">Checking membership...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col overflow-y-auto no-scrollbar">
      <div className="flex w-full flex-col relative">
        <div className="flex items-center justify-center text-white text-3xl py-4">Name</div>
        <KhatmasProgress
          startSurah={membershipData?.startShareSurah}
          startVerse={membershipData?.startShareVerse}
          endSurah={membershipData?.endShareSurah}
          endVerse={membershipData?.endShareVerse}
          currentSurah={membershipData?.currentSurah}
          currentVerse={membershipData?.currentVerse}
          progress={membershipData?.progress}
          status={membershipData?.status}
          finishDate={membershipData?.finishDate}
        />

        {/* <div className="flex flex-col items-center justify-center mt-4 mb-6 gap-2">
          {membershipError && (
            <p className="text-[var(--r-color)] text-sm">{membershipError}</p>
          )}

          {isMember ? (
            <button
              className="py-2 px-5 text-[var(--w-color)] bg-[var(--g-color)] rounded-[4px] cursor-default"
              disabled
            >
              Joined
            </button>
          ) : (
            <button
              onClick={() => setShowJoinForm(true)}
              className="hover:bg-[var(--b-color-hover)] py-2 px-5 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] transition-colors duration-200"
            >
              Join
            </button>
          )}
        </div> */}
      </div>

      {/* {isMember ? (
        <>
          <div className="flex flex-col">
            <Personal
              startSurah={membershipData.startShareSurah}
              startVerse={membershipData.startShareVerse}
              endSurah={membershipData.endShareSurah}
              endVerse={membershipData.endShareVerse}
              currentSurah={membershipData.currentSurah}
              currentVerse={membershipData.currentVerse}
              progress={membershipData.progress}
            />
          </div>

          <div className="flex flex-col">
            <Group groupId={groupId} khatmaId={khatmaId} />
          </div>

          <div className="flex flex-col">
            <Members groupId={groupId} khatmaId={khatmaId} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-4">
          <p className="text-[var(--g-color)]">
            Join the khatma to see your progress and group details
          </p>
        </div>
      )}

      {showJoinForm && (
        <JoinKhatmaForm
          onClose={() => setShowJoinForm(false)}
          khatmaId={khatmaId}
          groupId={groupId}
        />
      )} */}
    </div>
  );
}
