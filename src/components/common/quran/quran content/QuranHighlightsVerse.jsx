export default function QuranHighlightsVerse({ verse, onClick }) {
  const pageNumberString = verse.page_number.toString().padStart(3, "0");

  return (

    <div>
      {verse.verse_key}
      <div
        onClick={onClick}
        style={{ fontFamily: `p${pageNumberString}-v1`, direction: "rtl" }}
        className="flex flex-wrap max-w-[300px] text-white bg-[var(--dark-color)] text-2xl cursor-pointer hover:bg-[var(--secondary-color)] p-2 border border-[var(--g-color)] rounded"
      >
        {verse.words.map((word, index) => (
          <span key={index}>{word.text}</span>
        ))}
      </div>
    </div>
  );
}
