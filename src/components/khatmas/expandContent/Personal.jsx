import { useState } from "react";

function PersonalContent() {
    return(
        <div className="pl-14 pt-4 text-xl text-[var(--w-color)]">
            <table className="table-auto border-collapse">
              <tbody>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Share</td>
                  <td className="px-4 py-2">from the cow v 1 to the cow v 80</td>
                </tr>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Pages</td>
                  <td className="px-4 py-2">8 Pages</td>
                </tr>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Remaining</td>
                  <td className="px-4 py-2">2 Pages</td>
                </tr>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Status</td>
                  <td className="px-4 py-2">Incomplete</td>
                </tr>
                <tr>
                  <td className="px-4 pr-16 py-2 font-medium">Duaa</td>
                  <td className="px-4 py-2">Read Now</td>
                </tr>
              </tbody>
            </table>
        </div>
    )
}

export default function Personal() {
    const [rotatePersonal, setRotatePersonal] = useState(180);

    const changeRotation = () => {
        if (rotatePersonal == 180) {
            setRotatePersonal(270);
        }else{
            setRotatePersonal(180);
        }
    }
    const [isPersonal, setIsPersonal] = useState(false);
    const togglePersonal = () => {
        setIsPersonal(!isPersonal);
    }

    const handleClick = () => {
        changeRotation();
        togglePersonal();
    }

    return(
        <div>
            <div className="flex items-center cursor-pointer gap-4 text-2xl text-[var(--w-color)] pl-6 pt-12" onClick={handleClick}>
                Personal
                <svg style={{transform: `rotate(${rotatePersonal}deg)`}} class="w-6 h-6 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            {isPersonal? <PersonalContent /> : <div />}
        </div>
    )
}