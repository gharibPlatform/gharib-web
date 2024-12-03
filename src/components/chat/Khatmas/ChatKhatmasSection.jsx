import ChatKhatmaCard from "./ChatKhatmaCard";

export default function ChatKhatmasSection(){
    const data = ["Ghaza", "Gharib", "tuesday", "jumuaa", "istighfar"]
    return(
        <div >
            {data.map((element, index) => (
                <ChatKhatmaCard key={index} Name={element} />
            ))}
        </div>
    )
}