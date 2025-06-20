import Circle from "../circle/Circle"

export default function QuranRightBar() {
    const Percentage = 10
    const degree = Percentage * 2 * 1.8
    return(
        <div className="w-64 fixed h-[var(--height)] right-0 top-14 border-l border-[var(--g-color)] bg-[var(--main-color)] inline-block">
            <div className="flex justify-center items-center">
            </div>
        </div>
    )
}