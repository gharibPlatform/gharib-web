import ChatButton from "../buttons/ChatButton"
import HomeButton from "../buttons/HomeButton"
import ExploreButton from "../buttons/ExploreButton"
import ProgressButton from "../buttons/ProgressButton"
import TerminologyButton from "../buttons/TerminologyButton"

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

import Community from "../community/Community"

function SideBar() {

    return <>
        <div class="w-min border-r border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)] inline-block">
            <Top />
            <div class="mt-2 h-px bg-[var(--g-color)]"></div>
            <Community />
        </div>
    </>
}

export default SideBar;