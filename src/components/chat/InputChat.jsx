import Create from "../common/iconButtons/Create"
export default function InputChat() {
    return(
        <div class=" border border-[var(--g-color)] rounded-xl flex items-center justify-center w-full p-1 pr-2 mb-2">
            <input class="focus:outline-none rounded-xl placeholder-gray-500 bg-[var(--dark-color)] h-9 pl-4 pr-4 text-[var(--w-color)] mr-6 w-full " placeholder="Message..." type="text" />
            <Create fill={"#585858"} />
        </div>
    )
}