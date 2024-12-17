import InputChat from "./InputChat";
import ChatHeader from "./ChatHeader";

export default function ChatContent({ nameHeader, groupBool }) {

    return<>
        <div class=" flex flex-col relative bg-[var(--dark-color)] w-full h-[var(--height)]">
            <ChatHeader Name={ nameHeader } GroupBool={groupBool} />
            <div class="grow"></div>
            <div class="flex flex-row items-center justify-between pl-4 pr-4">
                <InputChat />
            </div>
        </div>
    </>
}