export default function CurrentKhatma({
  name,
  group,
  timeLeft,
  currentlyAt,
  progress,
  selfProgress,
}) {
  return (
    <div
      className="sticky top-4 mx-auto z-[9999] 
                    bg-gradient-to-r from-[var(--main-color)] to-[var(--main-dark-color)] 
                    text-white px-6 py-4 rounded-xl shadow-lg 
                    flex items-center justify-between gap-8 w-fit max-w-4xl
                    border border-white/10"
    >
      {/* Header Section */}
      <div className="flex flex-col whitespace-nowrap min-w-[180px]">
        <div className="flex items-center gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[var(--o-color)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-semibold text-lg">Ramadan Khatma</p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-sm opacity-80">Group: Family & Friends</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="flex flex-col items-center min-w-[220px]">
        <div className="flex justify-between w-full mb-1 gap-2">
          <p className="text-xs font-medium opacity-90 flex items-center">
            <span className="w-3 h-3 rounded-full bg-[var(--o-color)] mr-1"></span>
            Group Progress
          </p>
          <p className="text-xs font-medium opacity-90 flex items-center">
            <span className="w-3 h-3 rounded-full bg-[var(--b-color)] mr-1"></span>
            Your Progress
          </p>
        </div>

        <div className="w-full h-3 bg-white/20 rounded-full mt-1 relative overflow-hidden">
          {/* Group progress */}
          <div
            className="absolute top-0 left-0 h-3 bg-[var(--o-color)] rounded-full transition-all duration-500"
            style={{ width: "42%" }}
          />
          {/* User progress */}
          <div
            className="absolute top-0 left-0 h-3 bg-[var(--b-color)] rounded-full transition-all duration-700"
            style={{ width: "25%" }}
          />
        </div>

        <div className="flex justify-between w-full mt-2">
          <p className="text-sm font-semibold text-[var(--o-color)]">42%</p>
          <p className="text-sm font-semibold text-[var(--b-color)]">25%</p>
        </div>
      </div>

      {/* Current Reading & Time Section */}
      <div className="flex flex-col text-right whitespace-nowrap min-w-[180px]">
        <div className="flex items-center justify-end gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="font-semibold">Al-Baqarah 45</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm opacity-80">24m left in current segment</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        className="bg-[var(--o-color)] text-white px-4 py-2 rounded-lg font-semibold 
                         hover:bg-[var(--o-color-hover)] transition-all duration-200 flex items-center gap-2
                         shadow-md hover:shadow-lg whitespace-nowrap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        Update Progress
      </button>
    </div>
  );
}
