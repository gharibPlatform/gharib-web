"use client";
import { useState, useRef, useEffect } from "react";
import { ActionButton } from "../../common/buttons/ActionButton";

const FILTER_OPTIONS = [
  { id: "aborted", label: "Aborted" },
  { id: "completed", label: "Completed" },
  { id: "ongoing", label: "Ongoing" },
  { id: "zero-progress", label: "0 Progress" },
  { id: "currently-in", label: "Currently In" },
  { id: "not-joined", label: "Not Joined Yet" },
];

export default function KhatmaFilter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFilter = (filterId) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((f) => f !== filterId)
      : [...selectedFilters, filterId];

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <ActionButton
        isDirty={true}
        isDisabled={false}
        value={"filter"}
        label="Filter"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-max bg-[var(--main-color)] border border-[var(--g-color)] rounded-md shadow-lg z-10">
          <div className="p-3 border-b border-[var(--g-color)]">
            <h3 className="text-[var(--w-color)] text-sm font-medium">
              Filter by Status
            </h3>
          </div>

          <div className="p-2 grid grid-cols-2 gap-2">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => toggleFilter(option.id)}
                className={`p-2 rounded text-sm transition-colors whitespace-nowrap ${
                  selectedFilters.includes(option.id)
                    ? "border border-blue-500 text-blue-500 bg-blue-900/20"
                    : "border border-[var(--g-color)] text-[var(--w-color)] hover:bg-[var(--darker-color)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {selectedFilters.length > 0 && (
            <div className="p-2 border-t border-[var(--g-color)]">
              <button
                onClick={clearFilters}
                className="w-full text-center text-xs text-[var(--lighter-color)] hover:underline py-1"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
