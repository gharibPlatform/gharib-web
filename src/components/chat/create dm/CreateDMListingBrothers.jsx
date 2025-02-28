import CreateDMBrotherCard from "./CreateDMBrotherCard";

export default function CreateDMListingBrothers({ selectedUsers, toggleUser, searchQuery }) {
    const brothersDataArray = ["Malek", "Moh", "Zohir", "Walid", "Moussa"];

    const filteredBrothers = brothersDataArray.filter((brother) =>
        brother.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="overflow-y-auto no-scrollbar">
            {filteredBrothers.length > 0 ? (
                filteredBrothers.map((brother) => (
                    <label key={brother} className="flex items-center gap-2 cursor-pointer pl-6">
                        <input
                            type="checkbox"
                            checked={selectedUsers.includes(brother)}
                            onChange={() => toggleUser(brother)}
                            className="hidden"
                        />
                        <div
                            className={`w-5 h-5 border rounded-lg flex items-center justify-center ${
                                selectedUsers.includes(brother) ? "bg-[var(--b-color)]" : "bg-[var(--light-color)]"
                            }`}
                        >
                        </div>
                        <CreateDMBrotherCard Name={brother} />
                    </label>
                ))
            ) : (
                <p className="text-center text-gray-500">No matches found</p>
            )}
        </div>
    );
}
