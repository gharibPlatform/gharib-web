import Circle from "../../common/circle/Circle";

export default function KhatmaCard({ name, progress }) {
  const orangeDegree = progress * 3.6;

  return (
    <div className="py-4 w-72 h-72 bg-[var(--main-color)] rounded-md flex flex-col items-center text-[var(--w-color)] text-lg cursor-pointer">
      <p className="pb-6 font-bold">{name}</p>
      <Circle
        width={180}
        height={180}
        groupProgress={progress}
        orangeDegree={orangeDegree}
        blueDegree={null}
        fontSize={26}
        backgroundColor="var(--main-color)"
      />
      <div className="flex pt-8">
        <p>Time Left : </p>
        <p className="pl-2">80m</p>
      </div>
    </div>
  );
}
