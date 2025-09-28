export default function RandomVerse({ randomVerse, surahName }) {
  const pageNumberString = randomVerse?.page_number.toString().padStart(3, "0");
  const translation = randomVerse?.translations?.[0]?.text;

  return (
    <div className="w-full max-w-2xl mx-auto ">
      <div className="bg-[var(--main-color)] border border-[var(--light-color)] rounded-xl p-6 shadow-lg">
        {/* Arabic Verse */}
        <div
          style={{ fontFamily: `p${pageNumberString}-v1`, direction: "rtl" }}
          className="flex flex-wrap justify-center text-3xl leading-loose text-white mb-6"
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

        {/* Translation */}
        {translation && (
          <div className="mb-4 p-4 rounded-lg border border-[var(--light-color)] bg-[var(--secondary-color)]">
            <div className="text-sm text-[var(--lighter-color)] mb-2 font-medium">
              Translation:
            </div>
            <div className="text-[var(--w-color)] text-sm leading-relaxed italic">
              "{translation}"
            </div>
          </div>
        )}

        {/* Verse Info */}
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
