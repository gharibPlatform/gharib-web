export function CustomDropdown({
  value,
  onChange,
  options,
  rotate,
  setRotate,
  label,
  description,
}) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <h2 className="text-white text-lg">{label}</h2>
        <p className="text-[var(--g-color)] text-sm">{description}</p>
      </div>

      <div
        onClick={() => setRotate((prev) => (prev === 90 ? 270 : 90))}
        className="relative flex items-center w-min"
      >
        <select
          value={value}
          onChange={onChange}
          onBlur={() => setRotate(90)}
          className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)] appearance-none pr-8"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[var(--main-color)] text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-2 pointer-events-none">
          <svg
            style={{ transform: `rotate(${rotate}deg)` }}
            className="w-5 h-5 transition-all duration-200 ease"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 20L7 12L15 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
