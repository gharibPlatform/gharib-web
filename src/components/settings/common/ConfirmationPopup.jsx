import { Popup } from "./Popup";

export function ConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  actionType,
}) {
  const isDangerous = actionType === "delete" || actionType === "block";

  return (
    <Popup isOpen={isOpen} onClose={onClose} actionType={actionType}>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-[var(--g-color)] mb-6">{description}</p>

      <div className="flex justify-end space-x-3">
        {/* Cancel */}
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--g-color)] transition-colors"
        >
          Cancel
        </button>

        {/* Confirm */}
        <button
          onClick={onConfirm} 
          className={`px-4 py-2 rounded text-white border transition-colors ${
            isDangerous
              ? "bg-[var(--r-color)] border-[var(--r-color)] hover:bg-[var(--bright-r-color)] hover:border-[var(--r-color-dark)]"
              : "bg-[var(--main-color-hover-darker)] border-[var(--g-color)] hover:bg-[var(--main-color-hover)]"
          }`}
        >
          {actionType === "delete"
            ? "Delete Forever"
            : actionType === "block"
              ? "Block"
              : "Confirm"}
        </button>
      </div>
    </Popup>
  );
}
