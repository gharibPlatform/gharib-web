import ChatButton from "../buttons/ChatButton.jsx";
import ExploreButton from "../buttons/ExploreButton";
import HomeButton from "../buttons/HomeButton";
import HumburgerMenu from "../buttons/HumburgerMenu.jsx";
import NotificationsButton from "../buttons/NotificationsButton.jsx";
import Notifications from "../notifications/Notification.jsx";
import GroupsButton from "../buttons/GroupsButton";
import QuranButton from "../buttons/QuranButton";
import KhatmasButton from "../buttons/KhatmasButton";
import { useState } from "react";

export default function SideBar() {
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  
  const onClickNotifications = () => {
    setIsNotificationsActive((prev) => !prev);
  };

  return (
    <>
      <div className="hidden md:flex relative bg-[var(--dark-color)] p-2 flex-col gap-6 items-center h-full border-r border-[var(--g-color)] overflow-hidden">
        <HomeButton />
        <ChatButton />
        <GroupsButton />
        <QuranButton />
        <KhatmasButton />
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--dark-color)] border-t border-[var(--g-color)]">
        <div className="flex justify-around items-center py-2 px-4">
          <HomeButton />
          <ChatButton />
          <ExploreButton />
          <GroupsButton />
          <NotificationsButton
            onClick={onClickNotifications}
            isActive={isNotificationsActive}
          />
          <HumburgerMenu />
        </div>
        {isNotificationsActive && (
          <div className="fixed z-50 bottom-16 right-4 w-80 max-w-[calc(100vw-2rem)]">
            <Notifications />
          </div>
        )}
      </div>
    </>
  );
}