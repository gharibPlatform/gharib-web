"use client";
import Header from "@/components/common/header/Header";

const page = () => {
  return (
    <div className="p-[20px_80px_40px_80px] ml-72 mt-14 w-[calc(100vw-288px)]">
      <h1 className="text-[#FFF] text-[40px] mb-5">Settings</h1>
      <div className="p-[0_40px]">
        <div className="mb-10">
          <h3 className="text-[#FFF] text-[18px] mb-4">Account</h3>
          <ul className="px-[40px] flex flex-col gap-5 w-[500px]">
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">UserName:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">FullName:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Email Address:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Account privacy:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
          </ul>
        </div>
        <div className="mb-10">
          <h3 className="text-[#FFF] text-[18px] mb-4">Preferences</h3>
          <ul className="px-[40px] flex flex-col gap-5 w-[500px]">
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Language:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Content Language:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Display:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
          </ul>
        </div>
        <div className="mb-10">
          <h3 className="text-[#FFF] text-[18px] mb-4">Chat</h3>
          <ul className="px-[40px] flex flex-col gap-5 w-[500px]">
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Who can send you a message:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">who can invite you to groupchats:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">New messages type:</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-[#929191]">Account privacy</span>
              <span className="text-[#929191]">R4Y4N3</span>
            </li>
          </ul>
        </div>
        <h3 className="text-[#FFF] text-[18px] mb-10">Give a feedback</h3>
        <h3 className="text-[#FFF] text-[18px] mb-10">Report a bug</h3>
        <h3 className="text-[#FFF] text-[18px] mb-10">Terms and privacy</h3>
        <h3 className="text-[#FFF] text-[18px] mb-10">About</h3>
        <h3 className="text-[#FFF] text-[18px] mb-10">Contact</h3>
        <h3 className="text-[#FF0000] text-[18px]">Logout</h3>
      </div>
    </div>
  );
};

export default page;
