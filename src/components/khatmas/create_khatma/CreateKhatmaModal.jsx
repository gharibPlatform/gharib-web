import { useState, useEffect } from "react";
import { User, Calendar, FileText } from "lucide-react";
import useUserStore from "../../../stores/user/userStore";
import useGroupStore from "../../../stores/group/groupStore";
import indexToString from "../../../../indexToStringSurah.json";

import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import FormField from "./FormField";
import GroupSelector from "./GroupSelector";
import QuranRangeSelector from "./QuranRangeSelector";
import DateTimeDisplay from "./DateTimeDisplay";

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
  const [selectedGroup, setSelectedGroup] = useState(null);

  const { user } = useUserStore();
  const { groups, fetchGroups, loadingGroups } = useGroupStore();

  const surahOptions = Object.entries(indexToString).map(([number, data]) => ({
    number: parseInt(number),
    name: data.name,
    verses: data.verses,
  }));

  useEffect(() => {
    if (isOpen) {
      fetchGroups();
    }
  }, [isOpen, fetchGroups]);

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
    if (errors.groupId) {
      setErrors((prev) => ({ ...prev, groupId: "" }));
    }
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

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose} />

      <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <FormField label="Khatma Name" icon={User} error={errors.name}>
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
          </FormField>

          {/* Group Selection */}
          <GroupSelector
            value={selectedGroup}
            onChange={handleGroupSelect}
            error={errors.groupId}
            groups={groups}
            loadingGroups={loadingGroups}
          />

          {/* End Date */}
          <FormField
            label="Completion Date"
            icon={Calendar}
            error={errors.endDate}
          >
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
          </FormField>

          {/* Current Date & Time */}
          <DateTimeDisplay />

          {/* Quran Range Section */}
          <QuranRangeSelector
            startSurah={formData.startSurah}
            startVerse={formData.startVerse}
            endSurah={formData.endSurah}
            endVerse={formData.endVerse}
            onStartSurahChange={(value) =>
              setFormData((prev) => ({ ...prev, startSurah: value }))
            }
            onStartVerseChange={(value) =>
              setFormData((prev) => ({ ...prev, startVerse: value }))
            }
            onEndSurahChange={(value) =>
              setFormData((prev) => ({ ...prev, endSurah: value }))
            }
            onEndVerseChange={(value) =>
              setFormData((prev) => ({ ...prev, endVerse: value }))
            }
            errors={errors}
            surahOptions={surahOptions}
          />

          {/* Optional Fields */}
          <div className="space-y-4">
            {/* Intentions */}
            <FormField label="Intentions" icon={FileText} optional>
              <textarea
                name="intentions"
                value={formData.intentions}
                onChange={handleChange}
                className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 border-[var(--g-color)] border-opacity-30 py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-[var(--bright-b-color)] focus:border-transparent resize-none"
                rows="2"
                placeholder="Share your spiritual intentions for this khatma..."
              />
            </FormField>

            {/* Duaa */}
            <FormField label="Special Duaa" icon={FileText} optional>
              <textarea
                name="duaa"
                value={formData.duaa}
                onChange={handleChange}
                className="w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 border-[var(--g-color)] border-opacity-30 py-3 px-4 transition-all duration-200 focus:ring-2 focus:ring-[var(--bright-b-color)] focus:border-transparent resize-none"
                rows="2"
                placeholder="Add a special prayer for this journey..."
              />
            </FormField>
          </div>
        </form>
      </div>

      <ModalFooter onClose={onClose} onSubmit={handleSubmit} />
    </ModalWrapper>
  );
}
