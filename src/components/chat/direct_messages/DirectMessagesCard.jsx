import Image from "next/image";

export default function DirectMessagesCard({ name, icon, lastMessage }) {
  return (
    <div className="flex items-center justify-between text-white hover:bg-[var(--main-color-hover)] cursor-pointer w-full px-4 py-3">
      <div className="flex gap-2 items-center">
        <Image height={65} width={65} src={icon} alt="icon" />
        <div className="flex flex-col">
          <h1 className="font-bold">{name}</h1>
          <span className="text-sm text-[var(--lighter-color)]">
            {lastMessage}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <span className="text-[18px]">Just now</span>
        <div className="flex text-[14px] rounded-full w-4 h-4 items-center justify-center bg-blue-700 ml-auto">
          3
        </div>
      </div>
    </div>
  );
}
