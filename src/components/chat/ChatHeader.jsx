import Image from "next/image"

export default function ChatHeader() {
    return(
        <div class="h-24 border-b border-[var(--g-color)] flex p-4 items-center gap-4">
            <Image src={"/electron.svg"} class="w-16 h-16 cursor-pointer" width={1} height={1} alt="accountImage" />
            <h2  class="text-[var(--w-color)] text-2xl cursor-pointer">Electron</h2>
        </div>
    )
}