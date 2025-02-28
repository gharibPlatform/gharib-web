export default function GroupSideBar() {
    const brothersDataArray = ["Malek", "Moh", "Zohir", "Walid", "Moussa"];

    return (
        <div className=" flex justify-between flex-col  p-6 w-[360px] border-l border-[var(--g-color)] bg-[var(--main-color)] h-[var(--height)]">
            <div className="flex-col flex-nowrap w-full h-min">
                <h2 className="text-lg font-semibold text-[var(--w-color)] mb-2">Group Members</h2>
                <div className="mb-4">
                    {brothersDataArray.map((brother) => (
                        <GroupSidebarCard key={brother} name={brother} />
                    ))}
                </div>
            </div>
            <div className="flex gap-2 flex-col mt-auto justify-center items-center">
                <button className="w-full py-2 px-4 text-[var(--r-color)] hover:bg-[var(--main-color-hover)] ">
                    Delete Chat
                </button>
                <button className="w-full py-2 px-4 text-[var(--w-color)] hover:bg-[var(--g-color)]">
                    Leave Group
                </button>
            </div>
        </div>
    );
}

function GroupSidebarCard({ name }) {
    return (
        <div className="flex items-center justify-between p-2 border-b border-[var(--g-color)]">
            <span className="text-[var(--w-color)]">{name}</span>
        </div>
    );
}
