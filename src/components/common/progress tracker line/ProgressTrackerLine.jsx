export default function ProgressTrackerLine() {
    return(
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
                className="absolute top-0 left-0 h-full bg-green-500 transition-all"
                // style={{ width: `${(current / total) * 100}%` }}
            ></div>
      </div>
    )
}