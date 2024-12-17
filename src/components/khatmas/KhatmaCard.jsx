import Circle from "../common/circle/Circle";

export default function KhatmaCard( { Name, Pending, Percentage }) {
    const degree = Percentage * 2 * 1.8

    return(
        <div className="py-4 w-72 h-72 bg-[var(--main-color)] rounded-md flex flex-col items-center text-[var(--w-color)] text-lg cursor-pointer" >
            <p className="pb-6 font-bold">{Name}</p>    
            <Circle
                width={180}
                height={180}
                degree={degree}
                fontSize={26}
                text={`${Percentage}%`}
                backgroundColor="var(--main-color)"
            />
            <div className="flex pt-8">
                <p>Time Left : </p>
                <p className="pl-2">80m</p>
            </div>

            {Pending ? 
                <div>
                    <button>Join</button>
                </div>
                : <div />    
            }

        </div>
    )
}