"use client";
import { useState } from "react";
import ProfilePopup from "@/components/profile/ProfilePopup";

export default function App() {
  const [popupUser, setPopupUser] = useState(null);
  const [popupPos, setPopupPos] = useState(null);

  const mockUser = {
    id: 1,
    name: "ISLAM",
    picture: "/electron.svg",
    info: "Software Engineer",
  };

  const handleClick = (user, e) => {
    setPopupUser(user);
    setPopupPos({ x: e.clientX, y: e.clientY }); // store mouse coords
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <button
        onClick={(e) => handleClick(mockUser, e)}
        className="flex flex-col items-center"
      >
        <img
          src={mockUser.picture}
          alt={mockUser.name}
          className="w-20 h-20 rounded-full shadow cursor-pointer"
        />
        <span className="mt-2 font-medium">{mockUser.name}</span>
      </button>

      {popupUser && popupPos && (
        <ProfilePopup
          user={popupUser}
          position={popupPos} 
          onClose={() => {
            setPopupUser(null);
            setPopupPos(null);
          }}
        />
      )}
    </div>
  );
}
