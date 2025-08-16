export const Popup = ({
  isOpen,
  onClose,
  children,
  actionType = "confirm",
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      <div
        className={`relative bg-[var(--main-color)] rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 ${isOpen ? "scale-100" : "scale-95"}`}
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--g-color)] hover:text-[var(--w-color)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
