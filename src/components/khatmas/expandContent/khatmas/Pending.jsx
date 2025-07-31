import { useState } from "react";
import KhatmaCard from "../../khatma_content/KhatmaCard";
import data from "../../../../data.json";
import { useRouter } from "next/navigation";
import useKhatmasContentStore from "../../../../stores/khatmasStore";

function PendingContent() {
  const { groupKhatmas } = useKhatmasContentStore();
  const router = useRouter();

  const handleClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
  };

  const khatmas = groupKhatmas?.current ?? [];
  const pendingKhatmas = khatmas.filter(
    (khatma) => khatma.status === "pending"
  );

  return (
    <div className="flex gap-12 px-8 w-full flex-wrap">
      {pendingKhatmas.length > 0 ? (
        pendingKhatmas.map((khatma) => (
          <div key={khatma.id} onClick={() => handleClick(khatma.id)}>
            <KhatmaCard name={khatma.name} progress={khatma.progress} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-2xl text-[var(--lighter-color)] pl-6 pt-6">
          <div>No pending khatmas</div>
        </div>
      )}
    </div>
  );
}

export default function Pending() {
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
        Pending
        <svg
          style={{ transform: `rotate(${rotate}deg)` }}
          className="w-6 h-6 transition-all duration-200 ease"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M15 20L7 12L15 4"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </div>
      {isClicked ? <PendingContent /> : <div />}
    </div>
  );
}
