'use client';
import { useParams } from "next/navigation";
import ChatContent from '@/components/chat/ChatContent';
import useNameHeaderStore from "@/stores/nameHeaderStore";

const Page = () => {
    const { name } = useParams();
    
    const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

    setNameHeader(name);  

    return (
        <div>
            <ChatContent nameHeader={name} groupBool={true}/>
        </div>
    );
};

export default Page;
