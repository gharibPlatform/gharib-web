import React from 'react'
import Image from 'next/image'

export const Navbar = () => {
  const images=["/Group.svg"]
  return (
    <nav className="font-bold h-16 px-4 md:px-16 lg:px-[15%] flex justify-between items-center shadow-md shadow-black/30 top-0 z-[100] bg-white sticky ">
      <div className="relative w-10 h-10">
        <Image src={images[0]} width={40} height={40} alt='group'/>
      </div>
      
      <div className="flex items-center gap-1 md:gap-2 md:ml-[100px]">
        <button className="rounded-l-2xl bg-[#EAEAEA] h-10 w-24 md:w-28">Home</button>
        <button className="bg-[#EAEAEA] h-10 w-28 md:w-32">Features</button>
        <button className="rounded-r-2xl bg-[#EAEAEA] h-10 w-24 md:w-28">About Us</button>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <button className="border-black border  rounded-[10px] h-10 w-20 md:w-24 ">Get apk</button>
        <button className="border-none rounded-[10px] h-10 w-20 md:w-24 bg-[#5845EE] text-white">Log in</button>
      </div>
    </nav>
  )
}