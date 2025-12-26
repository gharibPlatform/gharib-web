import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import UserSettingsTab from "../chat/chat_content/chat_sidebar/UserSettingsTab";
import AdminSettingsTab from "../chat/chat_content/chat_sidebar/AdminSettingsTab";
import { ActionButton } from "../common/buttons/ActionButton";

export const SettingsModal = ({
  isOpen,
  onClose,
  notificationSettings,
  setNotificationSettings,
  adminSettings,
  setAdminSettings,
  isAdmin,
  group,
  loading,
  onSave,
}) => {
  const [settingsTab, setSettingsTab] = useState("user");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{ background: "var(--main-color)" }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--light-color)" }}
        >
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--w-color)" }}
          >
            Group Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-var(--main-color-hover)"
            style={{ background: "var(--input-color)" }}
          >
            <ArrowLeft
              className="w-5 h-5"
              style={{ color: "var(--lighter-color)" }}
            />
          </button>
        </div>

        {/* Settings Tabs */}
        <div
          className="px-6 border-b"
          style={{ borderColor: "var(--light-color)" }}
        >
          <div className="flex gap-8">
            <button
              onClick={() => setSettingsTab("user")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                settingsTab === "user"
                  ? "border-var(--b-color) text-var(--b-color)"
                  : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
              }`}
              style={{
                borderColor:
                  settingsTab === "user" ? "var(--b-color)" : "transparent",
                color:
                  settingsTab === "user"
                    ? "var(--b-color)"
                    : "var(--lighter-color)",
              }}
            >
              User Settings
            </button>
            {isAdmin && (
              <button
                onClick={() => setSettingsTab("admin")}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  settingsTab === "admin"
                    ? "border-var(--b-color) text-var(--b-color)"
                    : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
                }`}
                style={{
                  borderColor:
                    settingsTab === "admin" ? "var(--b-color)" : "transparent",
                  color:
                    settingsTab === "admin"
                      ? "var(--b-color)"
                      : "var(--lighter-color)",
                }}
              >
                Admin Settings
              </button>
            )}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-auto">
          {settingsTab === "user" ? (
            <UserSettingsTab
              notificationSettings={notificationSettings}
              setNotificationSettings={setNotificationSettings}
            />
          ) : (
            <AdminSettingsTab
              adminSettings={adminSettings}
              setAdminSettings={setAdminSettings}
              group={group}
              loading={loading}
              onSave={onSave}
            />
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="px-6 py-4 border-t flex justify-end gap-3"
          style={{ borderColor: "var(--light-color)" }}
        >
          <ActionButton
            label="Cancel"
            onClick={onClose}
            isDisabled={loading}
            value={false}
            isDirty={false}
            className="px-4 py-2"
          />
          <ActionButton
            label={loading ? "Saving..." : "Save Settings"}
            onClick={onSave}
            isDisabled={loading}
            value={true}
            isDirty={true}
            className="px-4 py-2"
          />
        </div>
      </div>
    </div>
  );
};
