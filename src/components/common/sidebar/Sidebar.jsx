import ChatButton from "../buttons/ChatButton.jsx";
import ExploreButton from "../buttons/ExploreButton";
import ProgressButton from "../buttons/ChatButton";
import HomeButton from "../buttons/HomeButton";
import HumburgerMenu from "../buttons/HumburgerMenu.jsx";

export default function SideBar() {
  return (
    <div className="bg-[var(--main-color)] p-2 flex flex-col gap-6 items-center">
      <HomeButton />
      <ChatButton />
      <ExploreButton />
      <div className="mt-auto mb-24">
        <HumburgerMenu />
      </div>
    </div>
  );
}
