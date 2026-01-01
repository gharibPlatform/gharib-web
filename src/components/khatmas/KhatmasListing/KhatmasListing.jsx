import { ActionButton } from "../../common/buttons/ActionButton";
import KhatmaRow from "../khatma_content/KhatmaRow";
import KhatmaFilter from "./KhatmaFilter";
import useKhatmaStore from "../../../stores/khatamat/khatmasStore";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import CreateKhatmaModal from "../../quran/createKhatmaModal/CreateKhatmaModal";
import { createKhatma } from "../../../utils/khatma/apiKhatma";

export default function KhatmasListing() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [showCreateKhatmaModal, setShowCreateKhatmaModal] = useState(false);

  const router = useRouter();

  const { userKhatmas } = useKhatmaStore();

  const handleClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
  };

  const handleCreateKhatma = (khatmaData) => {
    createKhatma(khatmaData).then((res) => {
      console.log("res", res);
    });
    setShowCreateKhatmaModal(false);
  };
  const filteredKhatmas = useMemo(() => {
    if (!userKhatmas || activeFilters.length === 0) return userKhatmas;

    return userKhatmas.filter((khatma) => {
      const status = khatma.khatma.status?.toLowerCase();
      const progress = khatma.khatma.progress || 0;

      return activeFilters.every((filter) => {
        switch (filter) {
          case "aborted":
            return status === "aborted";
          case "completed":
            return status === "completed";
          case "ongoing":
            return status === "ongoing" || status === "active";
          case "zero-progress":
            return progress === 0;
          default:
            return true;
        }
      });
    });
  }, [userKhatmas, activeFilters]);

  const getEmptyStateMessage = () => {
    if (activeFilters.length > 0) {
      return {
        title: "No matches found",
        subtitle: "Try adjusting your filters to see more khatmas",
      };
    }
    return {
      title: "No khatmas yet",
      subtitle: "Create your first khatma to get started",
    };
  };

  const emptyState = getEmptyStateMessage();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <CreateKhatmaModal
        isOpen={showCreateKhatmaModal}
        onClose={() => setShowCreateKhatmaModal(false)}
        onSubmit={handleCreateKhatma}
      />

      {/* Header Section */}
      <div className="px-6 py-6 border-b border-gray-200/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-semibold mb-2">Khatmas</h1>
            <p className="text-[var(--lighter-color)] text-base">
              View and manage your khatmas
            </p>
          </div>
          <ActionButton
            label="+ Create a new Khatma"
            onClick={() => setShowCreateKhatmaModal(true)}
            className="px-4 py-2"
            isDisabled={false}
            value={"create-khatma"}
            isDirty={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden">
        <div className="bg-[var(--main-color)] rounded-lg shadow-lg flex flex-col h-full overflow-hidden">
          {/* Controls Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/10">
            <div className="flex items-center gap-4">
              <h2 className="text-[var(--w-color)] text-xl font-medium">
                All Khatmas
              </h2>
              {filteredKhatmas?.length > 0 && (
                <span className="text-[var(--lighter-color)] text-sm bg-gray-700/30 px-2 py-1 rounded-full">
                  {filteredKhatmas.length}{" "}
                  {filteredKhatmas.length === 1 ? "khatma" : "khatmas"}
                </span>
              )}
            </div>
            <KhatmaFilter onFilterChange={setActiveFilters} />
          </div>

          {/* Table Header */}
          {filteredKhatmas?.length > 0 && (
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-800/20 border-b border-gray-200/5">
              <h3 className="text-[var(--lighter-color)] text-sm font-medium uppercase tracking-wide">
                Name
              </h3>
              <h3 className="text-[var(--lighter-color)] text-sm font-medium uppercase tracking-wide">
                Group
              </h3>
              <h3 className="text-[var(--lighter-color)] text-sm font-medium uppercase tracking-wide">
                Progress
              </h3>
              <h3 className="text-[var(--lighter-color)] text-sm font-medium uppercase tracking-wide">
                Status
              </h3>
              <h3 className="text-[var(--lighter-color)] text-sm font-medium uppercase tracking-wide">
                End Date
              </h3>
            </div>
          )}

          {/* Table Content */}
          <div className="flex-1 overflow-y-auto">
            {filteredKhatmas?.length > 0 ? (
              <div className="divide-y divide-gray-200/5">
                {filteredKhatmas.map((khatma, index) => (
                  <KhatmaRow
                    key={khatma.khatma.id || index}
                    id={khatma.khatma.id}
                    name={khatma.khatma.name}
                    group={khatma.khatma.group_data.name}
                    progress={khatma.khatma.progress}
                    status={khatma.khatma.status}
                    endDate={khatma.finishDate}
                    onClick={handleClick}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="w-16 h-16 bg-gray-700/30 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-[var(--lighter-color)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-[var(--w-color)] text-lg font-medium mb-2">
                  {emptyState.title}
                </h3>
                <p className="text-[var(--lighter-color)] text-center max-w-md">
                  {emptyState.subtitle}
                </p>
                {activeFilters.length === 0 && (
                  <ActionButton
                    label="Create your first khatma"
                    onClick={() => console.log("Create")}
                    className="mt-4"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
