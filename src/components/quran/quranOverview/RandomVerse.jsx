export default function RandomVerse({ randomVerse }) {
  const pageNumberString = randomVerse?.page_number.toString().padStart(3, "0");

  return (
    <div>
      <div
        style={{ fontFamily: `p${pageNumberString}-v1`, direction: "rtl" }}
        className="flex flex-wrap text-white bg-[var(--dark-color)] text-2xl cursor-pointer hover:bg-[var(--secondary-color)] p-2 border border-[var(--g-color)] rounded"
      >
        {randomVerse.words.map((word, index) => (
          <span key={index}>{word.text}</span>
        ))}
      </div>
    </div>
  );
}
