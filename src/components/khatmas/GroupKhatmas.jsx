import { ActionButton } from "../common/buttons/ActionButton";
import KhatmaRow from "./khatma_content/KhatmaRow";
import useKhatmaStore from "../../stores/khatmasStore";
import { useRouter } from "next/navigation";

export default function GroupKhatmas() {
  const { userKhatmas } = useKhatmaStore();
  const router = useRouter();

  const handleClick = (khatmaId) => {
    router.push(`/khatmas/${khatmaId}`);
  };

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
            <ActionButton
              isDirty={true}
              isDisabled={false}
              value={"filter"}
              label="Filter"
              onClick={() => console.log("Filter")}
            />
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
            {userKhatmas?.map((khatma, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
