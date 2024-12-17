import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useNameHeaderStore from "@/stores/nameHeaderStore";

function OpenMenu({ Name, GroupBool }) {
  const router = useRouter();
  const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

  const viewKhatmas = () =>{
    router.push("/khatmas")
    console.log(Name)
    setNameHeader(Name)
    console.log(setNameHeader)
  }

   return (
    <div className="w-56 py-4 px-2 bg-[var(--main-color)] rounded-md">
      {GroupBool ? (
        <>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">See Memebers</div>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">Mute Group</div>
          <div onClick={viewKhatmas} className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">View Khatmas</div>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">Group Settings</div>
        </>
      ) : (
        <>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">View Profile</div>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">Mute User</div>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">Progress</div>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">Delete Chat</div>
          <div className="bg-[var(--main-color)] items-center justify-center py-4 flex border-b border-[var(--dark-color)] cursor-pointer hover:bg-[var(--secondary-color)] text-[var(--w-color)] ">Block User</div>
        </>
      )}
    </div>
  );
}

export default function ChatHeader({ Name, GroupBool }) {
  const [isClicked, setIsClicked] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsClicked(false); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <>
      <div className="h-20 border-b border-[var(--g-color)] flex p-4 items-center gap-4">
        <Image
          src={"/electron.svg"}
          className="w-14 h-14 cursor-pointer"
          width={1}
          height={1}
          alt="accountImage"
        />
        <h2 className="text-[var(--w-color)] text-xl cursor-pointer">{Name}</h2>
        <div
          onClick={handleClick}
          className="h-12 w-12 py-2 px-1 hover:bg-[var(--main-color)] cursor-pointer mr-2 ml-auto flex flex-col gap-1 items-center justify-center rounded-full"
          ref={menuButtonRef} 
        >
          <div className="h-1 w-1 bg-[var(--g-color)]"></div>
          <div className="h-1 w-1 bg-[var(--g-color)]"></div>
          <div className="h-1 w-1 bg-[var(--g-color)]"></div>
        </div>
      </div>

      {isClicked && (
        <div className="absolute right-0 top-14 mr-10" ref={menuRef}>
          <OpenMenu Name={Name} GroupBool={GroupBool} />
        </div>
      )}
    </>
  );
}
