"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import useUserStore from "../../../stores/userStore";
import { CustomDropdown } from "../../settings/common/CustomDropdown";
import { ActionButton } from "../../common/buttons/ActionButton";

const ChatSideBar = ({ group, onClose }) => {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState("info");
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    sound: true,
    preview: true,
  });
  const [dropdownRotate, setDropdownRotate] = useState(90);
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

  const renderInfoTab = () => (
    <>
      <div className="p-5 flex justify-center">
        {group.image ? (
          <img
            src={group.image}
            alt={group.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-[var(--g-color)]"
          />
        ) : (
          <div className="w-28 h-28 rounded-full border-4 border-[var(--g-color)] flex items-center justify-center bg-[var(--g-color)]">
            <span className="text-white text-3xl font-bold">
              {group.name?.charAt(0) || "G"}
            </span>
          </div>
        )}
      </div>

      <div className="px-5 pb-4 text-center">
        <h1 className="text-xl font-bold">{group.name}</h1>
        <p className="text-[var(--b-color)] mt-1">
          {group.members_count} members
        </p>
      </div>

      {group.description && (
        <div className="px-5 pb-5">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-[var(--b-color)]">{group.description}</p>
        </div>
      )}

      <div className="px-5 pb-5">
        <h3 className="font-semibold mb-2">Admin</h3>
        <div className="flex items-center">
          {group.created_by?.profile_pic ? (
            <img
              src={group.created_by.profile_pic}
              alt={group.created_by.username}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[var(--g-color)] flex items-center justify-center mr-3">
              <span className="text-white text-xs font-semibold">
                {group.created_by?.username?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <span>{group.created_by?.username || "Unknown"}</span>
          {group.created_by?.id === user.id && (
            <span className="ml-2 text-xs bg-[var(--b-color)] px-2 py-1 rounded">
              You
            </span>
          )}
        </div>
      </div>

      <div className="px-5 pb-5">
        <h3 className="font-semibold mb-3">
          Members ({group?.members?.length})
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {group.members?.map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {member.profile_pic ? (
                  <img
                    src={member.profile_pic}
                    alt={member.username}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--g-color)] flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-semibold">
                      {member.username?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <span className="text-sm">{member.username}</span>
                {member.id === user.id && (
                  <span className="ml-2 text-xs bg-[var(--b-color)] px-2 py-1 rounded">
                    You
                  </span>
                )}
              </div>
              {member.id === group.created_by?.id && (
                <span className="text-xs text-[var(--b-color)] bg-[var(--g-color)] px-2 py-1 rounded">
                  Admin
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderUserSettingsTab = () => (
    <div className="p-5 space-y-6">
      <h3 className="font-semibold text-lg mb-2">Notification Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable Notifications</p>
            <p className="text-sm text-[var(--b-color)]">
              Receive notifications for new messages
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notificationSettings.enabled}
              onChange={() =>
                setNotificationSettings((prev) => ({
                  ...prev,
                  enabled: !prev.enabled,
                }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--g-color)] peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--b-color)]"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAdminSettingsTab = () => (
    <div className="p-5 space-y-6">
      <h3 className="font-semibold text-lg mb-2">Group Management</h3>

      <div className="space-y-4">
        <CustomDropdown
          value={adminSettings.can_add_member}
          onChange={(e) =>
            setAdminSettings({
              ...adminSettings,
              can_add_member: e.target.value,
            })
          }
          options={[
            { value: "all", label: "All members" },
            { value: "admin", label: "Only admins" },
            { value: "custom", label: "Custom members" },
          ]}
          rotate={dropdownRotate}
          setRotate={setDropdownRotate}
          label="Can add member"
          description="Control who can add new members to this group"
        />

        {adminSettings.can_add_member === "custom" && (
          <div className="ml-4 p-3 bg-[var(--g-color)] rounded border border-[var(--b-color)]">
            <p className="text-sm font-medium mb-2">Can add member custom:</p>
            <p className="text-xs text-[var(--b-color)] mb-2">
              Hold down "Control", or "Command" on a Mac, to select more than
              one.
            </p>
            <select
              multiple
              className="w-full bg-[var(--main-color)] border border-[var(--b-color)] rounded px-3 py-2 text-white text-sm"
              value={adminSettings.can_add_member_custom || []}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setAdminSettings({
                  ...adminSettings,
                  can_add_member_custom: selected,
                });
              }}
            >
              {group.members?.map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                  className="bg-[var(--main-color)]"
                >
                  {member.username}
                </option>
              ))}
            </select>
          </div>
        )}

        <CustomDropdown
          value={adminSettings.can_send_message}
          onChange={(e) =>
            setAdminSettings({
              ...adminSettings,
              can_send_message: e.target.value,
            })
          }
          options={[
            { value: "all", label: "All members" },
            { value: "admin", label: "Only admins" },
            { value: "custom", label: "Custom members" },
          ]}
          rotate={dropdownRotate}
          setRotate={setDropdownRotate}
          label="Can send message"
          description="Control who can send messages in this group"
        />

        {adminSettings.can_send_message === "custom" && (
          <div className="ml-4 p-3 bg-[var(--g-color)] rounded border border-[var(--b-color)]">
            <p className="text-sm font-medium mb-2">Can send message custom:</p>
            <p className="text-xs text-[var(--b-color)] mb-2">
              Hold down "Control", or "Command" on a Mac, to select more than
              one.
            </p>
            <select
              multiple
              className="w-full bg-[var(--main-color)] border border-[var(--b-color)] rounded px-3 py-2 text-white text-sm"
              value={adminSettings.can_send_message_custom || []}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setAdminSettings({
                  ...adminSettings,
                  can_send_message_custom: selected,
                });
              }}
            >
              {group.members?.map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                  className="bg-[var(--main-color)]"
                >
                  {member.username}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">All can launch khatma</p>
            <p className="text-sm text-[var(--b-color)]">
              Allow all members to start new khatma sessions
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={adminSettings.all_can_launch_khatma}
              onChange={() =>
                setAdminSettings({
                  ...adminSettings,
                  all_can_launch_khatma: !adminSettings.all_can_launch_khatma,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--g-color)] peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--b-color)]"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">All can manage code</p>
            <p className="text-sm text-[var(--b-color)]">
              Allow all members to manage group codes
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={adminSettings.all_can_manage_code}
              onChange={() =>
                setAdminSettings({
                  ...adminSettings,
                  all_can_manage_code: !adminSettings.all_can_manage_code,
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[var(--g-color)] peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--b-color)]"></div>
          </label>
        </div>

        {/* Khatma Settings */}
        <div className="pt-4 border-t border-[var(--g-color)]">
          <h4 className="font-medium mb-3">Khatma Settings</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Max khatma participants to allow update:
              </label>
              <input
                type="number"
                min="1"
                value={adminSettings.max_khatma_participants || 10}
                onChange={(e) =>
                  setAdminSettings({
                    ...adminSettings,
                    max_khatma_participants: parseInt(e.target.value),
                  })
                }
                className="w-full bg-[var(--main-color)] border border-[var(--b-color)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--b-color)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Khatma update timeout (seconds):
              </label>
              <input
                type="number"
                min="1"
                value={adminSettings.khatma_update_timeout || 60}
                onChange={(e) =>
                  setAdminSettings({
                    ...adminSettings,
                    khatma_update_timeout: parseInt(e.target.value),
                  })
                }
                className="w-full bg-[var(--main-color)] border border-[var(--b-color)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--b-color)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--g-color)]">
        <h3 className="font-semibold text-lg mb-3">Danger Zone</h3>
        <div className="space-y-3">
          <ActionButton
            isDirty={true}
            isDisabled={false}
            label="Clear Chat History"
            isDirty={true}
            isDisabled={false}
            value={true}
            onClick={() => console.log("Clear chat history")}
            className="w-full justify-center"
          />

          <ActionButton
            isDirty={true}
            isDisabled={false}
            label="Transfer Ownership"
            value={true}
            onClick={() => console.log("Transfer ownership")}
            className="w-full justify-center"
          />

          <ActionButton
            isDirty={true}
            isDisabled={false}
            label="Delete Group"
            value={true}
            destructive={true}
            onClick={() => console.log("Delete group")}
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );

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
          {activeTab === "info" && renderInfoTab()}
          {activeTab === "user" && renderUserSettingsTab()}
          {activeTab === "admin" && renderAdminSettingsTab()}
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

export default ChatSideBar;
