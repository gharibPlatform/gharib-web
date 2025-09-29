import { useState, useEffect } from "react";
import { createGroup } from "../../../utils/group/apiGroup";
import { ActionButton } from "../../common/buttons/ActionButton";
import { FormInput } from "../../common/input/FormInput";
import {
  FiX,
  FiUpload,
  FiImage,
  FiUsers,
  FiUser,
  FiCheck,
} from "react-icons/fi";

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
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB");
        return;
      }

      setGroupIcon(file);
      setError("");
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }

    if (groupName.trim().length < 2) {
      setError("Group name must be at least 2 characters");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", groupName.trim());

      if (groupIcon) {
        formData.append("icon", groupIcon);
      }

      selectedUsers.forEach((user) => {
        formData.append("users", user.id);
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
    <div className="bg-[var(--main-color)] w-full h-full flex flex-col rounded-lg overflow-hidden shadow-xl">
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="mb-6">
          <h3 className="text-[var(--g-color)] text-sm font-medium mb-3 flex items-center gap-2 uppercase tracking-wide">
            <FiUser size={14} />
            Group Members • {selectedUsers.length}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-40 overflow-y-auto p-1 custom-scrollbar">
            {selectedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-[var(--main-color-hover)] p-3 rounded-lg flex items-center gap-3 border border-[var(--g-color)] border-opacity-20 transition-colors hover:border-opacity-40"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--circle-color)] flex items-center justify-center text-xs font-medium text-[var(--w-color)] flex-shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[var(--w-color)] text-sm truncate">
                  {user.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-[var(--g-color)] bg-opacity-20 my-6"></div>

        <div className="mb-6">
          <label className=" text-[var(--w-color)] text-sm font-medium mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--bright-b-color)]"></span>
            Group Name
          </label>
          <FormInput
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter a name for your group"
            className="w-full bg-[var(--input-color)] border border-[var(--g-color)] border-opacity-40 px-4 py-3 rounded-lg text-[var(--w-color)] focus:outline-none focus:ring-2 focus:ring-[var(--bright-b-color)] focus:border-transparent transition-all"
            type="text"
            maxLength={50}
          />
          <div className="flex justify-between text-xs mt-2">
            <span className="text-[var(--g-color)]">
              Required (min 2 characters)
            </span>
            <span
              className={
                groupName.length === 50
                  ? "text-[var(--bright-r-color)]"
                  : "text-[var(--g-color)]"
              }
            >
              {groupName.length}/50
            </span>
          </div>
        </div>

        {/* Group Icon */}
        <div className="mb-6">
          <label className=" text-[var(--w-color)] text-sm font-medium mb-3 flex items-center gap-2">
            <FiImage size={16} className="text-[var(--bright-b-color)]" />
            Group Icon
            <span className="text-xs font-normal text-[var(--g-color)]">
              (Optional)
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2 bg-[var(--main-color-hover)] hover:bg-[var(--main-color-hover-darker)] p-4 rounded-lg border-2 border-dashed border-[var(--g-color)] border-opacity-40 transition-colors text-[var(--w-color)] text-center w-full sm:w-auto">
              <FiUpload size={20} className="text-[var(--bright-b-color)]" />
              <span className="text-sm">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {groupIcon && (
              <div className="flex items-center gap-4 p-3 bg-[var(--main-color-hover)] rounded-lg w-full">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(groupIcon)}
                    alt="Group Icon Preview"
                    className="w-14 h-14 rounded-full border-2 border-[var(--bright-b-color)] object-cover"
                  />
                  <button
                    onClick={() => setGroupIcon(null)}
                    className="absolute -top-1 -right-1 bg-[var(--bright-r-color)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md transition-transform hover:scale-110"
                    aria-label="Remove image"
                  >
                    <FiX size={12} />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--w-color)] font-medium truncate">
                    {groupIcon.name}
                  </p>
                  <p className="text-xs text-[var(--g-color)]">
                    {(groupIcon.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <FiCheck size={16} className="text-green-500 flex-shrink-0" />
              </div>
            )}
          </div>

          <p className="text-xs text-[var(--g-color)] mt-3">
            Supported formats: JPG, PNG, GIF. Max size: 5MB
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-[var(--bright-r-color)] bg-opacity-15 border border-[var(--bright-r-color)] border-opacity-30 rounded-lg flex items-start gap-3">
            <div className="p-1 rounded-full bg-[var(--bright-r-color)] bg-opacity-20 flex-shrink-0 mt-0.5">
              <FiX size={14} className="text-[var(--bright-r-color)]" />
            </div>
            <p className="text-[var(--bright-r-color)] text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-[var(--g-color)] border-opacity-20 bg-[var(--main-color-dark)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <ActionButton
            label="Cancel"
            value="1"
            isDirty={true}
            isDisabled={false}
            onClick={onCancel}
            className="bg-transparent hover:bg-[var(--main-color-hover)] text-[var(--w-color)] border border-[var(--g-color)] border-opacity-40"
          />

          <ActionButton
            label={loading ? "Creating Group..." : "Create Group"}
            value="2"
            isDirty={true}
            isDisabled={
              selectedUsers.length === 0 || loading || groupName.length < 2
            }
            onClick={handleCreateGroup}
            className="bg-[var(--bright-b-color)] hover:bg-[var(--b-color-hover)] text-white disabled:bg-[var(--main-color-hover)] disabled:text-[var(--g-color)] transition-colors shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
