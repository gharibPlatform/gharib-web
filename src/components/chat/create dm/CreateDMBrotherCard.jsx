import Image from "next/image";

export default function CreateDMBrotherCard( { Name, handleClick, index, backgroundColor }) {
    return(
        <div 
         onClick={ ()=>handleClick(Name, index) } 
         class={`flex-grow h-2 flex px-4 py-8 items-center gap-4 cursor-pointer bg-[var(--background-color)] hover:bg-[var(--main-color-hover-darker)] `} 
         style={{"--background-color" : `${backgroundColor}`}} 
        >
            <Image src={"/electron.svg"} class="w-11 h-11 cursor-pointer" width={1} height={1} alt="accountImage" />
            <h2  class="text-[var(--w-color)] text-xl cursor-pointer">{Name}</h2>
        </div>
    )

}