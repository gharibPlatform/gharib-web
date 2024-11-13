import CommunityButton from "./CommunityButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
function CommunitiesContainer( { isOpen }) {
    const communityIcon = ""
    console.log(isOpen)

    const nodeRef = useRef(null);

    return (
        <>
            <TransitionGroup
            nodeRef={nodeRef}>
                    <>
                        <CSSTransition 
                            in={isOpen}
                            timeout={300}
                            nodeRef={nodeRef}
                            classNames="slide"
                            unmountOnExit
                        >
                            <CommunityButton communityIcon={communityIcon} communityName="almajanin" />
                        </CSSTransition>
    
                        <CSSTransition 
                            in={isOpen}
                            timeout={300}
                            nodeRef={nodeRef}
                            classNames="slide"
                            unmountOnExit
                        >
                            <CommunityButton communityIcon={communityIcon} communityName="almashimajanin" />
                        </CSSTransition>
    
                        <CSSTransition 
                            in={isOpen}
                            timeout={300}
                            nodeRef={nodeRef}
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