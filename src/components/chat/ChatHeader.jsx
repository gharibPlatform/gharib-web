import Image from "next/image"

export default function ChatHeader({ Name }) {
    return(
        <div class="h-20 border-b border-[var(--g-color)] flex p-4 items-center gap-4">
            <Image src={"/electron.svg"} class="w-14 h-14 cursor-pointer" width={1} height={1} alt="accountImage" />
            <h2  class="text-[var(--w-color)] text-xl cursor-pointer">{ Name }</h2>
        </div>
    )
}