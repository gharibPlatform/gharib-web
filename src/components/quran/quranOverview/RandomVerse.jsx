export default function RandomVerse({ randomVerse, surahName }) {
  const pageNumberString = randomVerse?.page_number.toString().padStart(3, "0");

  return (
    <div className="w-full max-w-2xl mx-auto cursor-default">
      <div className="bg-[var(--main-color)] border border-[var(--light-color)] rounded-xl p-6 shadow-lg">
        <div
          style={{ fontFamily: `p${pageNumberString}-v1`, direction: "rtl" }}
          className="flex flex-wrap justify-center text-2xl leading-loose text-white mb-4"
        >
          {randomVerse.words.map((word, index) => (
            <span
              key={index}
              className="px-0.5 hover:text-[var(--b-color)] transition-colors"
            >
              {word.text}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-[var(--g-color)] border-t border-[var(--light-color)] pt-3">
          <span>Surah - {surahName}</span>
          <span className="text-center">
            Verse : {randomVerse.verse_number}
          </span>
          <span className="text-right">Page : {randomVerse.page_number}</span>
        </div>
      </div>
    </div>
  );
}
