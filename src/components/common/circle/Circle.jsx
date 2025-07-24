export default function Circle({
  width,
  height,
  orangeDegree, 
  blueDegree, 
  fontSize,
  text,
  backgroundColor,
}) {
  const innerWidth = width - 40;
  const innerHeight = height - 40;
  const radius = Math.min(width, height) / 2 - 12;

  const blueThickness = 20;
  const orangeThickness = 14;

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
        <circle cx={width / 2} cy={height / 2} r={radius + 5} fill="#323232" /> {/* Adjusted background */}

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
        <p className="text-2xl font-bold">{text}</p>
      </div>
    </div>
  );
}