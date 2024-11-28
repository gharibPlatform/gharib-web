import ChatBrotherCard from "./ChatBrotherCard"

export default function ChatBrotherSection( { changeNameHeader }) {
    return(
        <div >
            <ChatBrotherCard changeNameHeader={changeNameHeader} Name={"Malek"} />
            <ChatBrotherCard changeNameHeader={changeNameHeader} Name={"Moh"} />
            <ChatBrotherCard changeNameHeader={changeNameHeader} Name={"Zohir"} />
            <ChatBrotherCard changeNameHeader={changeNameHeader} Name={"Walid"} />
            <ChatBrotherCard changeNameHeader={changeNameHeader} Name={"Moussa"} />
        </div>
    )
}