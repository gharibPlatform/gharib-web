import { useState, useEffect, useRef } from "react";
import { X, User, CheckCircle, XCircle } from "lucide-react";

export const SuccessModal = ({ username, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-green-500/30 shadow-2xl max-w-lg w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--w-color)] mb-3">
            Friend Request Sent!
          </h3>
          <p className="text-[var(--g-color)] text-lg mb-8">
            You've sent a friend request to{" "}
            <span className="text-green-400 font-semibold text-xl">
              @{username}
            </span>
          </p>
          <p className="text-[var(--g-color)] mb-8">
            They'll receive a notification and can accept your request to become
            friends.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity w-full text-lg"
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
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--r-color)]/30 shadow-2xl max-w-lg w-full p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-[var(--r-color)]/20 rounded-full flex items-center justify-center mb-6">
            <XCircle size={48} className="text-[var(--r-color)]" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--w-color)] mb-3">
            Couldn't Send Request
          </h3>
          <div className="bg-[var(--dark-color)] p-6 rounded-xl border border-[var(--r-color)]/20 mb-8 w-full">
            <p className="text-[var(--g-color)] text-lg">
              {error || "Failed to send friend request. Please try again."}
            </p>
          </div>
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="px-6 py-4 bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium hover:bg-[var(--main-color-hover)] transition-colors flex-1 text-lg"
            >
              Cancel
            </button>
            <button
              onClick={onRetry}
              className="px-6 py-4 bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex-1 text-lg"
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
        className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--g-color)] border-opacity-30 shadow-2xl max-w-lg w-full"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-[var(--g-color)] border-opacity-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-xl flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--w-color)]">
                  Add Brother
                </h2>
                <p className="text-[var(--g-color)] text-lg mt-2">
                  Enter username to send friend request
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
                <div className="w-8 h-8 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <User size={18} className="text-[var(--w-color)]" />
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
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] text-lg rounded-xl border-2 py-4 px-4 transition-all ${
                    error
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)] border-opacity-30"
                  }`}
                  placeholder="Enter username (e.g., brother123)..."
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {error && (
                <div className="mt-4 p-4 bg-[var(--r-color)]/10 border border-[var(--r-color)]/20 rounded-xl">
                  <p className="text-[var(--r-color)] text-lg">{error}</p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-[var(--g-color)] border-opacity-20">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-[var(--w-color)] text-lg bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] rounded-xl border border-[var(--g-color)] border-opacity-30 font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!username.trim() || isLoading}
              className={`px-8 py-4 text-white text-lg rounded-xl font-medium flex items-center gap-3 ${
                isLoading
                  ? "bg-[var(--b-color)]"
                  : "bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] hover:from-[var(--b-color-hover)] hover:to-[var(--bright-b-color)]"
              } ${!username.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Send Friend Request
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
