import { useState, useEffect } from "react";
import { updateGroup } from "@/utils/apiGroup";
import useGroupStore from "@/stores/groupStore";

export default function GroupSettingsEditor({ groupId }) {
  const [activeTab, setActiveTab] = useState("normal");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [initialized, setInitialized] = useState(false);

  const { group, groupSettings, fetchGroupSettings, updateGroupSettings } =
    useGroupStore();

  // Normal settings state
  const [normalSettings, setNormalSettings] = useState({
    name: "",
    icon: null,
    description: "",
    newIcon: null,
    iconPreview: "",
  });

  // Local advanced settings state
  const [localAdvancedSettings, setLocalAdvancedSettings] = useState({
    canAddMember: "all",
    canSendMessage: "all",
    AllCanLunchKhatma: true,
    AllCanManageCode: true,
    canAddMember_custom: [],
    canSendMessage_custom: [],
  });

  // Custom members selection
  const [showCustomMemberDialog, setShowCustomMemberDialog] = useState({
    for: null,
    open: false,
  });
  const [selectedCustomMembers, setSelectedCustomMembers] = useState([]);

  // Initialize state only once when component mounts
  useEffect(() => {
    const initializeSettings = async () => {
      try {
        setLoading(true);
        await fetchGroupSettings(groupId);

        // Initialize normal settings
        setNormalSettings({
          name: group.name,
          description: group.description || "",
          icon: group.icon,
          newIcon: null,
          iconPreview: group.icon || "",
        });

        // Initialize advanced settings
        if (groupSettings) {
          setLocalAdvancedSettings({
            canAddMember: groupSettings.canAddMember || "all",
            canSendMessage: groupSettings.canSendMessage || "all",
            AllCanLunchKhatma:
              groupSettings.AllCanLunchKhatma !== undefined
                ? groupSettings.AllCanLunchKhatma
                : true,
            AllCanManageCode:
              groupSettings.AllCanManageCode !== undefined
                ? groupSettings.AllCanManageCode
                : true,
            canAddMember_custom: groupSettings.canAddMember_custom || [],
            canSendMessage_custom: groupSettings.canSendMessage_custom || [],
          });
        }
        setInitialized(true);
      } catch (err) {
        console.error("Failed to fetch group settings", err);
        setError("Failed to load group settings");
      } finally {
        setLoading(false);
      }
    };

    if (groupId && !initialized) {
      initializeSettings();
    }
  }, [groupId, initialized]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleNormalSettingsChange = (e) => {
    const { name, value } = e.target;
    setNormalSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNormalSettings((prev) => ({
        ...prev,
        newIcon: file,
        iconPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleAdvancedSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalAdvancedSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openCustomMemberDialog = (forAction) => {
    setShowCustomMemberDialog({
      for: forAction,
      open: true,
    });

    if (forAction === "addMember") {
      setSelectedCustomMembers([...localAdvancedSettings.canAddMember_custom]);
    } else {
      setSelectedCustomMembers([
        ...localAdvancedSettings.canSendMessage_custom,
      ]);
    }
  };

  const saveCustomMembers = () => {
    if (showCustomMemberDialog.for === "addMember") {
      setLocalAdvancedSettings((prev) => ({
        ...prev,
        canAddMember_custom: [...selectedCustomMembers],
      }));
    } else {
      setLocalAdvancedSettings((prev) => ({
        ...prev,
        canSendMessage_custom: [...selectedCustomMembers],
      }));
    }
    setShowCustomMemberDialog({ for: null, open: false });
  };

  const saveNormalSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("id", groupId);
      formData.append("name", normalSettings.name);
      formData.append("description", normalSettings.description);

      if (normalSettings.newIcon) {
        formData.append("icon", normalSettings.newIcon);
      } else if (normalSettings.icon) {
        formData.append("icon", normalSettings.icon);
      }

      await updateGroup(groupId, formData);
      setSuccess("Group settings updated successfully");
    } catch (err) {
      console.error("Update error:", err);
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to update group settings",
      );
    } finally {
      setLoading(false);
    }
  };

  const saveAdvancedSettings = async () => {
    try {
      setLoading(true);
      setError("");
      await updateGroupSettings(groupId, localAdvancedSettings);
      setSuccess("Advanced settings updated successfully");
    } catch (err) {
      console.error("Failed to update advanced settings", err);
      setError("Failed to update advanced settings");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialized) {
    return <div className="p-6 text-center">Loading settings...</div>;
  }

  return (
    <div className="bg-[var(--main-color)] w-[500px] no-scrollbar p-6 rounded-lg border border-[var(--g-color)] text-[var(--w-color)]">
      <h2 className="text-2xl font-semibold mb-4">Group Settings</h2>

      <div className="flex border-b border-[var(--g-color)] mb-4">
        <button
          className={`py-2 px-4 ${activeTab === "normal" ? "border-b-2 border-[var(--b-color)]" : ""}`}
          onClick={() => setActiveTab("normal")}
        >
          Normal Settings
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "advanced" ? "border-b-2 border-[var(--b-color)]" : ""}`}
          onClick={() => setActiveTab("advanced")}
        >
          Advanced Settings
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-[var(--bright-r-color)] text-white rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded">
          {success}
        </div>
      )}

      {activeTab === "normal" ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Group Name</label>
            <input
              type="text"
              name="name"
              value={normalSettings.name}
              onChange={handleNormalSettingsChange}
              className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={normalSettings.description}
              onChange={handleNormalSettingsChange}
              className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
              rows="3"
            />
          </div>

          <div>
            <label className="block mb-1">Group Icon</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-[var(--dark-color)] py-2 px-4 rounded border border-[var(--g-color)] hover:bg-[var(--main-color-hover)]">
                Change Icon
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleIconChange}
                />
              </label>
              {normalSettings.iconPreview && (
                <img
                  src={normalSettings.iconPreview}
                  alt="Group Icon"
                  className="w-12 h-12 rounded-full border border-[var(--g-color)]"
                />
              )}
            </div>
          </div>

          <button
            onClick={saveNormalSettings}
            disabled={loading}
            className="mt-4 w-full bg-[var(--b-color)] hover:bg-[var(--b-color-hover)] text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Normal Settings"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Who can add members?</label>
            <select
              name="canAddMember"
              value={localAdvancedSettings.canAddMember}
              onChange={handleAdvancedSettingsChange}
              className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
            >
              <option value="all">All Members</option>
              <option value="admins">Only Admins</option>
              <option value="custom">Custom</option>
            </select>

            {localAdvancedSettings.canAddMember === "custom" && (
              <div className="mt-2">
                <button
                  onClick={() => openCustomMemberDialog("addMember")}
                  className="text-sm bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] py-1 px-3 rounded border border-[var(--g-color)]"
                >
                  Select Members
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1">Who can send messages?</label>
            <select
              name="canSendMessage"
              value={localAdvancedSettings.canSendMessage}
              onChange={handleAdvancedSettingsChange}
              className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
            >
              <option value="all">All Members</option>
              <option value="admins">Only Admins</option>
              <option value="custom">Custom</option>
            </select>

            {localAdvancedSettings.canSendMessage === "custom" && (
              <div className="mt-2">
                <button
                  onClick={() => openCustomMemberDialog("sendMessage")}
                  className="text-sm bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] py-1 px-3 rounded border border-[var(--g-color)]"
                >
                  Select Members
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="AllCanLunchKhatma"
              checked={localAdvancedSettings.AllCanLunchKhatma}
              onChange={handleAdvancedSettingsChange}
              id="khatmaCheckbox"
              className="w-4 h-4"
            />
            <label htmlFor="khatmaCheckbox">
              All members can launch Khatma
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="AllCanManageCode"
              checked={localAdvancedSettings.AllCanManageCode}
              onChange={handleAdvancedSettingsChange}
              id="codeCheckbox"
              className="w-4 h-4"
            />
            <label htmlFor="codeCheckbox">All members can manage code</label>
          </div>

          <button
            onClick={saveAdvancedSettings}
            disabled={loading}
            className="mt-4 w-full bg-[var(--b-color)] hover:bg-[var(--b-color-hover)] text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Advanced Settings"}
          </button>
        </div>
      )}

      {showCustomMemberDialog.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--main-color)] p-6 rounded-lg border border-[var(--g-color)] w-[400px]">
            <h3 className="text-xl mb-4">
              Select members who can{" "}
              {showCustomMemberDialog.for === "addMember"
                ? "add members"
                : "send messages"}
            </h3>

            <div className="max-h-60 overflow-y-auto mb-4 border border-[var(--g-color)] rounded p-2">
              {availableMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-2 p-1">
                  <input
                    type="checkbox"
                    checked={selectedCustomMembers.includes(member.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCustomMembers((prev) => [
                          ...prev,
                          member.id,
                        ]);
                      } else {
                        setSelectedCustomMembers((prev) =>
                          prev.filter((id) => id !== member.id),
                        );
                      }
                    }}
                  />
                  <span>{member.name}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setShowCustomMemberDialog({ for: null, open: false })
                }
                className="bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] py-1 px-4 rounded border border-[var(--g-color)]"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomMembers}
                className="bg-[var(--b-color)] hover:bg-[var(--b-color-hover)] text-white py-1 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
