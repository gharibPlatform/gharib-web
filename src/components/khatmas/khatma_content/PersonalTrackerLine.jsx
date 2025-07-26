export default function PersonalTrackerLine({
  progress,
  currentVerse,
  wantedVerse,
}) {
  return (
    <div className="flex flex-col pb-4">
      <div className="w-full bg-[var(--main-color)] rounded-full h-4 border border-[var(--g-color)]">
        <div
          className="bg-[var(--o-color)] h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="flex justify-between pt-2 text-sm text-[var(--g-color)]">
          <span>Current: {currentVerse}</span>
          <span className="text-lg text-[var(--b-color)]">{progress}%</span>
          <span>Goal: {wantedVerse}</span>
        </div>
      </div>
    </div>
  );
}
