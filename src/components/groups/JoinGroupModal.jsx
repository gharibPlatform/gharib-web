import { useState, useEffect, useRef } from "react";
import { Key, X, CheckCircle } from "lucide-react";

const JoinGroupModal = ({ onClose, onSubmit }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter a group code");
      return;
    }

    if (code.trim().length < 6) {
      setError("Please enter a valid group code");
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit(code.trim());
      onClose();
    } catch (err) {
      setError(
        err.response.data.detail || err.message || "Failed to join group"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--g-color)] border-opacity-30 shadow-2xl max-w-md w-full"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-[var(--g-color)] border-opacity-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Key size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--w-color)]">
                  Join Group
                </h2>
                <p className="text-[var(--g-color)] text-lg mt-2">
                  Enter group invite code
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-[var(--g-color)] hover:text-[var(--w-color)] hover:bg-[var(--main-color-hover)] rounded-lg"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="text-[var(--w-color)] text-lg font-medium flex items-center mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Key size={18} className="text-green-400" />
                </div>
                Group Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] text-lg rounded-xl border-2 py-4 px-4 transition-all ${
                    error
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)] border-opacity-30"
                  }`}
                  placeholder="Enter group code (e.g., ABCD1234)..."
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              <p className="text-[var(--g-color)] text-sm mt-3">
                Get the code from the group admin or from an invite link
              </p>

              {error && (
                <div className="mt-4 p-4 bg-[var(--r-color)]/10 border border-[var(--r-color)]/20 rounded-xl">
                  <p className="text-[var(--r-color)] text-lg">{error}</p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-[var(--g-color)] border-opacity-20">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-[var(--w-color)] bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!code.trim() || isLoading}
                className={`px-8 py-3 text-white text-lg rounded-xl font-medium flex items-center gap-3 ${
                  isLoading
                    ? "bg-green-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
                } ${!code.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Joining...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Join Group
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupModal;
