// components/CreateKhatmaModal/ModalFooter.jsx
import { X, CheckCircle } from "lucide-react";

export default function ModalFooter({ onClose, onSubmit }) {
  return (
    <div className="p-6 border-t border-[var(--g-color)] border-opacity-20 bg-gradient-to-t from-[var(--main-color)] to-transparent">
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 text-[var(--w-color)] bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] rounded-xl transition-all duration-200 border border-[var(--g-color)] border-opacity-30 hover:border-opacity-50 font-medium flex items-center gap-2"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="px-6 py-3 text-white bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] hover:from-[var(--b-color-hover)] hover:to-[var(--bright-b-color)] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
        >
          <CheckCircle size={16} />
          Create Khatma
        </button>
      </div>
    </div>
  );
}
