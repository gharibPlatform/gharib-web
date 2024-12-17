import { useState } from "react";
import KhatmaCard from "../../KhatmaCard";
import data from "../../../../data.json"
import { useRouter } from "next/navigation";
import useKhatmasContentStore from "@/stores/khatmasContentStore";

function FinishedContent() {
    const router = useRouter();
    const updateKhatmasContent = useKhatmasContentStore((state) => state.updateKhatmasContent);

    const handleClick = (khatma) => {
        updateKhatmasContent({
            name: khatma.name,
            percentage: khatma.percentage,
            timeLeft: khatma.timeLeft,
            status: khatma.status,
            personalProgress: khatma.personalProgress,
            share: khatma.share,
            pages: khatma.pages,
            remainingPages: khatma.remainingPages,
            length: khatma.length,
            startDate: khatma.startDate,
            endDate: khatma.endDate,
            activeTabStore: "khatmas"
          });
          router.push(`/khatmas/${khatma.name}`)
          console.log("Current name is : ", khatma.name);
    }

    return(
        <div className="flex gap-12 px-8 py-4 w-full flex-wrap">
            {data
                .filter((element) => element.status === "Finished") 
                .map((element, index) => (
                    <div key={element.name} onClick={()=>handleClick(element)}>
                        <KhatmaCard key={index} Name={element.name} Percentage={element.percentage} />
                    </div>
                ))}
        </div>

    )
}
export default function Finished() {
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
                Finished
                <svg style={{transform: `rotate(${rotate}deg)`}} class="w-6 h-6 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            {isClicked? <FinishedContent /> : <div />}
        </div>
    )
}