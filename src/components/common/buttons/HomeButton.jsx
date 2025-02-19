import { useRouter } from "next/navigation";
function HomeButton() {
    const router = useRouter();
        const handleClick = () => {
            router.push("home")
        }

    return<>
        <div onClick={handleClick} className="hover:bg-[var(--secondary-color)] pt-3 pb-3 flex flex-inline items-center gap-4 cursor-pointer pl-9 pr-32">
            <svg className="w-4 h-4" fill="#ffffff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,2.938l-256,256v48.427h62.061v201.697h155.152V384.941h77.576v124.121h155.151V307.365H512v-48.427L256,2.938z M403.394,260.82v201.697h-62.061V338.396H170.667v124.121h-62.061V260.82H63.943L256,68.762L448.057,260.82H403.394z"></path> </g> </g> </g></svg>
            <p className="text-r text-white">Home</p>
        </div>
    </>
}
export default HomeButton;