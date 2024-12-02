import Circle from "@/components/common/circle/Circle";

function Header(){
  return(
    <div class="flex flex-col gap-3" >

        <h2 class="text-[var(--w-color)]">Ghaza</h2>
        <div class="w-28 h-1 bg-[var(--g-color)]" >
            <div class="w-1/2 h-1 bg-[var(--o-color)]"></div>
        </div>

    </div>
  )
}

export default function ChatKhatmaCard() {
    return(
        <div class="flex pl-5 pt-4 gap-4" >
            <Header />
            <Circle degree={ 30 } />
        </div>
    )
}