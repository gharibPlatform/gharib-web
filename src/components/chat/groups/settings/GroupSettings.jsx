import { useState, useEffect } from "react";
import useGroupStore from "../../../../stores/groupStore";
import NormalSettings from "./NormalSettings";
import AdvancedSettings from "./AdvancedSettings";

export default function GroupSettings({ groupId }) {
  const [activeTab, setActiveTab] = useState("normal");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [advancedSettingsLoaded, setAdvancedSettingsLoaded] = useState(false);

  const {
    group,
    groupSettings,
    fetchGroupSettings,
    updateGroupSettings,
    updateGroup,
  } = useGroupStore();

  const [normalSettings, setNormalSettings] = useState({
    name: "",
    icon: null,
    description: "",
    newIcon: null,
    iconPreview: "",
  });

  const [localAdvancedSettings, setLocalAdvancedSettings] = useState(null);
  const [showCustomMemberDialog, setShowCustomMemberDialog] = useState({
    for: null,
    open: false,
  });
  const [selectedCustomMembers, setSelectedCustomMembers] = useState([]);

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        setLoading(true);
        await fetchGroupSettings(groupId);

        setNormalSettings({
          name: group.name,
          description: group.description || "",
          icon: group.icon,
          newIcon: null,
          iconPreview: group.icon || "",
        });

        if (groupSettings) {
          const settings = {
            can_add_member: groupSettings.can_add_member || "all",
            can_send_message: groupSettings.can_send_message || "all",
            all_can_launch_khatma:
              groupSettings.all_can_launch_khatma !== undefined
                ? groupSettings.all_can_launch_khatma
                : true,
            all_can_manage_code:
              groupSettings.all_can_manage_code !== undefined
                ? groupSettings.all_can_manage_code
                : true,
          };

          if (groupSettings.can_add_member_custom) {
            settings.can_add_member_custom =
              groupSettings.can_add_member_custom;
          }
          if (groupSettings.can_send_message_custom) {
            settings.can_send_message_custom =
              groupSettings.can_send_message_custom;
          }

          setLocalAdvancedSettings(settings);
          setAdvancedSettingsLoaded(true);
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

  const openCustomMemberDialog = (forAction) => {
    setShowCustomMemberDialog({
      for: forAction,
      open: true,
    });

    if (forAction === "addMember") {
      setSelectedCustomMembers(
        localAdvancedSettings?.can_add_member_custom || [],
      );
    } else {
      setSelectedCustomMembers(
        localAdvancedSettings?.can_send_message_custom || [],
      );
    }
  };

  const saveCustomMembers = () => {
    if (selectedCustomMembers.length === 0) {
      setError("Please select at least one member");
      return;
    }

    if (showCustomMemberDialog.for === "addMember") {
      setLocalAdvancedSettings((prev) => ({
        ...prev,
        can_add_member_custom: [...selectedCustomMembers],
      }));
    } else {
      setLocalAdvancedSettings((prev) => ({
        ...prev,
        can_send_message_custom: [...selectedCustomMembers],
      }));
    }
    setShowCustomMemberDialog({ for: null, open: false });
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
        <NormalSettings
          normalSettings={normalSettings}
          setNormalSettings={setNormalSettings}
          loading={loading}
          saveNormalSettings={async () => {
            try {
              setLoading(true);
              setError("");
              const formData = {
                group_id: groupId,
                name: normalSettings.name,
                description: normalSettings.description,
              };

              if (normalSettings.newIcon) {
                formData.icon = normalSettings.newIcon;
              } else if (normalSettings.icon) {
                formData.icon = normalSettings.icon;
              }

              await updateGroup(formData);
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
          }}
        />
      ) : !advancedSettingsLoaded ? (
        <div className="p-6 text-center">Loading advanced settings...</div>
      ) : (
        <AdvancedSettings
          localAdvancedSettings={localAdvancedSettings}
          setLocalAdvancedSettings={setLocalAdvancedSettings}
          loading={loading}
          openCustomMemberDialog={openCustomMemberDialog}
          saveAdvancedSettings={async () => {
            try {
              setLoading(true);
              setError("");

              if (
                localAdvancedSettings.can_add_member === "custom" &&
                (!localAdvancedSettings.can_add_member_custom ||
                  localAdvancedSettings.can_add_member_custom.length === 0)
              ) {
                throw new Error(
                  "Please select at least one member who can add members",
                );
              }

              if (
                localAdvancedSettings.can_send_message === "custom" &&
                (!localAdvancedSettings.can_send_message_custom ||
                  localAdvancedSettings.can_send_message_custom.length === 0)
              ) {
                throw new Error(
                  "Please select at least one member who can send messages",
                );
              }

              const settingsToSave = {
                ...localAdvancedSettings,
                ...(localAdvancedSettings.can_add_member !== "custom" && {
                  can_add_member_custom: undefined,
                }),
                ...(localAdvancedSettings.can_send_message !== "custom" && {
                  can_send_message_custom: undefined,
                }),
              };

              await updateGroupSettings(groupId, settingsToSave);
              setSuccess("Advanced settings updated successfully");
            } catch (err) {
              console.error("Failed to update advanced settings", err);
              setError(err.message || "Failed to update advanced settings");
            } finally {
              setLoading(false);
            }
          }}
        />
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
            <p className="text-sm text-yellow-500 mb-2">
              You must select at least one member
            </p>

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

            <div className="flex justify-between items-center">
              <span className="text-sm">
                Selected: {selectedCustomMembers.length} members
              </span>
              <div className="flex gap-2">
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
                  disabled={selectedCustomMembers.length === 0}
                  className="bg-[var(--b-color)] hover:bg-[var(--b-color-hover)] text-white py-1 px-4 rounded disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
