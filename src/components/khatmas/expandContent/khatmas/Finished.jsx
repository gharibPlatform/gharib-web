import { useState } from "react";
import KhatmaCard from "../../khatma_content/KhatmaCard";
import useKhatmasContentStore from "../../../../stores/khatmasStore";
import { useRouter } from "next/navigation";

function FinishedContent() {
  const { groupKhatmas } = useKhatmasContentStore();
  const router = useRouter();

  const handleClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
  };

  const khatmas = groupKhatmas?.old ?? [];
  const finishedKhatmas = khatmas.filter(
    (khatma) => khatma.status === "finished"
  );

  return (
    <div className="flex gap-12 px-8 w-full flex-wrap">
      {finishedKhatmas.length > 0 ? (
        finishedKhatmas.map((khatma) => (
          <div key={khatma.id} onClick={() => handleClick(khatma.id)}>
            <KhatmaCard name={khatma.name} progress={khatma.progress} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-2xl text-[var(--lighter-color)] pl-6 pt-6">
          <div>No finished khatmas yet</div>
        </div>
      )}
    </div>
  );
}

export default function Finished() {
  const [rotate, setRotate] = useState(180);

  const changeRotation = () => {
    if (rotate == 180) {
      setRotate(270);
    } else {
      setRotate(180);
    }
  };

  const [isClicked, setIsClicked] = useState(false);
  const togglePersonal = () => {
    setIsClicked(!isClicked);
  };

  const handleClick = () => {
    changeRotation();
    togglePersonal();
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer gap-4 text-2xl text-[var(--w-color)] pl-6"
        onClick={handleClick}
      >
        Finished
        <svg
          style={{ transform: `rotate(${rotate}deg)` }}
          className="w-6 h-6 transition-all duration-200 ease"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M15 20L7 12L15 4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </div>
      {isClicked ? <FinishedContent /> : <div />}
    </div>
  );
}
