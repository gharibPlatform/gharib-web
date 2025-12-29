import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  User,
  BookOpen,
  FileText,
  X,
  CheckCircle,
  Users,
} from "lucide-react";

import useUserStore from "../../../stores/user/userStore";
import useGroupStore from "../../../stores/group/groupStore";
import DefaultIcon from "../../common/icon/DefaultIcon";
import indexToString from "../../../../indexToStringSurah.json";

export default function CreateKhatmaModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    endDate: "",
    startSurah: "",
    startVerse: "",
    endSurah: "",
    endVerse: "",
    intentions: "",
    duaa: "",
    groupId: "",
  });

  const [errors, setErrors] = useState({});
  const [serverTime, setServerTime] = useState(new Date());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [showStartSurahDropdown, setShowStartSurahDropdown] = useState(false);
  const [showEndSurahDropdown, setShowEndSurahDropdown] = useState(false);

  const { user } = useUserStore();
  const { groups, fetchGroups, errorGroups, loadingGroups } = useGroupStore();

  // Refs for dropdown containers
  const groupDropdownRef = useRef(null);
  const startSurahDropdownRef = useRef(null);
  const endSurahDropdownRef = useRef(null);

  const surahOptions = Object.entries(indexToString).map(([number, data]) => ({
    number: parseInt(number),
    name: data.name,
    verses: data.verses,
  }));

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        groupDropdownRef.current &&
        !groupDropdownRef.current.contains(event.target)
      ) {
        setShowGroupDropdown(false);
      }
      if (
        startSurahDropdownRef.current &&
        !startSurahDropdownRef.current.contains(event.target)
      ) {
        setShowStartSurahDropdown(false);
      }
      if (
        endSurahDropdownRef.current &&
        !endSurahDropdownRef.current.contains(event.target)
      ) {
        setShowEndSurahDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchGroups();
    }
  }, [isOpen, fetchGroups]);

  // Close all dropdowns when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowGroupDropdown(false);
      setShowStartSurahDropdown(false);
      setShowEndSurahDropdown(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleGroupSelect = (group) => {
    setFormData((prev) => ({
      ...prev,
      groupId: group.id,
    }));
    setSelectedGroup(group);
    setShowGroupDropdown(false);

    // Clear group error if any
    if (errors.groupId) {
      setErrors((prev) => ({ ...prev, groupId: "" }));
    }
  };

  const handleSurahSelect = (surahNumber, isStartSurah = true) => {
    const fieldName = isStartSurah ? "startSurah" : "endSurah";
    const verseFieldName = isStartSurah ? "startVerse" : "endVerse";

    setFormData((prev) => ({
      ...prev,
      [fieldName]: surahNumber.toString(),
      [verseFieldName]: "1", // Reset to first verse
    }));

    if (isStartSurah) {
      setShowStartSurahDropdown(false);
      if (errors.startSurah) {
        setErrors((prev) => ({ ...prev, startSurah: "" }));
      }
    } else {
      setShowEndSurahDropdown(false);
      if (errors.endSurah) {
        setErrors((prev) => ({ ...prev, endSurah: "" }));
      }
    }
  };

  const getMaxVerse = (surahNumber) => {
    if (!surahNumber) return 1;
    const surah = surahOptions.find((s) => s.number === parseInt(surahNumber));
    return surah ? surah.verses : 1;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.startSurah) newErrors.startSurah = "Start surah is required";
    if (!formData.startVerse) newErrors.startVerse = "Start verse is required";
    if (!formData.endSurah) newErrors.endSurah = "End surah is required";
    if (!formData.endVerse) newErrors.endVerse = "End verse is required";
    if (!formData.groupId) newErrors.groupId = "Group selection is required";

    if (formData.startVerse) {
      const maxStartVerse = getMaxVerse(formData.startSurah);
      if (parseInt(formData.startVerse) > maxStartVerse) {
        newErrors.startVerse = `Maximum verse for this surah is ${maxStartVerse}`;
      }
    }

    if (formData.endVerse) {
      const maxEndVerse = getMaxVerse(formData.endSurah);
      if (parseInt(formData.endVerse) > maxEndVerse) {
        newErrors.endVerse = `Maximum verse for this surah is ${maxEndVerse}`;
      }
    }

    if (formData.startSurah && formData.endSurah) {
      const startSurahNum = parseInt(formData.startSurah);
      const endSurahNum = parseInt(formData.endSurah);

      if (startSurahNum > endSurahNum) {
        newErrors.endSurah = "End surah must come after start surah";
      } else if (
        startSurahNum === endSurahNum &&
        formData.startVerse &&
        formData.endVerse &&
        parseInt(formData.startVerse) > parseInt(formData.endVerse)
      ) {
        newErrors.endVerse = "End verse must come after start verse";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      name: formData.name,
      launcher_data: {
        id: user.id,
        username: user.username,
        profile_pic: user.profile_pic,
      },
      group_id: formData.groupId,
      endDate: formData.endDate,
      startSurah: formData.startSurah,
      startVerse: formData.startVerse,
      endSurah: formData.endSurah,
      endVerse: formData.endVerse,
      intentions: formData.intentions,
      duaa: formData.duaa,
      status: "ongoing",
      created_at: new Date(),
    };

    onSubmit(payload);
    onClose();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSurahName = (surahNumber) => {
    const surah = surahOptions.find((s) => s.number === parseInt(surahNumber));
    return surah ? `${surah.number}. ${surah.name}` : `Surah ${surahNumber}`;
  };

  const handleDropdownClick = (e, dropdownType) => {
    e.stopPropagation();
    if (dropdownType === "group") {
      setShowGroupDropdown(!showGroupDropdown);
      setShowStartSurahDropdown(false);
      setShowEndSurahDropdown(false);
    } else if (dropdownType === "startSurah") {
      setShowStartSurahDropdown(!showStartSurahDropdown);
      setShowGroupDropdown(false);
      setShowEndSurahDropdown(false);
    } else if (dropdownType === "endSurah") {
      setShowEndSurahDropdown(!showEndSurahDropdown);
      setShowGroupDropdown(false);
      setShowStartSurahDropdown(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200">
      <div className="bg-gradient-to-br from-[var(--main-color)] to-[var(--dark-color)] rounded-2xl border border-[var(--g-color)] border-opacity-30 shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
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

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
                <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <User size={14} className="text-[var(--w-color)]" />
                </div>
                Khatma Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 py-3 px-4 pl-12 transition-all duration-200 focus:ring-2 focus:ring-[var(--bright-b-color)] focus:border-transparent ${
                    errors.name
                      ? "border-[var(--r-color)] ring-2 ring-[var(--r-color)] ring-opacity-50"
                      : "border-[var(--g-color)] border-opacity-30 hover:border-opacity-50"
                  }`}
                  placeholder="Enter a meaningful name..."
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--g-color)] group-hover:text-[var(--bright-b-color)] transition-colors">
                  <User size={18} />
                </div>
              </div>
              {errors.name && (
                <p className="text-[var(--r-color)] text-sm mt-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[var(--r-color)] rounded-full"></div>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Group Selection */}
            <div className="group" ref={groupDropdownRef}>
              <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
                <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <Users size={14} className="text-[var(--w-color)]" />
                </div>
                Select Group
              </label>
              <div className="relative">
                <div
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 py-3 px-4 cursor-pointer transition-all duration-200 group-hover:border-opacity-50 ${
                    errors.groupId
                      ? "border-[var(--r-color)] ring-2 ring-[var(--r-color)] ring-opacity-50"
                      : "border-[var(--g-color)] border-opacity-30"
                  }`}
                  onClick={(e) => handleDropdownClick(e, "group")}
                >
                  <div className="flex items-center justify-between">
                    {selectedGroup ? (
                      <div className="flex items-center">
                        {selectedGroup.icon ? (
                          <img
                            src={selectedGroup.icon}
                            alt={selectedGroup.name}
                            className="w-8 h-8 rounded-lg object-cover mr-3 shadow-md"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-lg flex items-center justify-center mr-3 shadow-md">
                            <DefaultIcon
                              size={16}
                              name={selectedGroup.name}
                              className="text-white"
                            />
                          </div>
                        )}
                        <span className="font-medium">
                          {selectedGroup.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[var(--g-color)]">
                        Choose a group for this khatma
                      </span>
                    )}
                    <div
                      className={`transition-transform duration-200 ${showGroupDropdown ? "rotate-180" : ""}`}
                    >
                      <svg
                        className="w-5 h-5 text-[var(--g-color)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {showGroupDropdown && (
                  <div className="absolute z-20 w-full mt-2 bg-[var(--dark-color)] border-2 border-[var(--g-color)] border-opacity-30 rounded-xl shadow-2xl overflow-hidden backdrop-blur-lg max-h-60 overflow-y-auto">
                    {loadingGroups && (
                      <div className="p-4 text-center text-[var(--g-color)]">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--bright-b-color)] border-t-transparent mx-auto mb-2"></div>
                        Loading groups...
                      </div>
                    )}
                    {groups?.map((group) => (
                      <div
                        key={group.id}
                        className="flex items-center p-4 hover:bg-[var(--main-color)] cursor-pointer border-b border-[var(--g-color)] border-opacity-10 last:border-b-0 transition-colors"
                        onClick={() => handleGroupSelect(group)}
                      >
                        {group.icon ? (
                          <img
                            src={group.icon}
                            alt={group.name}
                            className="w-10 h-10 rounded-lg object-cover mr-3 shadow-md"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-lg flex items-center justify-center mr-3 shadow-md">
                            <DefaultIcon
                              size={18}
                              name={group.name}
                              className="text-white"
                            />
                          </div>
                        )}
                        <span className="text-[var(--w-color)] font-medium">
                          {group.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.groupId && (
                <p className="text-[var(--r-color)] text-sm mt-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[var(--r-color)] rounded-full"></div>
                  {errors.groupId}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="group">
              <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
                <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                  <Calendar size={14} className="text-[var(--w-color)]" />
                </div>
                Completion Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 py-3 px-4 pl-12 transition-all duration-200 ${
                    errors.endDate
                      ? "border-[var(--r-color)] ring-2 ring-[var(--r-color)] ring-opacity-50"
                      : "border-[var(--g-color)] border-opacity-30 hover:border-opacity-50"
                  }`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--g-color)] group-hover:text-[var(--bright-b-color)] transition-colors">
                  <Calendar size={18} />
                </div>
              </div>
              {errors.endDate && (
                <p className="text-[var(--r-color)] text-sm mt-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[var(--r-color)] rounded-full"></div>
                  {errors.endDate}
                </p>
              )}
            </div>

            {/* Current Date & Time */}
            <div className="bg-gradient-to-r from-[var(--dark-color)] to-[var(--main-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-[var(--w-color)]">
                  <Calendar size={14} className="text-[var(--w-color)]" />
                  <span className="font-medium">Started:</span>
                  <span>{formatDate(new Date())}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--w-color)]">
                  <Clock size={14} className="text-[var(--w-color)]" />
                  <span className="font-medium">At:</span>
                  <span>{formatTime(new Date())}</span>
                </div>
              </div>
            </div>

            {/* Quran Range Section */}
            <div className="pt-4 border-t border-[var(--g-color)] border-opacity-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[var(--w-color)] font-bold">
                    Quran Range
                  </h3>
                  <p className="text-[var(--g-color)] text-sm">
                    Select reading portion
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Start Range */}
                <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                  <label className="text-[var(--w-color)] font-medium text-sm mb-3 block">
                    Start From
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative" ref={startSurahDropdownRef}>
                      <div
                        className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 cursor-pointer transition-all ${
                          errors.startSurah
                            ? "border-[var(--r-color)]"
                            : "border-[var(--g-color)] border-opacity-30"
                        }`}
                        onClick={(e) => handleDropdownClick(e, "startSurah")}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            {formData.startSurah
                              ? getSurahName(formData.startSurah)
                              : "Surah"}
                          </span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      {showStartSurahDropdown && (
                        <div className="absolute z-20 w-full mt-1 bg-[var(--dark-color)] border-2 border-[var(--g-color)] border-opacity-30 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                          {surahOptions.map((surah) => (
                            <div
                              key={surah.number}
                              className="p-3 hover:bg-[var(--main-color)] cursor-pointer border-b border-[var(--g-color)] border-opacity-10 last:border-b-0 transition-colors"
                              onClick={() =>
                                handleSurahSelect(surah.number, true)
                              }
                            >
                              <div className="text-[var(--w-color)] text-sm">
                                {surah.number}. {surah.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="startVerse"
                        value={formData.startVerse}
                        onChange={handleChange}
                        min="1"
                        max={getMaxVerse(formData.startSurah)}
                        className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 text-sm ${
                          errors.startVerse
                            ? "border-[var(--r-color)]"
                            : "border-[var(--g-color)] border-opacity-30"
                        }`}
                        placeholder="Verse"
                      />
                    </div>
                  </div>
                </div>

                {/* End Range */}
                <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
                  <label className="text-[var(--w-color)] font-medium text-sm mb-3 block">
                    End At
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative" ref={endSurahDropdownRef}>
                      <div
                        className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 cursor-pointer transition-all ${
                          errors.endSurah
                            ? "border-[var(--r-color)]"
                            : "border-[var(--g-color)] border-opacity-30"
                        }`}
                        onClick={(e) => handleDropdownClick(e, "endSurah")}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            {formData.endSurah
                              ? getSurahName(formData.endSurah)
                              : "Surah"}
                          </span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      {showEndSurahDropdown && (
                        <div className="absolute z-20 w-full mt-1 bg-[var(--dark-color)] border-2 border-[var(--g-color)] border-opacity-30 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                          {surahOptions.map((surah) => (
                            <div
                              key={surah.number}
                              className="p-3 hover:bg-[var(--main-color)] cursor-pointer border-b border-[var(--g-color)] border-opacity-10 last:border-b-0 transition-colors"
                              onClick={() =>
                                handleSurahSelect(surah.number, false)
                              }
                            >
                              <div className="text-[var(--w-color)] text-sm">
                                {surah.number}. {surah.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        name="endVerse"
                        value={formData.endVerse}
                        onChange={handleChange}
                        min="1"
                        max={getMaxVerse(formData.endSurah)}
                        className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 text-sm ${
                          errors.endVerse
                            ? "border-[var(--r-color)]"
                            : "border-[var(--g-color)] border-opacity-30"
                        }`}
                        placeholder="Verse"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="space-y-4">
              {/* Intentions */}
              <div className="group">
                <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
                  <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                    <FileText size={14} className="text-[var(--w-color)]" />
                  </div>
                  Intentions{" "}
                  <span className="text-[var(--g-color)] text-sm font-normal ml-2">
                    (Optional)
                  </span>
                </label>
                <textarea
                  name="intentions"
                  value={formData.intentions}
                  onChange={handleChange}
                  className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 border-[var(--g-color)] border-opacity-30 py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-[var(--bright-b-color)] focus:border-transparent resize-none"
                  rows="2"
                  placeholder="Share your spiritual intentions for this khatma..."
                />
              </div>

              {/* Duaa */}
              <div className="group">
                <label className="text-[var(--w-color)] font-medium flex items-center mb-3">
                  <div className="w-6 h-6 bg-[var(--bright-b-color)] bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                    <FileText size={14} className="text-[var(--w-color)]" />
                  </div>
                  Special Duaa{" "}
                  <span className="text-[var(--g-color)] text-sm font-normal ml-2">
                    (Optional)
                  </span>
                </label>
                <textarea
                  name="duaa"
                  value={formData.duaa}
                  onChange={handleChange}
                  className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 border-[var(--g-color)] border-opacity-30 py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-[var(--bright-b-color)] focus:border-transparent resize-none"
                  rows="2"
                  placeholder="Add a special prayer for this journey..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
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
              onClick={handleSubmit}
              className="px-6 py-3 text-white bg-gradient-to-r from-[var(--bright-b-color)] to-[var(--b-color)] hover:from-[var(--b-color-hover)] hover:to-[var(--bright-b-color)] rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Create Khatma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
