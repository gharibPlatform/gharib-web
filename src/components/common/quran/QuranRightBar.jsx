import DropDown from "../drop down /DropDown";
import QuranHighlights from "./quran content/QuranHighlights";
import { useState } from "react";

export default function QuranRightBar() {
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
        <div className="w-64 fixed h-[var(--height)] right-0 top-14 border-l border-[var(--g-color)] bg-[var(--main-color)] inline-block">
            <div 
             onClick={changeRotation}
             className="flex px-4 py-2 text-white font-semibold text-xl gap-6 items-center cursor-pointer">
                Highlights
                <DropDown rotation={rotation}/>

            </div>
                {showHighlights && <QuranHighlights />}
        </div>
    )
}