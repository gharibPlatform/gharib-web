import { useState } from "react";
import { Filter, X } from "lucide-react";

const filterOptions = [
  { value: "active", label: "Active", count: 0 },
  { value: "archived", label: "Archived", count: 0 },
  { value: "large", label: "Large", count: 0 },
  { value: "small", label: "Small", count: 0 },
  { value: "has-khatmas", label: "Has Khatmas", count: 0 },
  { value: "no-khatmas", label: "No Khatmas", count: 0 },
];

export default function GroupFilter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = (filterValue) => {
    const newFilters = selectedFilters.includes(filterValue)
      ? selectedFilters.filter((f) => f !== filterValue)
      : [...selectedFilters, filterValue];

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors border"
        style={{
          color: "var(--lighter-color)",
          background: "var(--input-color)",
          borderColor: "var(--light-color)",
        }}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {selectedFilters.length > 0 && (
          <span
            className="text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            style={{ background: "var(--b-color)" }}
          >
            {selectedFilters.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg z-20 border"
            style={{
              background: "var(--main-color)",
              borderColor: "var(--light-color)",
            }}
          >
            <div
              className="p-3 border-b flex items-center justify-between"
              style={{ borderColor: "var(--light-color)" }}
            >
              <h3 className="font-medium" style={{ color: "var(--w-color)" }}>
                Filters
              </h3>
              {selectedFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm hover:text-blue-300"
                  style={{ color: "var(--b-color)" }}
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
            <div className="p-2 max-h-64 overflow-y-auto">
              {filterOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-var(--main-color-hover)"
                  style={{ color: "var(--w-color)" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(option.value)}
                    onChange={() => toggleFilter(option.value)}
                    className="rounded border-gray-600 text-blue-500 focus:ring-blue-500"
                    style={{
                      borderColor: "var(--light-color)",
                      background: "var(--input-color)",
                    }}
                  />
                  <span
                    className="text-sm flex-1"
                    style={{ color: "var(--w-color)" }}
                  >
                    {option.label}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{
                      color: "var(--lighter-color)",
                      background: "var(--input-color)",
                    }}
                  >
                    {option.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
