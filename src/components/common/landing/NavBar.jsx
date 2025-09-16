"use client";
import React, { useState } from "react";
import Image from "next/image";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const images = ["/Group.svg"];

  return (
    <nav className="font-bold h-16 px-4 md:px-16 lg:px-[15%] flex justify-between items-center shadow-md shadow-black/30 top-0 z-[100] bg-white sticky ">
      {/* Logo */}
      <div className="relative w-10 h-10">
        <Image src={images[0]} width={40} height={40} alt="group" />
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-2">
        <button className="rounded-l-2xl bg-[#EAEAEA] h-10 w-24 md:w-28">Home</button>
        <button className="bg-[#EAEAEA] h-10 w-28 md:w-32">Features</button>
        <button className="rounded-r-2xl bg-[#EAEAEA] h-10 w-24 md:w-28">About Us</button>
      </div>

      {/* Right buttons (desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <button className="border-black border rounded-[10px] h-10 w-20 md:w-24">Get apk</button>
        <button className="border-none rounded-[10px] h-10 w-20 md:w-24 bg-[#5845EE] text-white">Log in</button>
      </div>

      {/* Hamburger (mobile) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-2xl">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-4 md:hidden">
          <button className="bg-[#EAEAEA] w-40 h-10 rounded-md">Home</button>
          <button className="bg-[#EAEAEA] w-40 h-10 rounded-md">Features</button>
          <button className="bg-[#EAEAEA] w-40 h-10 rounded-md">About Us</button>
          <button className="border border-black w-40 h-10 rounded-md">Get apk</button>
          <button className="bg-[#5845EE] text-white w-40 h-10 rounded-md">Log in</button>
        </div>
      )}
    </nav>
  );
};
