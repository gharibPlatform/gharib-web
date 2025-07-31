import { useState } from "react";
import KhatmaCard from "../../khatma_content/KhatmaCard";
import useKhatmasContentStore from "../../../../stores/khatmasStore";
import { useRouter } from "next/navigation";

function CurrentContent() {
  const { groupKhatmas } = useKhatmasContentStore();
  const router = useRouter();

  const handleClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
  };

  return (
    <div className="flex gap-12 px-8 w-full flex-wrap">
      {groupKhatmas?.current.length > 0 ? (
        groupKhatmas?.current.map((khatma, index) => (
          <div key={khatma.name} onClick={() => handleClick(khatma.id)}>
            <KhatmaCard
              key={index}
              name={khatma.name}
              progress={khatma.progress}
            />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-2xl text-[var(--lighter-color)] pl-6 pt-6">
          <div>No current khatmas</div>
        </div>
      )}
    </div>
  );
}

export default function Current() {
  const [rotate, setRotate] = useState(180);

  const changeRotation = () => {
    if (rotate == 180) {
      setRotate(270);
    } else {
      setRotate(180);
    }
  };

  const [isClicked, setIsClicked] = useState(true);
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
        Current
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
      {isClicked ? <div /> : <CurrentContent />}
    </div>
  );
}
