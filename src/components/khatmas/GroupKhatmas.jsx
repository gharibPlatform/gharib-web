import Current from "./expandContent/khatmas/Current";
import Finished from "./expandContent/khatmas/Finished";
import Pending from "./expandContent/khatmas/Pending";

export default function GroupKhatmas() {
  return (
    <div className="h-[var(--height)] overflow-y-auto flex flex-col gap-12 pt-6">
      <Current />
      <Pending />
      <Finished />
    </div>
  );
}
