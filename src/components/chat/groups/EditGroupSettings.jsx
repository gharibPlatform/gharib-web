import { useState, useEffect } from "react";
import { createGroup } from "@/utils/apiGroup";

export default function CreateDMConfirmation({ selectedUsers }) {
    const [groupName, setGroupName] = useState("");
    const [groupIcon, setGroupIcon] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setGroupIcon(file);
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            setError("Group name is required");
            return;
        }
        setError("");
        setLoading(true);
        
        try {
            const formData = new FormData();
            formData.append("name", groupName);
            if (groupIcon) {
                formData.append("icon", groupIcon);
            }
            formData.append("users", JSON.stringify(selectedUsers));

            await createGroup(formData);
            console.log("Group successfully created");
        } catch (error) {
            console.error("Failed to create group", error);
            setError("Failed to create group. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--main-color)] w-[500px] no-scrollbar p-6 rounded-lg border border-[var(--g-color)] text-[var(--w-color)]">
            <h2 className="text-2xl font-semibold mb-4">Edit your group settings </h2>

            <label className="no-scrollbar flex flex-col gap-2 mb-4">
                <span className="text-lg pt-2">Group Name</span>
                <div className="no-scrollbar bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg flex items-center gap-2">
                    <input
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                        className="bg-transparent outline-none flex-grow"
                        type="text"
                    />
                </div>
                {error && <p className="text-[var(--bright-r-color)] flex items-center justify-center">{error}</p>}
            </label>

            <div className="mb-4 no-scrollbar">
                <h2 className="text-lg mb-2">Group Icon</h2>
                <div className="no-scrollbar flex items-center gap-4">
                    <label className="cursor-pointer hover:bg-[var(--main-color-hover)] bg-[var(--dark-color)] py-2 px-4 rounded-[5px] border border-[var(--g-color)] hover:bg-opacity-80">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    {groupIcon && <img src={URL.createObjectURL(groupIcon)} alt="Group Icon" className="w-12 h-12 rounded-full border border-[var(--g-color)]" />}
                </div>
            </div>

            <button 
                onClick={handleCreateGroup} 
                disabled={loading}
                className={`hover:bg-[var(--b-color-hover)] w-full bg-[var(--b-color)] text-white py-2 px-4 rounded-[4px] text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? "Editing..." : "Edit"}
            </button>
        </div>
    );
}