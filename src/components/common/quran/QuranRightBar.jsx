import DropDown from "../drop down /DropDown";
import QuranHighlights from "./quran content/QuranHighlights";
import { useState } from "react";

export default function QuranRightBar( { handleVerseClick }) {
    const [rotation, setRotation] = useState(90);
    const [showHighlights, setShowHighlights] = useState(false);

    const changeRotation = () => {
        if (rotation == 90) {
            setRotation(270);
            setShowHighlights(true);
        }else{
            setRotation(90);
            setShowHighlights(false);
        }
    }

    return(
        <div className="overflow-y-auto w-64 flex-wrap fixed h-[var(--height)] right-0 top-14 border-l border-[var(--g-color)] bg-[var(--main-color)] inline-block pb-5">
            <div 
             onClick={changeRotation}
             className="flex px-4 py-2 text-white font-semibold text-xl gap-6 items-center cursor-pointer">
                Highlights
                <DropDown rotation={rotation}/>

            </div>
                {showHighlights && <QuranHighlights handleVerseClick={handleVerseClick} />}
        </div>
    )
}