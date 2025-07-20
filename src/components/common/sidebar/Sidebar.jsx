import ChatButton from "../buttons/ChatButton.jsx";
import ExploreButton from "../buttons/ExploreButton";
import HomeButton from "../buttons/HomeButton";
import HumburgerMenu from "../buttons/HumburgerMenu.jsx";
export default function SideBar() {
  return (
    <div className="bg-[var(--dark-color)] p-2 flex flex-col gap-6 items-center h-screen border-r border-[var(--g-color)]">
      <HomeButton />
      <ChatButton />
      <ExploreButton />
      <div className="mt-auto mb-24">
        <HumburgerMenu />
      </div>
    </div>
  );
}
