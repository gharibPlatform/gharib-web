"use client";
import { useParams } from "next/navigation";
import ChatContent from "../../../../components/chat/ChatContent";
import useNameHeaderStore from "../../../../stores/nameHeaderStore";
import { useEffect, useState } from "react";
import useGroupStore from "../../../../stores/groupStore";

const Page = () => {
  const { id } = useParams();
  const { group, fetchOneGroup } = useGroupStore();
  const setNameHeader = useNameHeaderStore((state) => state.setNameHeader);

  useEffect(() => {
    fetchOneGroup(id);
  }, [id]);

  useEffect(() => {
    setNameHeader(group?.name);
  }, [group]);

  return (
    <div>
      <ChatContent nameHeader={group?.name} groupBool={true} />
    </div>
  );
};

export default Page;
