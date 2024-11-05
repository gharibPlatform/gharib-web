import stylesSideBar from "./Sidebar.module.css"
import ChatButton from "../buttons/ChatButton"
import HomeButton from "../buttons/HomeButton"
import ExploreButton from "../buttons/ExploreButton"
import ProgressButton from "../buttons/ProgressButton"
import TerminologyButton from "../buttons/TerminologyButton"
import Community from "../community/Community"
// import { CssTransition } from "react-transition-group" 

function Top() {
    return<>
        <div className={stylesSideBar.top}>
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
        <div className={stylesSideBar.container}>
            <Top />
            <Community />
        </div>
    </>
}

export default SideBar;