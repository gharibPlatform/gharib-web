import { useState, useEffect } from "react";
import { createGroup } from "../../../utils/apiGroup";

export default function CreateDMConfirmation({
  selectedUsers,
  onSuccess,
  onCancel,
}) {
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

      selectedUsers.forEach((userId) => {
        formData.append("users", userId);
      });

      await createGroup(formData);
      onSuccess();
    } catch (error) {
      console.error("Failed to create group", error);
      setError("Failed to create group. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--main-color)] w-[500px] min-h-[400px] no-scrollbar p-6 rounded-lg border border-[var(--g-color)] text-[var(--w-color)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          You're going to create a group with:
        </h2>
        <button
          onClick={onCancel}
          className="text-[var(--g-color)] hover:text-[var(--w-color)]"
        >
          ✕
        </button>
      </div>

      <div className="text-[var(--w-color)] no-scrollbar rounded-[5px] text-lg flex flex-wrap items-center gap-2 mb-6">
        {selectedUsers.map((user) => (
          <span
            key={user.id}
            className="cursor-pointer bg-[var(--main-color-hover)] px-2 py-2 rounded-md text-sm flex items-center gap-2"
          >
            <h2>{user.name}</h2>
          </span>
        ))}
      </div>

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
        {error && (
          <p className="text-[var(--bright-r-color)] flex items-center justify-center">
            {error}
          </p>
        )}
      </label>

      <div className="mb-6 no-scrollbar">
        <h2 className="text-lg mb-2">Group Icon</h2>
        <div className="no-scrollbar flex items-center gap-4">
          <label className="cursor-pointer hover:bg-[var(--main-color-hover)] bg-[var(--dark-color)] py-2 px-4 rounded-[5px] border border-[var(--g-color)] hover:bg-opacity-80">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {groupIcon && (
            <div className="flex items-center gap-2">
              <img
                src={URL.createObjectURL(groupIcon)}
                alt="Group Icon"
                className="w-12 h-12 rounded-full border border-[var(--g-color)]"
              />
              <button
                onClick={() => setGroupIcon(null)}
                className="text-[var(--g-color)] hover:text-[var(--w-color)] text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="hover:bg-[var(--main-color-hover)] w-full bg-[var(--dark-color)] text-[var(--w-color)] py-2 px-4 rounded-[4px] text-lg border border-[var(--g-color)]"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateGroup}
          disabled={loading}
          className={`hover:bg-[var(--b-color-hover)] w-full bg-[var(--b-color)] text-white py-2 px-4 rounded-[4px] text-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
