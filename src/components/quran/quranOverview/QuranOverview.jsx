import RandomVerse from "./RandomVerse";

export default function QuranOverview({ randomVerse, surahName }) {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="pt-12 pb-16 flex flex-col items-center justify-center">
          <RandomVerse randomVerse={randomVerse} surahName={surahName} />
      </div>
    </div>
  );
}
