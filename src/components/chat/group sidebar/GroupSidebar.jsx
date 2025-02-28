export default function GroupSideBar() {
    const brothersDataArray = ["Malek", "Moh", "Zohir", "Walid", "Moussa"];

    return (
        <div className=" p-4 bg-[var(--main-color)] w-[360px] rounded-md border border-[var(--g-color)]">
            <h2 className="text-lg font-semibold text-[var(--w-color)] mb-2">Group Members</h2>
            <div className="mb-4">
                {brothersDataArray.map((brother) => (
                    <GroupSidebarCard key={brother} name={brother} />
                ))}
            </div>
            <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Delete Chat
                </button>
                <button className="w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700">
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
