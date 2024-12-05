import { useState } from "react";

function GroupContent() {
    return(
        <div className="pl-14 pt-4 text-xl text-[var(--w-color)]">
            <table className="table-auto border-collapse">
              <tbody>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Length</td>
                  <td className="px-4 py-2">from the cow v 1 to the cow v 80</td>
                </tr>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Start date</td>
                  <td className="px-4 py-2">1 Sep 2024</td>
                </tr>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">End date</td>
                  <td className="px-4 py-2">5 Sep 2024</td>
                </tr>
                <tr className="">
                  <td className="px-4 pr-16 py-2 font-medium">Intent</td>
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

export default function Group() {
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
                Group
                <svg style={{transform: `rotate(${rotate}deg)`}} class="w-6 h-6 transition-all duration-200 ease" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 20L7 12L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
            {isClicked? <GroupContent /> : <div />}
        </div>
    )
}