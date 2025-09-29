"use client";
import { useEffect } from "react";

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

const VerseContent = ({ verse, pageNumberString }) => (
  <div
    style={{
      fontFamily: `p${pageNumberString}-v1`,
      direction: "rtl",
    }}
    className="flex flex-wrap text-white bg-[var(--dark-color)] text-2xl p-4 border border-[var(--g-color)] rounded-lg"
  >
    {verse.words.map((word, index) => (
      <span key={index}>{word.text}</span>
    ))}
  </div>
);

const TranslationContent = ({ translation }) => (
  <div className="bg-[var(--main-color)] border border-[var(--g-color)] rounded-lg p-4">
    <div className="text-gray-400 text-sm font-medium mb-2">Translation:</div>
    <div
      className="text-white text-lg leading-relaxed italic"
      dangerouslySetInnerHTML={{ __html: translation }}
    />
  </div>
);

export default function QuranVerseTranslateModal({
  verse,
  translation,
  onClose,
}) {
  const pageNumberString = verse?.page_number.toString().padStart(3, "0");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out modal-backdrop"
        style={{
          opacity: 0,
          animation: "fadeIn 0.3s ease-in-out forwards",
        }}
      />

      <div
        className="bg-[var(--secondary-color)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 transform transition-all duration-300 ease-out"
        style={{
          opacity: 0,
          transform: "scale(0.9) translateY(10px)",
          animation: "modalEnter 0.3s ease-out forwards 0.1s",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">{verse.verse_key}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[var(--main-color)] rounded-lg transition-colors duration-200"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="transition-all duration-300 ease-in-out">
              <VerseContent verse={verse} pageNumberString={pageNumberString} />
            </div>

            <div className="transition-all duration-300 ease-in-out">
              <TranslationContent translation={translation} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.7;
          }
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
