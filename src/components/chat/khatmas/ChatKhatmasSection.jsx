import ChatKhatmaCard from "./ChatKhatmaCard";
import useKhatmasContentStore from "@/stores/khatmasContentStore";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import data from "../../../data.json"

export default function ChatKhatmasSection() {
  const BACKGROUND_COLOR = "#212121";
  const BACKGROUND_COLOR_NEW = "#323232";

  const updateKhatmasContent = useKhatmasContentStore((state) => state.updateKhatmasContent);
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(null); 
  const nameStore = useParams();

  useEffect(()=> {
    let foundIndex = data.findIndex((item) => item.name === nameStore.name);
    if (foundIndex !== -1) {
      console.log(foundIndex);
      setActiveIndex(foundIndex);
    }
  }, [nameStore]);

  const handleCardClick = (khatma, i) => {
    setActiveIndex(i);
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
    router.push(`/khatmas/${khatma.name}`);
  };

  return (
    <div>
      {data
        .filter((element) => element.status !== "Finished") 
        .map((element) => (
          <div 
            key={element.name} 
            onClick={() => handleCardClick(element, element.name)} 
            className="cursor-pointer"
          >
            <ChatKhatmaCard 
              backgroundColor={element.name === nameStore?.name ? BACKGROUND_COLOR_NEW : BACKGROUND_COLOR}
              name={element.name} 
              percentage={element.percentage} 
              timeLeft={element.timeLeft}
            />
          </div>
        ))}
    </div>
  );
}
