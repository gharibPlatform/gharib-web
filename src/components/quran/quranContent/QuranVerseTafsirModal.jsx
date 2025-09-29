"use client";
import { useEffect, useState } from "react";

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

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-[var(--b-color)]"
  >
    <path
      d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const VerseContent = ({ verse, pageNumberString }) => (
  <div
    style={{
      fontFamily: `p${pageNumberString}-v1`,
      direction: "rtl",
    }}
    className="flex flex-wrap justify-center text-white bg-[var(--dark-color)] text-2xl p-4 border border-[var(--g-color)] rounded-lg leading-loose"
  >
    {verse.words.map((word, index) => (
      <span key={index} className="px-0.5">
        {word.text}
      </span>
    ))}
  </div>
);

const TafsirContent = ({ tafsir }) => (
  <div className="bg-[var(--main-color)] border border-[var(--g-color)] rounded-lg p-5">
    <div className="flex items-center gap-2 mb-4">
      <BookIcon />
      <div className="text-[var(--b-color)] text-sm font-medium uppercase tracking-wide">
        Tafsir
      </div>
    </div>
    <div
      className="text-white text-base leading-relaxed space-y-4 tafsir-content"
      dangerouslySetInnerHTML={{ __html: tafsir }}
    />
  </div>
);

export default function TafsirModal({ verse, tafsir, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const pageNumberString = verse?.page_number.toString().padStart(3, "0");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out modal-backdrop ${
          isClosing ? "opacity-0" : "opacity-70"
        }`}
        onClick={handleClose}
      />

      <div
        className={`bg-[var(--secondary-color)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 transition-all duration-300 ease-in-out ${
          isClosing
            ? "opacity-0 scale-95 translate-y-4"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">{verse.verse_key}</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-[var(--main-color)] rounded-lg transition-all duration-200 hover:scale-110"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <VerseContent verse={verse} pageNumberString={pageNumberString} />
            </div>

            <div>
              <TafsirContent tafsir={tafsir} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tafsir-content :global(p) {
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .tafsir-content :global(.arabic) {
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          direction: rtl;
          display: block;
          text-align: center;
          margin: 1rem 0;
          padding: 0.75rem;
          background: var(--dark-color);
          border: 1px solid var(--g-color);
          border-radius: 0.5rem;
          font-size: 1.25rem;
          line-height: 1.8;
        }

        .tafsir-content :global(.uthmani) {
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }
      `}</style>
    </div>
  );
}
