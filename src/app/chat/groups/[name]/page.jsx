"use client";
import { useParams } from "next/navigation";
import ChatContent from "@/components/chat/ChatContent";
import useNameHeaderStore from "@/stores/nameHeaderStore";
import { GroupProvider } from "@/context/GroupContext";
import { getGroups } from "@/utils/apiGroup";
import { useEffect } from "react";
const Page = () => {
  const { name } = useParams();
  useEffect(() => {
    const getGroupById = async () => {
      const resp = await getGroups(13);
      console.log(resp);
    };

    getGroupById();
  }, []);
  const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

  setNameHeader(name);

  return (
    <GroupProvider>
      <div>
        <ChatContent nameHeader={name} groupBool={true} />
      </div>
    </GroupProvider>
  );
};

export default Page;
