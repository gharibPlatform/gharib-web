import { Bell } from "lucide-react";

export default function NotificationsButton({ onClick, isActive }) {
  return (
    <div
      className={`p-2 hover:bg-[var(--main-color-hover)] rounded-md cursor-pointer transition-all duration-100 ease-in 
          ${isActive ? "bg-[var(--main-color-hover)]" : ""}`}
      onClick={onClick}
    >
      <Bell className="w-8 h-8 text-[var(--w-color)]" />
    </div>
  );
}
