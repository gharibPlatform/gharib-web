export default function UpdateProgressModal({
  isOpen,
  setIsOpen,
  userKhatmasProgress,
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-[var(--main-color)] text-white rounded-lg p-4 shadow-md flex flex-col gap-4">
        <p className="text-xl font-semibold">Update Progress</p>
        <p className="text-sm">
          Are you sure you want to update your progress for this surah?
        </p>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">Current Progress</p>
            <p className="text-sm font-semibold text-[var(--o-color)]">
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">New Progress</p>
            <p className="text-sm font-semibold text-[var(--o-color)]">
              {/* {versesState.notYetRead.size} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}