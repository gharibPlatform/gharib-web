import { useState } from "react";
import ChatHeader from "../chat/ChatHeader";
import KhatmasProgress from "./KhatmasProgress";
import Personal from "./expandContent/progress/Personal";
import Group from "./expandContent/progress/Group";
import Members from "./expandContent/progress/Members";
import { postKhatmaMembership } from "@/utils/apiKhatma";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import QuranHeader from "../chat/khatmas/QuranHeaderCreateKhatma";

const JoinKhatmaForm = ({ onClose, khatmaId }) => {
    const [currentSurah, setCurrentSurah] = useState("");
    const [currentVerse, setCurrentVerse] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { fromChapter: fromChapterStart, toChapter: toChapterStart, fromVerse: fromVerseStart, toVerse: toVerseStart } = useQuranHeaderChapter();
    const { fromChapter: fromChapterEnd, toChapter: toChapterEnd, fromVerse: fromVerseEnd, toVerse: toVerseEnd } = useQuranHeaderChapter();

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
                progress: 0, // Starting progress is 0
                finishDate,
                status: "ongoing",
                groupMembership: 13, 
                khatma: 3
            };

            await postKhatmaMembership(3, membershipData);
            setSuccess(true);
            setTimeout(onClose, 2000);
        } catch (err) {
            console.error("Failed to join khatma:", err);
            setError(err.response?.data?.message || "Failed to join khatma");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[var(--main-color)] p-6 rounded-lg border border-[var(--g-color)] max-w-md w-full">
                    <h2 className="text-[var(--w-color)] text-xl mb-4">Success!</h2>
                    <p className="text-[var(--w-color)]">You have successfully joined the khatma.</p>
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
                        <label className="text-[var(--w-color)] block mb-2">Your Share (Start)</label>
                        <QuranHeader selectionType="from" />
                    </div>

                    <div>
                        <label className="text-[var(--w-color)] block mb-2">Your Share (End)</label>
                        <QuranHeader selectionType="to" />
                    </div>

                    <div>
                        <label className="text-[var(--w-color)] block mb-2">Current Progress</label>
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
                        <label className="text-[var(--w-color)] block mb-2">Target Finish Date</label>
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

export default function KhatmasContent({ nameHeader, khatmaId }) {
    const [showJoinForm, setShowJoinForm] = useState(false);
    
    return (
        <div className="flex w-full flex-col h-[var(--height)] overflow-y-auto no-scrollbar">
            <div className="flex w-full flex-col relative">
                <ChatHeader Name={nameHeader} GroupBool={true} />
                
                <KhatmasProgress />
                <div className="flex items-center justify-center mt-4 mb-6">
                    <button 
                        onClick={() => setShowJoinForm(true)}
                        className="hover:bg-[var(--b-color-hover)] py-2 px-5 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] transition-colors duration-200"
                    >
                        Join
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <Personal />
            </div>

            <div className="flex flex-col">
                <Group />
            </div>

            <div className="flex flex-col">
                <Members />
            </div>

            {showJoinForm && (
                <JoinKhatmaForm 
                    onClose={() => setShowJoinForm(false)} 
                    khatmaId={khatmaId} 
                />
            )}
        </div>
    );
}