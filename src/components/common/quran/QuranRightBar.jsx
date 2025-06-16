import Circle from "../circle/Circle"

export default function QuranRightBar() {
    const Percentage = 10
    const degree = Percentage * 2 * 1.8
    return(
        <div className="w-72 fixed h-[var(--height)] right-0 top-14 border-l border-[var(--g-color)] bg-[var(--main-color)] inline-block">
            <div className="flex justify-center items-center">
                <p className="text-[var(--w-color)]">Gharib</p>
                <Circle
                    width={80}
                    height={80}
                    degree={degree}
                    fontSize={16}
                    text={`${Percentage}%`}
                    backgroundColor="var(--main-color)"
                />
            </div>
        </div>
    )
}