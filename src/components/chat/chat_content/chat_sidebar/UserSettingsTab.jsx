const UserSettingsTab = ({ notificationSettings, setNotificationSettings }) => {
  return (
    <div className="p-5 space-y-6 text-white">
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
};

export default UserSettingsTab;
