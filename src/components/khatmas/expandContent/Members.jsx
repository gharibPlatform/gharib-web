import Image from "next/image";
import { useState } from "react";

function Member({ Name }) {
    return(
        <div className="pt-6 flex gap-24 items-center">
            <Image src={"/electron.svg"} alt="group image" class='w-12 h-12' width={1} height={1}  />
            <p>{Name}</p>
            <p>1st</p>
            <p>before 8 hours</p>
            <p>8 pages</p>
            <p>100%</p>
        </div>
    )
}
function MembersContent () {
        const members = [
            { name: "Ilyes", rank: "1st", time: "before 8 hours", pages: "8 pages", progress: "100%" },
            { name: "Malek", rank: "2nd", time: "before 6 hours", pages: "10 pages", progress: "95%" },
            { name: "Moussa", rank: "3rd", time: "before 4 hours", pages: "7 pages", progress: "90%" },
            { name: "Moh", rank: "4th", time: "before 2 hours", pages: "6 pages", progress: "85%" },
            { name: "Walid", rank: "5th", time: "just now", pages: "5 pages", progress: "80%" },
        ];
    
        return (
            <div className="pl-14 pt-4 text-xl text-[var(--w-color)]">
                <table className="table-auto w-full text-left">
    
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={index} className="pb-16" >
                                <td className=" py-2">
                                    <Image
                                        src="/electron.svg"
                                        alt="group image"
                                        className="w-12 h-12"
                                        width={1}
                                        height={1}
                                    />
                                </td>
                                <td className="px-6 py-2">{member.name}</td>
                                <td className="px-6 py-2">{member.rank}</td>
                                <td className="px-6 py-2">{member.time}</td>
                                <td className="px-6 py-2">{member.pages}</td>
                                <td className="px-6 py-2 text-[var(--o-color)]">{member.progress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
}

export default function Members() {
    const [rotate, setRotate] = useState(180);

    const changeRotation = () => {
        if (rotate == 180) {
            setRotate(270);
        }else{
            setRotate(180);
        }
    }

    const [isClicked, setIsClicked] = useState(false);
    const togglePersonal = () => {
        setIsClicked(!isClicked);
    }

    const handleClick = () => {
        changeRotation();
        togglePersonal();
    }

    return(
        <div>
            <div className="flex items-center cursor-pointer gap-4 text-2xl text-[var(--w-color)] pl-6 pt-12" onClick={handleClick}>
                Members
                <svg style={{transform: `rotate(${rotate}deg)`}} class="w-6 h-6 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            {isClicked? <MembersContent /> : <div />}
        </div>
    )
}