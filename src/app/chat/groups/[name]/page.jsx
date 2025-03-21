'use client';
import { useParams } from "next/navigation";
import ChatContent from '@/components/chat/ChatContent';
import useNameHeaderStore from "@/stores/nameHeaderStore";
import { GroupProvider } from "@/context/GroupContext";

const Page = () => {
    const { name } = useParams();
    
    const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

    setNameHeader(name);  

    return (
        <GroupProvider>
            <div>
                <ChatContent nameHeader={name} groupBool={true}/>
            </div>
        </GroupProvider>
    );
};

export default Page;
