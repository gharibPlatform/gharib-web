import Image
 from "next/image";
function CommunityButton({ communityName, communityIcon}) {
    return<>
        <div className="flex items-center gap-3 pl-9 transition-all-300 cursor-pointer pb-2 pt-2 hover:bg-[var(--secondary-color)]">
            <Image src={"/electron.svg"} alt="group image" class='w-9 h-9' width={1} height={1}  />
            <p className="text-4 text-[var(--w-color)]">{communityName}</p>
        </div>
    </>
}

export default CommunityButton;