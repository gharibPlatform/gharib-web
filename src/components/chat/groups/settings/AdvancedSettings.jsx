export default function AdvancedSettings({
  localAdvancedSettings,
  setLocalAdvancedSettings,
  loading,
  openCustomMemberDialog,
  saveAdvancedSettings,
}) {
  const handleAdvancedSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalAdvancedSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Who can add members?</label>
        <select
          name="can_add_member"
          value={localAdvancedSettings.can_add_member}
          onChange={handleAdvancedSettingsChange}
          className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
        >
          <option value="all">All Members</option>
          <option value="admins">Only Admins</option>
          <option value="custom">Custom</option>
        </select>

        {localAdvancedSettings.can_add_member === "custom" && (
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
          name="can_send_message"
          value={localAdvancedSettings.can_send_message}
          onChange={handleAdvancedSettingsChange}
          className="w-full bg-[var(--dark-color)] border border-[var(--g-color)] rounded p-2"
        >
          <option value="all">All Members</option>
          <option value="admins">Only Admins</option>
          <option value="custom">Custom</option>
        </select>

        {localAdvancedSettings.can_send_message === "custom" && (
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
          name="all_can_launch_khatma"
          checked={localAdvancedSettings.all_can_launch_khatma}
          onChange={handleAdvancedSettingsChange}
          id="khatmaCheckbox"
          className="w-4 h-4"
        />
        <label htmlFor="khatmaCheckbox">All members can launch Khatma</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="all_can_manage_code"
          checked={localAdvancedSettings.all_can_manage_code}
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
  );
}
