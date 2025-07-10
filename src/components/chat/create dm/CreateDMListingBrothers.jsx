import CreateDMBrotherCard from "./CreateDMBrotherCard";

export default function CreateDMListingBrothers({ selectedUsers, toggleUser, searchQuery }) {
    const brothersDataArray = [
        { id: 1, name: "Malek" },
        { id: 2, name: "Moh" },
        { id: 3, name: "Zohir" },
        { id: 4, name: "Walid" },
        { id: 5, name: "Moussa" },
    ];

    const filteredBrothers = brothersDataArray.filter((brother) =>
        brother.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isSelected = (brother) => {
        return selectedUsers.some((user) => user.id === brother.id);
    };

    return (
        <div className="overflow-y-auto no-scrollbar">
            {filteredBrothers.length > 0 ? (
                filteredBrothers.map((brother) => (
                    <div
                        key={brother.id}
                        onClick={() => toggleUser(brother)}
                        className="flex items-center gap-2 cursor-pointer pl-6 py-2 hover:bg-[var(--main-color-hover)] rounded"
                    >
                        <div
                            className={`w-5 h-5 border rounded-lg flex items-center justify-center ${isSelected(brother) ? "bg-[var(--b-color)]" : "bg-[var(--light-color)]"}`}
                        ></div>
                        <CreateDMBrotherCard Name={brother.name} />
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No matches found</p>
            )}
        </div>
    );
}
