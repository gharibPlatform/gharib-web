import { BookOpen, X } from "lucide-react";

export default function ModalHeader({ onClose }) {
  return (
    <div className="relative p-6 pb-4 border-b border-[var(--g-color)] border-opacity-20 bg-gradient-to-r from-[var(--main-color)] to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-[var(--w-color)] text-xl font-bold">
              Create New Khatma
            </h2>
            <p className="text-[var(--g-color)] text-sm mt-1">
              Start a new Quran reading journey
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-[var(--g-color)] hover:text-[var(--w-color)] hover:bg-[var(--main-color-hover)] rounded-lg transition-all duration-200"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
