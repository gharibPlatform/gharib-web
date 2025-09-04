import useNotificationsStore from "@/stores/notificationsStore";
import { useEffect } from "react";

export default function Notifications() {
  const {
    notifications,
    fetchNotifications,
    loadingNotifications,
    errorNotifications,
  } = useNotificationsStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("notifications are : ", notifications);
  }, [notifications]);

  return (
    <div className="flex flex-col w-72 max-h-96 bg-[var(--dark-color)] border border-[var(--secondary-color)] rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b border-[var(--secondary-color)]">
        <h2 className="text-lg font-semibold text-white">Notifications</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loadingNotifications ? (
          <div className="p-4 text-[var(--lighter-color)]">
            Loading notifications...
          </div>
        ) : errorNotifications ? (
          <div className="p-4 text-[var(--bright-r-color)]">
            {errorNotifications}
          </div>
        ) : notifications?.length > 0 ? (
          <div>
            {notifications?.map((notification) => (
              <div key={notification.id}></div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-white">No notifications yet</div>
        )}
      </div>
    </div>
  );
}
