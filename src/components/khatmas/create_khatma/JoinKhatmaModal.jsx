import {
  X,
  Users,
  BookOpen,
  Calendar,
  Target,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { surahOptions } from "../../../utils/consts/quranSelector";

import QuranRangeSelector from "../create_khatma/QuranRangeSelector";
import FormField from "../create_khatma/FormField";

export default function JoinKhatmaModal({ isOpen, onClose, onJoin, khatma }) {
  const [isLoading, setIsLoading] = useState(false);

  const [personalSettings, setPersonalSettings] = useState({
    startSurah: "",
    startVerse: "",
    endSurah: "",
    endVerse: "",
    personalEndDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && khatma) {
      console.log("Initializing personal settings with khatma:", khatma);

      setPersonalSettings({
        startSurah: khatma.startSurah || "1",
        startVerse: khatma.startVerse || "1",
        endSurah: khatma.endSurah || "114",
        endVerse: khatma.endVerse || "6",
        personalEndDate: khatma.endDate || getDefaultEndDate(),
      });
    }
  }, [isOpen, khatma]);

  const getDefaultEndDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split("T")[0];
  };

  console.log("JoinKhatmaModal mounted with:", { isOpen, khatma });

  if (!isOpen || !khatma) {
    console.log("Modal not rendering because:", {
      isOpen,
      khatmaExists: !!khatma,
    });
    return null;
  }

  const handleRangeChange = (field, value) => {
    setPersonalSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setPersonalSettings((prev) => ({
      ...prev,
      personalEndDate: newDate,
    }));

    if (errors.personalEndDate) {
      setErrors((prev) => ({ ...prev, personalEndDate: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!personalSettings.startSurah)
      newErrors.startSurah = "Start surah is required";
    if (!personalSettings.startVerse)
      newErrors.startVerse = "Start verse is required";
    if (!personalSettings.endSurah)
      newErrors.endSurah = "End surah is required";
    if (!personalSettings.endVerse)
      newErrors.endVerse = "End verse is required";
    if (!personalSettings.personalEndDate)
      newErrors.personalEndDate = "Completion date is required";

    if (personalSettings.startSurah && personalSettings.endSurah) {
      const startSurahNum = parseInt(personalSettings.startSurah);
      const endSurahNum = parseInt(personalSettings.endSurah);

      if (startSurahNum > endSurahNum) {
        newErrors.endSurah = "End surah must come after start surah";
      } else if (
        startSurahNum === endSurahNum &&
        personalSettings.startVerse &&
        personalSettings.endVerse &&
        parseInt(personalSettings.startVerse) >
          parseInt(personalSettings.endVerse)
      ) {
        newErrors.endVerse = "End verse must come after start verse";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const userPersonalSettings = {
        startShareSurah: parseInt(personalSettings.startSurah),
        startShareVerse: parseInt(personalSettings.startVerse),
        endShareSurah: parseInt(personalSettings.endSurah),
        endShareVerse: parseInt(personalSettings.endVerse),
        currentSurah: parseInt(personalSettings.startSurah),
        currentVerse: parseInt(personalSettings.startVerse),
        progress: 0,
        finishDate: new Date(personalSettings.personalEndDate).toISOString(),
        status: "ongoing",
        completed_parts: [],
        max_khatma_participants_to_disable_update: 0,
        khatma_update_timeout: 0,
        groupMembership: 0,
        khatma: khatma.id,
      };

      await onJoin(khatma, userPersonalSettings);

      onClose();
    } catch (error) {
      console.error("Error joining khatma:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDisplayDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate days remaining based on user's personal end date
  const getDaysRemaining = () => {
    try {
      if (!personalSettings.personalEndDate) return 0;
      const endDateObj = new Date(personalSettings.personalEndDate);
      const today = new Date();
      const diffTime = endDateObj - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (error) {
      return 0;
    }
  };

  const daysRemaining = getDaysRemaining();

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
                  Join Khatma
                </h2>
                <p className="text-[var(--g-color)] text-sm mt-1">
                  Set your personal reading plan
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
                  Set Your Personal Plan
                </h3>
                <p className="text-[var(--g-color)] text-sm mt-1">
                  Customize your reading range and timeline for this khatma
                </p>
              </div>
            </div>
          </div>

          {/* Khatma Info Summary */}
          <div className="mb-6 bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[var(--w-color)] font-bold text-lg">
                  {khatma.name}
                </h3>
                <p className="text-[var(--g-color)] text-sm">
                  Original range: {khatma.startSurah}:{khatma.startVerse} -{" "}
                  {khatma.endSurah}:{khatma.endVerse}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--g-color)] border-opacity-30">
                  {khatma.launcher_data?.profile_pic ? (
                    <img
                      src={khatma.launcher_data.profile_pic}
                      alt={khatma.launcher_data.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] flex items-center justify-center">
                      <Users size={14} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-[var(--g-color)] text-sm">
              Created by {khatma.launcher_data?.username || "Anonymous"}
            </div>
          </div>

          {/* Personal Customization Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <BookOpen size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-[var(--w-color)] font-bold">
                  Your Reading Plan
                </h3>
                <p className="text-[var(--g-color)] text-sm">
                  Set your personal reading range
                </p>
              </div>
            </div>

            {/* Personal Quran Range Picker */}
            <div className="mb-6">
              <QuranRangeSelector
                startSurah={personalSettings.startSurah}
                startVerse={personalSettings.startVerse}
                endSurah={personalSettings.endSurah}
                endVerse={personalSettings.endVerse}
                onStartSurahChange={(value) =>
                  handleRangeChange("startSurah", value)
                }
                onStartVerseChange={(value) =>
                  handleRangeChange("startVerse", value)
                }
                onEndSurahChange={(value) =>
                  handleRangeChange("endSurah", value)
                }
                onEndVerseChange={(value) =>
                  handleRangeChange("endVerse", value)
                }
                errors={errors}
                surahOptions={surahOptions}
              />
            </div>

            {/* Personal Completion Date */}
            <FormField
              label="Your Completion Date"
              icon={Calendar}
              error={errors.personalEndDate}
            >
              <div className="relative">
                <input
                  type="date"
                  name="personalEndDate"
                  value={personalSettings.personalEndDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 py-3 px-4 pl-12 transition-all duration-200 ${
                    errors.personalEndDate
                      ? "border-[var(--r-color)] ring-2 ring-[var(--r-color)] ring-opacity-50"
                      : "border-[var(--g-color)] border-opacity-30 hover:border-opacity-50"
                  }`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--g-color)] group-hover:text-[var(--bright-b-color)] transition-colors">
                  <Calendar size={18} />
                </div>
              </div>
            </FormField>

            {/* Personal Timeline Preview */}
            {personalSettings.personalEndDate && (
              <div className="mt-4 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 p-4 rounded-xl border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-purple-500" />
                    <span className="text-[var(--w-color)] font-medium text-sm">
                      Your Personal Timeline
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-[var(--w-color)] font-bold">
                      {daysRemaining} days
                    </div>
                    <div className="text-[var(--g-color)] text-xs">
                      Complete by:{" "}
                      {formatDisplayDate(personalSettings.personalEndDate)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Original Khatma Timeline (for comparison) */}
            <div className="mt-3 bg-gradient-to-r from-[var(--dark-color)] to-[var(--main-color)] p-3 rounded-lg border border-[var(--g-color)] border-opacity-20">
              <div className="flex items-center justify-between">
                <div className="text-[var(--g-color)] text-sm">
                  Original khatma timeline:
                </div>
                <div className="text-right">
                  <div className="text-[var(--g-color)] text-sm">
                    {formatDisplayDate(khatma.endDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Original Khatma Details */}
          {(khatma.intentions || khatma.duaa) && (
            <div className="mb-6">
              <h4 className="text-[var(--w-color)] font-medium text-sm mb-3">
                Original Khatma Details
              </h4>

              {khatma.intentions && (
                <div className="mb-3 bg-[var(--dark-color)] p-3 rounded-lg border border-[var(--g-color)] border-opacity-20">
                  <p className="text-[var(--g-color)] text-xs mb-1">
                    Original Intentions
                  </p>
                  <p className="text-[var(--w-color)] text-sm italic">
                    "{khatma.intentions}"
                  </p>
                </div>
              )}

              {khatma.duaa && (
                <div className="bg-[var(--dark-color)] p-3 rounded-lg border border-[var(--g-color)] border-opacity-20">
                  <p className="text-[var(--g-color)] text-xs mb-1">
                    Original Special Duaa
                  </p>
                  <p className="text-[var(--w-color)] text-sm italic">
                    "{khatma.duaa}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Reminder */}
          <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-green-600/10 rounded-xl border border-emerald-500/20">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Target size={14} className="text-white" />
              </div>
              <div>
                <h4 className="text-[var(--w-color)] font-medium text-sm mb-1">
                  Note About Personal Settings
                </h4>
                <p className="text-[var(--g-color)] text-sm">
                  Your reading range and completion date are personal to you.
                  Other participants will have their own settings. You can track
                  your progress independently.
                </p>
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
              Cancel
            </button>
            <button
              type="button"
              onClick={handleJoin}
              disabled={isLoading}
              className="px-6 py-3 text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Joining...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Join with My Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
