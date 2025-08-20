import { ActionButton } from "../../common/buttons/ActionButton";
import KhatmaRow from "../khatma_content/KhatmaRow";
import KhatmaFilter from "./KhatmaFilter";
import useKhatmaStore from "../../../stores/khatmasStore";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

export default function KhatmasListing() {
  const { userKhatmas } = useKhatmaStore();
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState([]);

  const handleClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
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
          case "currently-in":
            return khatma.isMember; //will handle later with proper endpoint data
          case "not-joined":
            return !khatma.isMember; 
          default:
            return true;
        }
      });
    });
  }, [userKhatmas, activeFilters]);

  return (
    <div className="h-full flex flex-col overflow-hidden px-12 py-6">
      <div className="flex flex-col">
        <h2 className="text-white text-2xl">Khatmas</h2>
        <p className="text-[var(--lighter-color)] text-sm mb-4">
          View and manage your khatmas
        </p>
      </div>

      <div className="flex flex-1 flex-col bg-[var(--main-color)] rounded-[4px] border border-[var(--g-color)] overflow-hidden shadow-lg">
        <div className="flex flex-row items-center justify-between p-4 border-b border-[var(--g-color)]">
          <h3 className="text-[var(--w-color)] text-xl">All khatmas</h3>
          <div className="flex gap-2">
            <KhatmaFilter onFilterChange={setActiveFilters} />
            <ActionButton label="+" onClick={() => console.log("Create")} />
          </div>
        </div>

        <div className="grid grid-cols-5 items-center border-b border-[var(--g-color)] px-4 py-2">
          <h2 className="text-[var(--lighter-color)]">Name</h2>
          <h2 className="text-[var(--lighter-color)]">Group</h2>
          <h2 className="text-[var(--lighter-color)]">Progress</h2>
          <h2 className="text-[var(--lighter-color)]">Status</h2>
          <h2 className="text-[var(--lighter-color)]">End Date</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="min-h-0">
            {filteredKhatmas?.length > 0 ? (
              filteredKhatmas.map((khatma, index) => (
                <KhatmaRow
                  key={index}
                  id={khatma.khatma.id}
                  name={khatma.khatma.name}
                  group={khatma.khatma.group_data.name}
                  progress={khatma.khatma.progress}
                  status={khatma.khatma.status}
                  endDate={khatma.finishDate}
                  onClick={handleClick}
                />
              ))
            ) : (
              <div className="flex justify-center items-center py-8 text-[var(--lighter-color)]">
                {activeFilters.length > 0
                  ? "No khatmas match all the selected filters"
                  : "No khatmas found"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
