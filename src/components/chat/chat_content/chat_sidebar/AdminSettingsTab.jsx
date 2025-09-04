import { useState } from "react";
import { CustomDropdown } from "../../../settings/common/CustomDropdown";
import { ActionButton } from "../../../common/buttons/ActionButton";

const AdminSettingsTab = ({ adminSettings, setAdminSettings, group }) => {
  const [dropdownRotate, setDropdownRotate] = useState(90);

  return (
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
};

export default AdminSettingsTab;
