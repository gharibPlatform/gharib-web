import { useState, useEffect, useRef } from "react";
import { X, User, CheckCircle, XCircle } from "lucide-react";

export const SuccessModal = ({ username, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-green-500/30 shadow-2xl max-w-sm w-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-[var(--w-color)] mb-2">
            Request Sent!
          </h3>
          <p className="text-[var(--g-color)] mb-6">
            Friend request sent to{" "}
            <span className="text-green-400 font-medium">@{username}</span>
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity w-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const ErrorModal = ({ error, onClose, onRetry }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--r-color)]/30 shadow-2xl max-w-sm w-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[var(--r-color)]/20 rounded-full flex items-center justify-center mb-4">
            <XCircle size={32} className="text-[var(--r-color)]" />
          </div>
          <h3 className="text-xl font-bold text-[var(--w-color)] mb-2">
            Request Failed
          </h3>
          <p className="text-[var(--g-color)] mb-6">
            {error || "Failed to send friend request. Please try again."}
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium hover:bg-[var(--main-color-hover)] transition-colors flex-1"
            >
              Cancel
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex-1"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AddBrotherRequest({ onClose, onAddBrother }) {
  const [username, setUsername] = useState("");
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

    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setIsLoading(true);

    try {
      await onAddBrother(username.trim());
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err.message || "Failed to add brother");
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
        <div className="p-6 pb-4 border-b border-[var(--g-color)] border-opacity-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-xl flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-[var(--w-color)] text-xl font-bold">
                  Add Brother
                </h2>
                <p className="text-[var(--g-color)] text-sm mt-1">
                  Enter username to send friend request
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[var(--g-color)] hover:text-[var(--w-color)] hover:bg-[var(--main-color-hover)] rounded-lg"
              disabled={isLoading}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
                <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <User size={14} className="text-[var(--w-color)]" />
                </div>
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 py-3 px-4 transition-all ${
                    error
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)] border-opacity-30"
                  }`}
                  placeholder="Enter username..."
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-[var(--r-color)] text-sm mt-2">{error}</p>
              )}
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[var(--g-color)] border-opacity-20">
          <div className="flex justify-end gap-3">
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
              disabled={!username.trim() || isLoading}
              className={`px-6 py-3 text-white rounded-xl font-medium flex items-center gap-2 ${
                isLoading
                  ? "bg-[var(--b-color)]"
                  : "bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)]"
              } ${!username.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Send Request
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
