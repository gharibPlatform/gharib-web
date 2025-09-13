"use client";
import useQuranHeaderVerse from "../../../../stores/verseQuranHeaderStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { createHighlights, getHighlights } from "@/utils/khatma/apiHighlight";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";

const Textarea = ({
  value,
  onChange,
  placeholder = "Provide a note for your highlight",
  rows = 3,
  autoFocus = false,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-[var(--dark-color)] text-white p-2 rounded border border-[var(--g-color)]"
      rows={rows}
      autoFocus={autoFocus}
    />
  );
};

const Button = ({
  onClick,
  children,
  variant = "secondary",
  className = "",
}) => {
  const baseClasses = "px-4 py-2 rounded border transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-[var(--dark-color)] text-white border-[var(--g-color)] hover:bg-[var(--darker-color)]"
      : "border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--g-color)]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

const EditIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 hover:stroke-white"
  >
    <path
      d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-gray-400 hover:text-white"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 text-green-500 mx-auto mb-4"
  >
    <path
      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 4L12 14.01l-3-3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VerseContent = ({ verse, pageNumberString, onClick }) => (
  <div
    onClick={onClick}
    style={{
      fontFamily: `p${pageNumberString}-v1`,
      direction: "rtl",
    }}
    className="flex flex-wrap text-white bg-[var(--dark-color)] text-2xl cursor-pointer hover:bg-[var(--secondary-color)] p-2 border border-[var(--g-color)] rounded"
  >
    {verse.words.map((word, index) => (
      <span key={index}>{word.text}</span>
    ))}
  </div>
);

const VerseInfo = ({ verse }) => (
  <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
    <div>
      <span className="block font-semibold">Page</span>
      {verse.page_number}
    </div>
    <div>
      <span className="block font-semibold">Juz</span>
      {verse.juz_number}
    </div>
    <div>
      <span className="block font-semibold">Hizb</span>
      {verse.hizb_number}
    </div>
  </div>
);

const NoteEditor = ({ tempNote, onNoteChange, onSave, onCancel }) => (
  <div className="flex flex-col flex-1 justify-between items-start gap-2">
    <Textarea value={tempNote} onChange={onNoteChange} autoFocus />
    <div className="flex justify-end gap-2 mt-2 ml-auto">
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onSave}>Save</Button>
    </div>
  </div>
);

const NoteViewer = ({ note, onEditClick }) => (
  <div className="flex items-start gap-2">
    <p className="flex-1">{note}</p>
    <button onClick={onEditClick} className="flex-shrink-0 mt-1">
      <EditIcon />
    </button>
  </div>
);

const SuccessComponent = ({ onClose }) => (
  <div className="fixed inset-0 z-[1000] modal-backdrop bg-black bg-opacity-70 flex items-center justify-center p-4">
    <div className="bg-[var(--secondary-color)] rounded-lg max-w-md w-full p-6 border border-gray-700">
      <div className="text-center">
        <SuccessIcon />
        <h3 className="text-xl font-semibold text-white mb-2">
          Highlight Created Successfully!
        </h3>
        <p className="text-gray-400 mb-6">
          Your highlight has been saved successfully.
        </p>
        <Button onClick={onClose} variant="primary" className="w-full">
          Close
        </Button>
      </div>
    </div>
  </div>
);

export default function QuranVerseModal({ verse, highlight, create, onClose }) {
  const [isEditing, setIsEditing] = useState(create);
  const [note, setNote] = useState(create ? "" : "any note*");
  const [tempNote, setTempNote] = useState(note);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (create) {
      getHighlights().then((res) => {
        console.log(res);
      });
    }
  }, [create]);

  const pageNumberString = verse.page_number.toString().padStart(3, "0");

  const handleEditClick = () => {
    setTempNote(note);
    setIsEditing(true);
  };

  const { quranHeaderChapter } = useQuranHeaderChapter();

  const handleSaveClick = async () => {
    setIsLoading(true);

    if (create) {
      try {
        const data = {
          surah: quranHeaderChapter.id,
          start_verse: verse.verse_number,
          end_verse: verse.verse_number,
          content: tempNote,
        };

        await createHighlights(data);
        setNote(tempNote);
        setIsEditing(false);
        setShowSuccess(true);

        // Auto-close after 2 seconds
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.log(error);
        alert("Failed to create highlight. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setNote(tempNote);
      setIsEditing(false);
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    if (create) {
      onClose();
    } else {
      setIsEditing(false);
    }
  };

  const handleNoteChange = (e) => {
    setTempNote(e.target.value);
  };

  const router = useRouter();
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const { setQuranHeaderVerse, setGoToVerse } = useQuranHeaderVerse();

  const goToVerse = (verse) => {
    const chapterId = verse.verse_key.split(":")[0];
    if (lastSegment === chapterId) {
      setGoToVerse(verse.verse_key);
      onClose();
      return;
    }
    router.push(`/quran/chapters/${chapterId}`);
    setGoToVerse(verse.verse_key);
    onClose();
  };

  if (showSuccess) {
    return <SuccessComponent onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[1000] modal-backdrop bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-[var(--secondary-color)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{verse.verse_key}</h2>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <VerseContent
              verse={verse}
              pageNumberString={pageNumberString}
              onClick={() => goToVerse(verse)}
            />

            <div className="text-gray-400">
              {isEditing ? (
                <NoteEditor
                  tempNote={tempNote}
                  onNoteChange={handleNoteChange}
                  onSave={handleSaveClick}
                  onCancel={handleCancelClick}
                />
              ) : (
                <NoteViewer
                  note={highlight.content}
                  onEditClick={handleEditClick}
                />
              )}
            </div>

            <VerseInfo verse={verse} />

            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--g-color)]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
