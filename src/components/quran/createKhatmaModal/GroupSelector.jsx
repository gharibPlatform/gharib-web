// components/CreateKhatmaModal/GroupSelector.jsx
import { useState, useRef, useEffect } from "react";
import { Users } from "lucide-react";
import DefaultIcon from "../../common/icon/DefaultIcon";
import FormField from "./FormField";

export default function GroupSelector({
  value,
  onChange,
  error,
  groups,
  loadingGroups,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <FormField label="Select Group" icon={Users} error={error}>
      <div className="relative" ref={dropdownRef}>
        <div
          className={`w-full bg-[var(--dark-color)] text-[var(--w-color)] rounded-xl border-2 py-3 px-4 cursor-pointer transition-all duration-200 group-hover:border-opacity-50 ${
            error
              ? "border-[var(--r-color)] ring-2 ring-[var(--r-color)] ring-opacity-50"
              : "border-[var(--g-color)] border-opacity-30"
          }`}
          onClick={handleClick}
        >
          <div className="flex items-center justify-between">
            {value ? (
              <div className="flex items-center">
                {value.icon ? (
                  <img
                    src={value.icon}
                    alt={value.name}
                    className="w-8 h-8 rounded-lg object-cover mr-3 shadow-md"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--bright-b-color)] to-[var(--b-color)] rounded-lg flex items-center justify-center mr-3 shadow-md">
                    <DefaultIcon
                      size={16}
                      name={value.name}
                      className="text-white"
                    />
                  </div>
                )}
                <span className="font-medium">{value.name}</span>
              </div>
            ) : (
              <span className="text-[var(--g-color)]">
                Choose a group for this khatma
              </span>
            )}
            <div
              className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
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

        {showDropdown && (
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
                onClick={() => {
                  onChange(group);
                  setShowDropdown(false);
                }}
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
    </FormField>
  );
}
