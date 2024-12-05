import { useRouter } from "next/router";
import ChatPage from ".";
import { useState } from "react";

export default function IDPage() {
    const router =  useRouter();
    const { id } = router.query;
    const [nameHeader, setNameHeader ]= useState("")

    const changeNameHeader = (Name) => {
        setNameHeader(Name);
        router.push(`/Chat/${ Name }`);
    }

    return(
        <div>
            <ChatPage nameHeader={id} changeNameHeader={changeNameHeader} />
        </div>
    )
}