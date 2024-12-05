import Circle from "../common/circle/Circle"

export default function KhatmasProgress() {
    return(
        <div className="flex flex-col justify-center items-center pb-6">
            <h1 className="text-4xl text-[var(--w-color)] flex justify-center pt-12">Ghaza</h1>
            <h1 className="text-3xl text-[var(--w-color)] flex justify-center pt-12">Progress</h1>

            <div className="flex gap-24 pt-20">

                <div className="flex flex-col justify-center items-center text-xl gap-6 text-[var(--w-color)] ">
                    <Circle width={200} height={200} degree={30} fontSize={26} text={"60%"} backgroundColor={"var(--secondary-color)"} />
                    Personal
                </div>

                <div className="flex flex-col justify-center items-center text-xl gap-6 text-[var(--w-color)]">
                    <Circle width={200} height={200} degree={30} fontSize={26} text={"60%"} backgroundColor={"var(--secondary-color)"}  />
                    Group
                </div>

            </div>

            <div>

                <div className="flex gap-5 pt-14 text-xl">
                    <p className="text-[var(--w-color)]" >Status : </p>
                    <p className="text-[var(--o-color)]" >Ongoing</p>
                </div>

                <div className="flex gap-5 pt-6 text-xl">
                    <p className="text-[var(--w-color)]">TimeLeft : </p>
                    <p className="text-[var(--r-color)]">4d12h</p>
                </div>

            </div>
        </div>
    )
}