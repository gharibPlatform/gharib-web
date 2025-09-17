import { useState, useEffect, useCallback } from "react";
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

import useUserStore from "../../../../stores/userStore";
import useGroupStore from "../../../../stores/groupStore";
import DefaultIcon from "../../icon/DefaultIcon";

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
  const { user } = useUserStore();
  const { groups, fetchGroups, errorGroups, loadingGroups } = useGroupStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setServerTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchGroups();
      console.log("fetching groups");
    }
  }, [isOpen, fetchGroups]);

  useEffect(() => {
    if (groups?.length > 0) {
      console.log("groups are here : ", groups);
    }
  }, [loadingGroups, errorGroups, groups]);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--main-color)] p-6 rounded-lg border border-[var(--g-color)] max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[var(--w-color)] text-xl font-semibold">
            Create New Khatma
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--w-color)] hover:text-[var(--r-color)] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="text-[var(--w-color)] flex items-center mb-2">
              <User size={16} className="mr-2" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-4 pl-10 ${
                errors.name
                  ? "border-[var(--r-color)]"
                  : "border-[var(--g-color)]"
              }`}
              placeholder="Enter khatma name"
            />
            {errors.name && (
              <p className="text-[var(--r-color)] text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Group Selection Field */}
          <div className="relative">
            <label className="text-[var(--w-color)] flex items-center mb-2">
              <Users size={16} className="mr-2" />
              Select Group *
            </label>

            {/* Selected Group Display */}
            <div
              className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-4 flex items-center justify-between cursor-pointer ${
                errors.groupId
                  ? "border-[var(--r-color)]"
                  : "border-[var(--g-color)]"
              }`}
              onClick={() => setShowGroupDropdown(!showGroupDropdown)}
            >
              {selectedGroup ? (
                <div className="flex items-center">
                  {selectedGroup.icon ? (
                    <img
                      src={selectedGroup.icon}
                      alt={selectedGroup.name}
                      className="w-8 h-8 rounded-md object-cover mr-3"
                    />
                  ) : (
                    <div className=" rounded-md flex items-center justify-center mr-3">
                      <DefaultIcon
                        size={20}
                        name={selectedGroup.name}
                        width={8}
                        height={8}
                      />
                    </div>
                  )}
                  <span>{selectedGroup.name}</span>
                </div>
              ) : (
                <span className="text-[var(--w-color)] opacity-70">
                  Select a group
                </span>
              )}
              <svg
                className={`w-4 h-4 transition-transform ${showGroupDropdown ? "rotate-180" : ""}`}
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

            {errors.groupId && (
              <p className="text-[var(--r-color)] text-xs mt-1">
                {errors.groupId}
              </p>
            )}

            {/* Group Dropdown */}
            {showGroupDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-[var(--dark-color)] border border-[var(--g-color)] rounded-md shadow-lg max-h-60 overflow-y-auto">
                {groups?.map((group) => (
                  <div
                    key={group.id}
                    className="flex items-center p-3 hover:bg-[var(--main-color)] cursor-pointer border-b border-[var(--g-color)] last:border-b-0"
                    onClick={() => handleGroupSelect(group)}
                  >
                    {group.icon ? (
                      <img
                        src={group.icon}
                        alt={group.name}
                        className="w-10 h-10 rounded-md object-cover mr-3"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3">
                        <DefaultIcon
                          size={20}
                          name={group.name}
                          width={10}
                          height={10}
                        />
                      </div>
                    )}
                    <div className="text-[var(--w-color)] font-medium">
                      {group.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* End Date Field */}
          <div>
            <label className="text-[var(--w-color)] flex items-center mb-2">
              <Calendar size={16} className="mr-2" />
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-4 pl-10 ${
                errors.endDate
                  ? "border-[var(--r-color)]"
                  : "border-[var(--g-color)]"
              }`}
            />
            {errors.endDate && (
              <p className="text-[var(--r-color)] text-xs mt-1">
                {errors.endDate}
              </p>
            )}
          </div>

          {/* Date and Time Information */}
          <div className="bg-[var(--dark-color)] p-3 rounded-[5px] border border-[var(--g-color)]">
            <div className="flex items-center text-[var(--w-color)] mb-2">
              <Calendar size={14} className="mr-2" />
              <span className="font-medium">Date:</span>
              <span className="ml-2">{formatDate(new Date())} (Today)</span>
            </div>
            <div className="flex items-center text-[var(--w-color)]">
              <Clock size={14} className="mr-2" />
              <span className="font-medium">Time:</span>
              <span className="ml-2">{formatTime(new Date())} (Now)</span>
            </div>
          </div>

          {/* Intentions Field */}
          <div>
            <label className="text-[var(--w-color)] flex items-center mb-2">
              <FileText size={16} className="mr-2" />
              Intentions (Optional)
            </label>
            <textarea
              name="intentions"
              value={formData.intentions}
              onChange={handleChange}
              className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4"
              rows="2"
              placeholder="Your intentions for this khatma"
            ></textarea>
          </div>

          {/* Duaa Field */}
          <div>
            <label className="text-[var(--w-color)] flex items-center mb-2">
              <FileText size={16} className="mr-2" />
              Duaa (Optional)
            </label>
            <textarea
              name="duaa"
              value={formData.duaa}
              onChange={handleChange}
              className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4"
              rows="2"
              placeholder="Special duaa for this khatma"
            ></textarea>
          </div>

          {/* Quran Range Section */}
          <div className="border-t border-[var(--g-color)] pt-4">
            <h3 className="text-[var(--w-color)] font-medium mb-3 flex items-center">
              <BookOpen size={16} className="mr-2" />
              Quran Reading Range
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Start Surah */}
              <div>
                <label className="text-[var(--w-color)] text-sm block mb-1">
                  Start Surah *
                </label>
                <input
                  type="number"
                  name="startSurah"
                  value={formData.startSurah}
                  onChange={handleChange}
                  min="1"
                  max="114"
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-3 ${
                    errors.startSurah
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)]"
                  }`}
                  placeholder="Surah #"
                />
                {errors.startSurah && (
                  <p className="text-[var(--r-color)] text-xs mt-1">
                    {errors.startSurah}
                  </p>
                )}
              </div>

              {/* Start Verse */}
              <div>
                <label className="text-[var(--w-color)] text-sm block mb-1">
                  Start Verse *
                </label>
                <input
                  type="number"
                  name="startVerse"
                  value={formData.startVerse}
                  onChange={handleChange}
                  min="1"
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-3 ${
                    errors.startVerse
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)]"
                  }`}
                  placeholder="Verse #"
                />
                {errors.startVerse && (
                  <p className="text-[var(--r-color)] text-xs mt-1">
                    {errors.startVerse}
                  </p>
                )}
              </div>
            </div>

            <div className="text-[var(--w-color)] text-center my-2">to</div>

            <div className="grid grid-cols-2 gap-3">
              {/* End Surah */}
              <div>
                <label className="text-[var(--w-color)] text-sm block mb-1">
                  End Surah *
                </label>
                <input
                  type="number"
                  name="endSurah"
                  value={formData.endSurah}
                  onChange={handleChange}
                  min="1"
                  max="114"
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-3 ${
                    errors.endSurah
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)]"
                  }`}
                  placeholder="Surah #"
                />
                {errors.endSurah && (
                  <p className="text-[var(--r-color)] text-xs mt-1">
                    {errors.endSurah}
                  </p>
                )}
              </div>

              {/* End Verse */}
              <div>
                <label className="text-[var(--w-color)] text-sm block mb-1">
                  End Verse *
                </label>
                <input
                  type="number"
                  name="endVerse"
                  value={formData.endVerse}
                  onChange={handleChange}
                  min="1"
                  className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border py-2 px-3 ${
                    errors.endVerse
                      ? "border-[var(--r-color)]"
                      : "border-[var(--g-color)]"
                  }`}
                  placeholder="Verse #"
                />
                {errors.endVerse && (
                  <p className="text-[var(--r-color)] text-xs mt-1">
                    {errors.endVerse}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[var(--w-color)] bg-[var(--g-color)] rounded-[4px] hover:opacity-90 transition-opacity flex items-center"
            >
              <X size={16} className="mr-1" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] hover:bg-[var(--b-color-hover)] disabled:opacity-50 transition-colors flex items-center"
            >
              <CheckCircle size={16} className="mr-1" />
              Create Khatma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
