import { BookOpen, Calendar, MessageSquare } from "lucide-react";

export default function QuranHighlightsVerse({
  verse,
  highlightContent,
  highlightDate,
  onClick,
}) {
  const pageNumberString = verse?.page_number?.toString().padStart(3, "0");
  const formattedDate = new Date(highlightDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-[var(--dark-color)] rounded-lg border border-[var(--g-color)] p-4 hover:bg-[var(--main-color)] transition-colors mx-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[var(--o-color)]" />
          <span className="text-[var(--w-color)] font-medium text-sm">
            {verse.verse_key}
          </span>
        </div>
        <div className="text-[var(--g-color)] text-xs flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formattedDate}
        </div>
      </div>

      <div
        style={{
          fontFamily: `p${pageNumberString}-v1`,
          direction: "rtl",
        }}
        className="text-white text-3xl text-right mb-2 break-words overflow-hidden"
      >
        {verse.words.map((word, index) => (
          <span key={index}>{word.text}</span>
        ))}
      </div>

      {/* Highlight Content */}
      {highlightContent && (
        <div className="flex items-start gap-2 pt-3 border-t border-[var(--g-color)]">
          <MessageSquare className="w-4 h-4 text-[var(--o-color)] mt-0.5 flex-shrink-0" />
          <p className="text-[var(--w-color)] text-sm">{highlightContent}</p>
        </div>
      )}
    </div>
  );
}
