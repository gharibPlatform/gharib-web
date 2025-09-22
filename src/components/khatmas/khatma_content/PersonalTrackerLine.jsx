export default function PersonalTrackerLine({
  progress,
  currentVerse,
  wantedVerse,
}) {
  return (
    <div className="flex flex-col pb-4">
      <div className="w-full bg-[var(--main-color)] rounded-full h-4 border border-[var(--g-color)]">
        <div
          className="bg-[var(--b-color)] h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="flex items-center justify-center pt-2 text-sm text-[var(--g-color)]">
          <span className="text-lg text-[var(--b-color)]">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
