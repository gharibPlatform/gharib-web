import DropDown from "../drop down /DropDown";
import QuranHighlights from "./quran content/QuranHighlights";
import { useState } from "react";
import { X } from "lucide-react";

export default function QuranRightBar({ handleVerseClick, onClose, isLoadingHighlights }) {
  const [rotation, setRotation] = useState(90);
  const [showHighlights, setShowHighlights] = useState(false);

  const changeRotation = () => {
    if (rotation == 90) {
      setRotation(270);
      setShowHighlights(true);
    } else {
      setRotation(90);
      setShowHighlights(false);
    }
  };

  return (
    <div className="overflow-y-auto w-[520px] flex-wrap  h-[var(--height)] border-l border-[var(--g-color)] bg-[var(--main-color)] inline-block pb-5">
      <div className="flex justify-between items-center">
        <div
          onClick={changeRotation}
          className="flex px-4 py-2 text-white font-semibold text-xl gap-6 items-center cursor-pointer"
        >
          Highlights
          <DropDown rotation={rotation} />
        </div>
        <div className="">
          <button
            onClick={onClose}
            className="text-white rounded-full hover:bg-[var(--g-color)] p-2"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      {showHighlights && (
        <QuranHighlights isLoadingHighlights={isLoadingHighlights} handleVerseClick={handleVerseClick} />
      )}
    </div>
  );
}
