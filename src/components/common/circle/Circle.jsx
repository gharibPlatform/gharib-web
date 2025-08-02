export default function Circle({
  width,
  height,
  orangeDegree,
  blueDegree,
  fontSize,
  groupProgress,
  personalProgress,
  backgroundColor,
}) {
  const innerWidth = width - 40;
  const innerHeight = height - 40;
  const radius = Math.min(width, height) / 2 - 12;

  const sizeFactor = Math.min(width, height) / 100; 
  const blueThickness = 6 + sizeFactor * 4; 
  const orangeThickness = 4 + sizeFactor * 3;

  return (
    <div
      className="flex items-center justify-center rounded-full cursor-pointer z-10 relative"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <svg
        className="absolute w-full h-full"
        viewBox={`0 0 ${width} ${height}`}
      >
        <circle cx={width / 2} cy={height / 2} r={radius + 5} fill="#323232" />

        {orangeDegree > 0 && (
          <path
            d={`
              M ${width / 2} ${height / 2}
              m 0 -${radius}
              a ${radius} ${radius} 0 1 1 0 ${radius * 2}
              a ${radius} ${radius} 0 1 1 0 -${radius * 2}
            `}
            fill="none"
            stroke="#DC9908"
            strokeWidth={orangeThickness}
            strokeLinecap="round"
            strokeDasharray={`${(orangeDegree / 360) * 2 * Math.PI * radius}, 1000`}
          />
        )}

        {blueDegree > 0 && (
          <path
            d={`
              M ${width / 2} ${height / 2}
              m 0 -${radius}
              a ${radius} ${radius} 0 1 1 0 ${radius * 2}
              a ${radius} ${radius} 0 1 1 0 -${radius * 2}
            `}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={blueThickness}
            strokeLinecap="round"
            strokeDasharray={`${(blueDegree / 360) * 2 * Math.PI * radius}, 1000`}
          />
        )}
      </svg>

      <div
        className="rounded-full z-10 flex flex-col items-center justify-center text-[var(--w-color)]"
        style={{
          height: `${innerHeight}px`,
          width: `${innerWidth}px`,
          fontSize: `${fontSize}px`,
          backgroundColor: `${backgroundColor}`,
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex flex-col items-center">
          <p
            className="text-[var(--o-color)] font-bold"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {groupProgress ? groupProgress : 0}%
          </p>
          <p
            style={{
              fontSize: `${fontSize - 2}px`,
            }}
            className="text-[var(--b-color)]"
          >
            {personalProgress ? `${personalProgress}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}