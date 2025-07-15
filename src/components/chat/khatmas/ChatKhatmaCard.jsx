import Circle from "../../common/circle/Circle";

function Header({ name, timeLeft }) {
  return (
    <div className="flex flex-col justify-center h-full gap-1 w-60 pl-4">
      <h2 className="text-[var(--w-color)] text-xl">{name}</h2>
      <div className="flex gap-1">
        <h2 className="text-[var(--w-color)] text-base">timeLeft :</h2>
        <h2 className="text-[var(--r-color)] text-base">{timeLeft}</h2>
      </div>
    </div>
  );
}

export default function ChatKhatmaCard({ 
  backgroundColor, 
  name, 
  percentage, 
  timeLeft 
}) {
  const degree = percentage * 2 * 1.8;

  return (
    <div 
      style={{ "--background-color": backgroundColor || "var(--default-bg)" }} 
      className="flex items-center gap-2 hover:bg-[var(--main-color-hover)] cursor-pointer bg-[var(--background-color)] py-3" 
    >
      <Header 
        name={name || "Untitled Khatma"}
        timeLeft={timeLeft}
      />

      <Circle
        width={70}
        height={70}
        degree={degree}
        fontSize={12}
        text={`${percentage}%`}
        backgroundColor="var(--main-color)"
      />
    </div>
  );
}