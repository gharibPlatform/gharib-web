import { useState } from "react";

export default function CreateDMConfirmation() {
    const [groupName, setGroupName] = useState("");
    const [groupIcon, setGroupIcon] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setGroupIcon(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-[var(--main-color)] w-[500px] p-6 rounded-lg border border-[var(--g-color)] text-[var(--w-color)]">
            <h2 className="text-2xl font-semibold mb-4">You're going to create a group with:</h2>

            <label className="flex flex-col gap-2 mb-4">
                <span className="text-lg">Group Name</span>
                <div className="bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg flex items-center gap-2">
                    <input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                        className="bg-transparent outline-none flex-grow"
                        type="text"
                    />
                </div>
            </label>

            <div className="mb-4">
                <h2 className="text-lg mb-2">Group Icon</h2>
                <div className="flex items-center gap-4 ">
                    <label className="cursor-pointer hover:bg-[var(--main-color-hover)] bg-[var(--dark-color)] py-2 px-4 rounded-[5px] border border-[var(--g-color)] hover:bg-opacity-80">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    {groupIcon && <img src={groupIcon} alt="Group Icon" className="w-12 h-12 rounded-full border border-[var(--g-color)]" />}
                </div>
            </div>

            <button className="hover:bg-[var(--b-color-hover)] w-full bg-[var(--b-color)] text-white py-2 px-4 rounded-[4px] text-lg ">
                Create
            </button>
        </div>
    );
}
