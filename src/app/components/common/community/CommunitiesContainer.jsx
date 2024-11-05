import CommunityButton from "./CommunityButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
function CommunitiesContainer( { isOpen }) {
    const communityIcon = "public/electron.svg"
    console.log(isOpen)
    return (
        <>
            <TransitionGroup>
                    <>
                        <CSSTransition 
                            in={isOpen}
                            timeout={300}
                            classNames="slide"
                            unmountOnExit
                        >
                            <CommunityButton communityIcon={communityIcon} communityName="almajanin" />
                        </CSSTransition>
    
                        <CSSTransition 
                            in={isOpen}
                            timeout={300}
                            classNames="slide"
                            unmountOnExit
                        >
                            <CommunityButton communityIcon={communityIcon} communityName="almashimajanin" />
                        </CSSTransition>
    
                        <CSSTransition 
                            in={isOpen}
                            timeout={300}
                            classNames="slide"
                            unmountOnExit
                        >
                            <CommunityButton communityIcon={communityIcon} communityName="The Last Group" />
                        </CSSTransition>
                    </>
            </TransitionGroup>
        </>
    );
}

export default CommunitiesContainer;