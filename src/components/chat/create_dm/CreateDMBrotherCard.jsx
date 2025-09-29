import Image from "next/image";

export default function CreateDMBrotherCard( { Name, handleClick, index, backgroundColor }) {
    return(
        <div 
         onClick={ ()=>handleClick(Name, index) } 
         class={`flex-grow h-2 flex items-center gap-4 cursor-pointer bg-[var(--background-color)]`} 
         style={{"--background-color" : `${backgroundColor}`}} 
        >
            <Image src={"/electron.svg"} className="w-10 h-10 cursor-pointer" width={1} height={1} alt="accountImage" />
            <h2  className="text-[var(--w-color)] text-xl cursor-pointer">{Name}</h2>
        </div>
    )

}