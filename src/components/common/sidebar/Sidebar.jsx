import ChatButton from "../buttons/ChatButton";
import HomeButton from "../buttons/HomeButton";
import ExploreButton from "../buttons/ExploreButton";
import ProgressButton from "../buttons/ProgressButton";
import TerminologyButton from "../buttons/TerminologyButton";

function Top() {
  return (
    <>
      <div className="inline-block flex-col w-min pt-4">
        <HomeButton />
        <ChatButton />
        <ExploreButton />
        <ProgressButton />
        <TerminologyButton />
      </div>
    </>
  );
}

import Community from "../community/Community";

function SideBar() {
  return (
    <>
      <div className="w-72 fixed h-[var(--height)] left-0 top-14 border-r border-[var(--g-color)] bg-[var(--main-color)] inline-block">
        <Top />
        <div className="mt-2 h-px bg-[var(--g-color)]"></div>
        <Community />
      </div>
    </>
  );
}

export default SideBar;
