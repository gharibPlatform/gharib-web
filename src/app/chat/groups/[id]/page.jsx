"use client";
import { useParams } from "next/navigation";
import ChatContent from "@/components/chat/ChatContent";
import useNameHeaderStore from "@/stores/nameHeaderStore";
import { GroupProvider } from "@/context/GroupContext";
import { getGroups } from "@/utils/apiGroup";
import { useEffect, useState } from "react";
const Page = () => {
  const { id } = useParams();
  const [group, setGroup] = useState();
  useEffect(() => {
    const getGroupById = async () => {
      const resp = await getGroups(id);

      setGroup(resp);
    };

    getGroupById();
  }, []);

  const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);
  if (group) {
    setNameHeader(group.name);
  }

  return (
    <GroupProvider>
      <div>
        <ChatContent nameHeader={group?.name} groupBool={true} />
      </div>
    </GroupProvider>
  );
};

export default Page;
