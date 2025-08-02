import Circle from "../circle/Circle";

export default function KhatmasInQuran({ name, progress, selfProgress }) {
  const KHATMAUSERS = 2; //how many users are in the khatma (will be replaced with the actual number when the data is ready)
  const orangeDegree = (progress * 360) / 100;
  const personalProgress = selfProgress / KHATMAUSERS;
  const blueDegree = (personalProgress * 360) / 100;

  return (
    <div className="flex flex-col items-center gap-1">
      <Circle
        width={120}
        height={120}
        orangeDegree={orangeDegree}
        blueDegree={blueDegree}
        fontSize={20}
        groupProgress={`${progress}`}
        personalProgress={`${personalProgress}%`}
        backgroundColor={"var(--dark-color)"}
      />
      <p className="text-white">{name}</p>
      <button className="text-white bg-[var(--o-color)] p-2 rounded-[4px] font-semibold hover:bg-[var(--o-color-hover)] ">Validate</button>
    </div>
  );
}
