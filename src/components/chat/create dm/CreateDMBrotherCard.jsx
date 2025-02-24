import Image from "next/image";

export default function CreateDMBrotherCard( { Name, handleClick, index, backgroundColor }) {
    return(
        <div onClick={ ()=>handleClick(Name, index) } class={`h-8 flex p-4 pb-10 pt-10 items-center gap-4 cursor-pointer bg-[var(--background-color)] hover:bg-[var(--main-color-hover)] `} style={{"--background-color" : `${backgroundColor}`}} >
            <Image src={"/electron.svg"} class="w-12 h-12 cursor-pointer" width={1} height={1} alt="accountImage" />
            <h2  class="text-[var(--w-color)] text-xl cursor-pointer">{Name}</h2>
        </div>
    )

}