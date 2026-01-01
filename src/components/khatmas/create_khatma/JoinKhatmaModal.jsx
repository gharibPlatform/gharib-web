import {
  X,
  Users,
  BookOpen,
  Calendar,
  Target,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function JoinKhatmaModal({ isOpen, onClose, onJoin, khatma }) {
  const [isLoading, setIsLoading] = useState(false);

  console.log("component mounted");
  console.log("khatma", khatma);
  console.log("isOpen", isOpen);

  if (!isOpen || !khatma) return null;

  const handleJoin = async () => {
    setIsLoading(true);
    try {
      await onJoin(khatma);
      onClose();
    } catch (error) {
      console.error("Error joining khatma:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const getDaysRemaining = () => {
    const endDate = new Date(khatma.endDate);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();

  console.log("component rendered");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--g-color)] border-opacity-30 shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-[var(--g-color)] border-opacity-20 bg-gradient-to-r from-[var(--main-color)] to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-[var(--w-color)] text-xl font-bold">
                  Join Your Khatma
                </h2>
                <p className="text-[var(--g-color)] text-sm mt-1">
                  Start your reading journey now
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
          {/* Success Message */}
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-[var(--w-color)] font-bold">
                  Khatma Created Successfully!
                </h3>
                <p className="text-[var(--g-color)] text-sm mt-1">
                  Your khatma is ready to start. Join now to begin your journey.
                </p>
              </div>
            </div>
          </div>

          {/* Khatma Details */}
          <div className="space-y-6">
            {/* Khatma Name & Creator */}
            <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
              <h3 className="text-[var(--w-color)] font-bold text-lg mb-4">
                {khatma.name}
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--g-color)] border-opacity-30">
                  {khatma.launcher_data?.profile_pic ? (
                    <img
                      src={khatma.launcher_data.profile_pic}
                      alt={khatma.launcher_data.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] flex items-center justify-center">
                      <Users size={18} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[var(--w-color)] font-medium">
                    {khatma.launcher_data?.username || "Anonymous"}
                  </p>
                  <p className="text-[var(--g-color)] text-sm">Created by</p>
                </div>
              </div>
            </div>

            {/* Reading Progress & Timeline */}
            <div className="grid grid-cols-2 gap-4">
              {/* Reading Range */}
              <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen
                    size={16}
                    className="text-[var(--bright-b-color)]"
                  />
                  <span className="text-[var(--w-color)] font-medium text-sm">
                    Reading Range
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-[var(--w-color)] font-bold text-lg">
                    {khatma.startSurah}:{khatma.startVerse}
                  </div>
                  <div className="text-[var(--g-color)] text-xs mt-1">to</div>
                  <div className="text-[var(--w-color)] font-bold text-lg">
                    {khatma.endSurah}:{khatma.endVerse}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={16} className="text-emerald-500" />
                  <span className="text-[var(--w-color)] font-medium text-sm">
                    Timeline
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-[var(--w-color)] font-bold text-lg">
                    {daysRemaining} days
                  </div>
                  <div className="text-[var(--g-color)] text-xs mt-1">
                    remaining
                  </div>
                  <div className="text-[var(--g-color)] text-xs mt-2">
                    Ends: {formatDate(khatma.endDate)}
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Content */}
            {khatma.intentions && (
              <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                <h4 className="text-[var(--w-color)] font-medium text-sm mb-2">
                  Intentions
                </h4>
                <p className="text-[var(--g-color)] text-sm italic">
                  "{khatma.intentions}"
                </p>
              </div>
            )}

            {khatma.duaa && (
              <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                <h4 className="text-[var(--w-color)] font-medium text-sm mb-2">
                  Special Duaa
                </h4>
                <p className="text-[var(--g-color)] text-sm italic">
                  "{khatma.duaa}"
                </p>
              </div>
            )}

            {/* Benefits/Reminder */}
            <div className="p-4 bg-gradient-to-r from-[var(--main-color)] to-[var(--dark-color)] rounded-xl border border-[var(--g-color)] border-opacity-20">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-[var(--w-color)] font-medium text-sm mb-1">
                    Your Spiritual Journey Awaits
                  </h4>
                  <p className="text-[var(--g-color)] text-sm">
                    Join now to track your progress, connect with others, and
                    complete this blessed journey together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[var(--g-color)] border-opacity-20 bg-gradient-to-t from-[var(--main-color)] to-transparent">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-[var(--w-color)] bg-[var(--dark-color)] hover:bg-[var(--main-color-hover)] rounded-xl transition-all duration-200 border border-[var(--g-color)] border-opacity-30 hover:border-opacity-50 font-medium"
            >
              Maybe Later
            </button>
            <button
              type="button"
              onClick={handleJoin}
              disabled={isLoading}
              className="px-6 py-3 text-white bg-[var(--bright-b-color)] hover:bg-[var(--b-color)] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Joining...
                </>
              ) : (
                <>
                  <Users size={16} />
                  Join Khatma
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
