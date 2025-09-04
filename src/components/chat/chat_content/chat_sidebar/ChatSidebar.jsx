"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import useUserStore from "../../../../stores/userStore";
import useGroupStore from "../../../../stores/groupStore";
import { ActionButton } from "../../../common/buttons/ActionButton";
import GroupInfoTab from "./GroupInfoTab";
import UserSettingsTab from "./UserSettingsTab";
import AdminSettingsTab from "./AdminSettingsTab";

const ChatSidebar = ({ group, onClose }) => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("info");
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    sound: true,
    preview: true,
  });

  // Group settings state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [initialized, setInitialized] = useState(false);

  const {
    groupSettings,
    fetchGroupSettings,
    updateGroupSettings,
    updateGroup,
  } = useGroupStore();

  const [adminSettings, setAdminSettings] = useState({
    can_add_member: "all",
    can_send_message: "all",
    all_can_launch_khatma: true,
    all_can_manage_code: true,
    can_add_member_custom: [],
    can_send_message_custom: [],
    max_khatma_participants: 10,
    khatma_update_timeout: 60,
  });

  const [normalSettings, setNormalSettings] = useState({
    name: "",
    icon: null,
    description: "",
    newIcon: null,
    iconPreview: "",
  });

  useEffect(() => {
    const initializeSettings = async () => {
      if (!group?.id) return;

      try {
        setLoading(true);
        await fetchGroupSettings(group.id);

        // Set normal settings
        setNormalSettings({
          name: group.name,
          description: group.description || "",
          icon: group.icon,
          newIcon: null,
          iconPreview: group.icon || "",
        });

        if (groupSettings) {
          setAdminSettings({
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
            can_add_member_custom: groupSettings.can_add_member_custom || [],
            can_send_message_custom:
              groupSettings.can_send_message_custom || [],
            max_khatma_participants:
              groupSettings.max_khatma_participants || 10,
            khatma_update_timeout: groupSettings.khatma_update_timeout || 60,
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

    if (group?.id && !initialized) {
      initializeSettings();
    }
  }, [group?.id, initialized]);

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

  const saveNormalSettings = async () => {
    try {
      setLoading(true);
      setError("");
      const formData = {
        group_id: group.id,
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
          "Failed to update group settings"
      );
    } finally {
      setLoading(false);
    }
  };

  const saveAdminSettings = async () => {
    try {
      setLoading(true);
      setError("");

      if (
        adminSettings.can_add_member === "custom" &&
        adminSettings.can_add_member_custom.length === 0
      ) {
        throw new Error(
          "Please select at least one member who can add members"
        );
      }

      if (
        adminSettings.can_send_message === "custom" &&
        adminSettings.can_send_message_custom.length === 0
      ) {
        throw new Error(
          "Please select at least one member who can send messages"
        );
      }

      const settingsToSave = {
        ...adminSettings,
        ...(adminSettings.can_add_member !== "custom" && {
          can_add_member_custom: undefined,
        }),
        ...(adminSettings.can_send_message !== "custom" && {
          can_send_message_custom: undefined,
        }),
      };

      await updateGroupSettings(group.id, settingsToSave);
      setSuccess("Admin settings updated successfully");
    } catch (err) {
      console.error("Failed to update admin settings", err);
      setError(err.message || "Failed to update admin settings");
    } finally {
      setLoading(false);
    }
  };

  if (!group) return null;

  const isAdmin = true; // Replace with actual admin check

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-80 bg-[var(--main-color)] border-l border-[var(--g-color)] text-white shadow-xl lg:relative lg:right-auto lg:top-auto lg:h-full lg:w-80 flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--g-color)]">
          <h2 className="font-semibold text-lg">Group Info</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--g-color)] rounded transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex border-b border-[var(--g-color)]">
          <button
            className={`flex-1 py-3 text-sm font-medium ${activeTab === "info" ? "text-white border-b-2 border-white" : "text-[var(--b-color)]"}`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${activeTab === "user" ? "text-white border-b-2 border-white" : "text-[var(--b-color)]"}`}
            onClick={() => setActiveTab("user")}
          >
            Settings
          </button>
          {isAdmin && (
            <button
              className={`flex-1 py-3 text-sm font-medium ${activeTab === "admin" ? "text-white border-b-2 border-white" : "text-[var(--b-color)]"}`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {error && (
            <div className="m-4 p-2 bg-[var(--bright-r-color)] text-white rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="m-4 p-2 bg-green-500 text-white rounded">
              {success}
            </div>
          )}

          {activeTab === "info" && <GroupInfoTab group={group} user={user} />}
          {activeTab === "user" && (
            <UserSettingsTab
              notificationSettings={notificationSettings}
              setNotificationSettings={setNotificationSettings}
            />
          )}
          {activeTab === "admin" && (
            <AdminSettingsTab
              adminSettings={adminSettings}
              setAdminSettings={setAdminSettings}
              group={group}
              loading={loading}
              onSave={saveAdminSettings}
            />
          )}
        </div>

        {activeTab === "admin" && (
          <div className="p-4 border-t border-[var(--g-color)]">
            <ActionButton
              isDirty={true}
              isDisabled={loading}
              label="Save Settings"
              value={true}
              onClick={saveAdminSettings}
              className="w-full justify-center"
            />
          </div>
        )}

        <div className="p-4 border-t border-[var(--g-color)] mt-auto">
          <ActionButton
            isDirty={true}
            isDisabled={false}
            label="Leave Group"
            value={true}
            destructive={true}
            onClick={() => console.log("Leave group")}
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;