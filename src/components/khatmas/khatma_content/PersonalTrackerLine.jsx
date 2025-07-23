export default function PersonalTrackerLine({
  progress,
  currentVerse,
  wantedVerse,
}) {
  return (
    <div className="w-full bg-[var(--main-color)] rounded-full h-4 border border-[var(--g-color)] ">
      <div
        className="bg-[var(--o-color)] h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
        <span>Current: {currentVerse}</span>
        <span>Goal: {wantedVerse}</span>
      </div>
    </div>
  );
}
