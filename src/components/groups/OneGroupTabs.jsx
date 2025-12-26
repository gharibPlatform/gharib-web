export const GroupTabs = ({
  activeTab,
  onTabChange,
  membersCount,
  khatmasCount,
}) => {
  return (
    <div
      className="px-6 border-b"
      style={{ borderColor: "var(--light-color)" }}
    >
      <div className="flex gap-8">
        <button
          onClick={() => onTabChange("members")}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "members"
              ? "border-var(--b-color) text-var(--b-color)"
              : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
          }`}
          style={{
            borderColor:
              activeTab === "members" ? "var(--b-color)" : "transparent",
            color:
              activeTab === "members"
                ? "var(--b-color)"
                : "var(--lighter-color)",
          }}
        >
          Members ({membersCount})
        </button>
        <button
          onClick={() => onTabChange("groupKhatmas")}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "groupKhatmas"
              ? "border-var(--b-color) text-var(--b-color)"
              : "border-transparent text-var(--lighter-color) hover:text-var(--w-color)"
          }`}
          style={{
            borderColor:
              activeTab === "groupKhatmas" ? "var(--b-color)" : "transparent",
            color:
              activeTab === "groupKhatmas"
                ? "var(--b-color)"
                : "var(--lighter-color)",
          }}
        >
          groupKhatmas ({khatmasCount})
        </button>
      </div>
    </div>
  );
};