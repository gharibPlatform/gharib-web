import ChatButton from "../buttons/ChatButton.jsx";
import ExploreButton from "../buttons/ExploreButton";
import HomeButton from "../buttons/HomeButton";
import HumburgerMenu from "../buttons/HumburgerMenu.jsx";
import NotificationsButton from "../buttons/NotificationsButton.jsx";
import Notifications from "../notifications/Notification.jsx";
import { useState } from "react";

export default function SideBar() {
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);

  const onClickNotifications = () => {
    setIsNotificationsActive((prev) => !prev);
    console.log("clicked");
  };

  return (
    <div className="relative bg-[var(--dark-color)] p-2 flex flex-col gap-6 items-center h-full border-r border-[var(--g-color)] overflow-hidden">
      <HomeButton />
      <ChatButton />
      <ExploreButton />

      <div className="flex flex-col mt-auto gap-6 mb-12">
        <NotificationsButton
          onClick={onClickNotifications}
          isActive={isNotificationsActive}
        />
        <HumburgerMenu />
      </div>

      {isNotificationsActive && (
        <div className="fixed z-50 top-1/3 left-16">
          <Notifications />
        </div>
      )}
    </div>
  );
}
