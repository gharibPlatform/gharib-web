import Circle from "@/components/common/circle/Circle";
import { useRouter } from "next/router";

function Header({ Name }){
  return(
    <div class="flex flex-col gap-6" >

        <h2 class="text-[var(--w-color)] text-xl">{Name}</h2>
        <div class="w-48 h-1 bg-[var(--g-color)]" >
            <div class="w-1/2 h-1 bg-[var(--o-color)]"></div>
        </div>

    </div>
  )
}

export default function ChatKhatmaCard({ Name }) {
    
    const router = useRouter();
    const pushToKhatmas = () => {
        router.push('/Khatmas');
        console.log(router)
    }

    return(
        <div onClick={pushToKhatmas} class="flex pl-10 pt-4 pb-4 gap-6 hover:bg-[var(--main-color-hover)] cursor-pointer" >
            <Header Name={Name} />
            <div className="pt-1">
                <Circle width={65} height={65} degree={30} />
            </div>
        </div>
    )
}