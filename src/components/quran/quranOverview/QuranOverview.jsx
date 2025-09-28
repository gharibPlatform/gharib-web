import RandomVerse from "./RandomVerse";

export default function QuranOverview({ randomVerse }) {
  return (
    <div className="flex flex-col w-full h-full">
      <RandomVerse randomVerse={randomVerse} />
    </div>
  );
}
