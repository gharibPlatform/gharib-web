import ChatButton from "../buttons/ChatButton"
import HomeButton from "../buttons/HomeButton"
import ExploreButton from "../buttons/ExploreButton"
import ProgressButton from "../buttons/ProgressButton"
import TerminologyButton from "../buttons/TerminologyButton"
import Community from "../community/Community"

function Top() {
    return<>
        <div class="inline-block flex-col w-min pt-4">
                <HomeButton />
                <ChatButton />
                <ExploreButton />
                <ProgressButton />
                <TerminologyButton />
        </div>
        
    </>
}

function SideBar() {

    return <>
        <div class="w-min border-r-0 border-[var(--g-color)] bg-[var(--main-color)] h-screen">
            <Top />
            <div class="mt-2 h-px bg-[var(--g-color)]"></div>
            <Community />
        </div>
    </>
}

export default SideBar;