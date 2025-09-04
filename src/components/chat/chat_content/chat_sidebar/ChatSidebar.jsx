"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import useUserStore from "../../../../stores/userStore";
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

  if (!group) return null;

  const isAdmin = true;

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

        {/* Tabs Navigation */}
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
            />
          )}
        </div>

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
