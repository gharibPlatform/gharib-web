import ChatGroupCard from "./ChatGroupCard"

export default function ChatGroupsSection({ changeNameHeader }) {
    return(
        <div >
            <ChatGroupCard changeNameHeader={changeNameHeader} Name={"Muslims"} />
            <ChatGroupCard changeNameHeader={changeNameHeader} Name={"Brothers"} />
            <ChatGroupCard changeNameHeader={changeNameHeader} Name={"2CP5"} />
            <ChatGroupCard changeNameHeader={changeNameHeader} Name={"2CP1"} />
            <ChatGroupCard changeNameHeader={changeNameHeader} Name={"2CP3"} />
        </div>
    )
}