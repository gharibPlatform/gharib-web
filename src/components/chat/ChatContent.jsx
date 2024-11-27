import InputChat from "./InputChat";
import ChatHeader from "./ChatHeader";

export default function ChatContent() {
    return<>
        <div class=" flex flex-col relative bg-[var(--dark-color)] w-full">
            <ChatHeader />
            <div class="grow"></div>
            <div class="flex flex-row items-center justify-between pl-4 pr-4">
                <InputChat />
            </div>
        </div>
    </>
}