import Circle from "../../common/circle/Circle";
import useKhatmaStore from "../../../stores/khatmasStore";
import PersonalTrackerLine from "./PersonalTrackerLine";

export default function KhatmasProgress() {
  const { khatmaDetails } = useKhatmaStore();
  const percentage = 23;
  const personalProgress = 2;
  const timeLeft = 28;
  const newPercentage = percentage * 2;
  const newPersonalProgress = personalProgress * 2;

  const users = [
    {
      name: "Ahmed Mohamed",
      joined_date: "2024-03-15",
      progress: 45,
    },
    {
      name: "Ahmed Mohamed",
      joined_date: "2024-03-15",
      progress: 45,
    },
    {
      name: "Ahmed Mohamed",
      joined_date: "2024-03-15",
      progress: 45,
    },
    {
      name: "Fatima Al-Mansoori",
      joined_date: "2024-03-20",
      progress: 72,
    },
    {
      name: "Youssef Khan",
      joined_date: "2024-03-10",
      progress: 18,
    },
    {
      name: "Aisha Al-Farsi",
      joined_date: "2024-03-25",
      progress: 90,
    },
    {
      name: "Omar Abdullah",
      joined_date: "2024-03-05",
      progress: 33,
    },
  ];

  return (
    <div className="flex flex-col gap-4 px-10 py-12 w-full overflow-hidden ">
      <div className="flex gap-4 w-full">
        <div
          className="bg-[var(--dark-color)] text-white border border-[var(--g-color)] p-6 flex-1"
          style={{ flex: "2" }}
        >
          <h2 className="text-lg font-semibold mb-4">Personal Progress</h2>
          <div className="flex flex-col justify-between h-[calc(100%-2.5rem)]">
            <PersonalTrackerLine
              progress={30}
              currentVerse={3}
              wantedVerse={90}
            />
          </div>
        </div>

        <div
          className="bg-[var(--dark-color)] text-white border border-[var(--g-color)] p-6 flex-1"
          style={{ flex: "1" }}
        >
          <h2 className="text-lg font-semibold mb-4">Group Progress</h2>
          <div className="flex-grow flex items-center justify-center">
            <Circle
              width={180}
              height={180}
              degree={120}
              fontSize={20}
              text={percentage}
              backgroundColor={"var(--main-color)"}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full overflow-hidden">
        <div
          className="bg-[var(--dark-color)] text-white border border-[var(--g-color)] p-6 flex-1"
          style={{ flex: "2" }}
        >
          <h2 className="text-lg font-semibold mb-4">Members</h2>

          <div className="grid grid-cols-12 gap-4 mb-3 px-2">
            <span className="col-span-6 font-medium">Name</span>
            <span className="col-span-3 font-medium">Joined</span>
            <span className="col-span-3 font-medium text-right">Progress</span>
          </div>

          <div className="max-h-96 overflow-y-auto pr-2">
            {users.map((user) => (
              <div
                key={user.name}
                className="grid grid-cols-12 gap-4 py-3 px-2 hover:bg-[var(--darker-color)] rounded-lg items-center"
              >
                <span className="col-span-6 truncate flex items-center">
                  {user.name}
                </span>
                <span className="col-span-3 text-sm text-[var(--text-light)]">
                  {new Date(user.joined_date).toLocaleDateString()}
                </span>
                <span className="col-span-3 text-right">
                  <span className="font-bold">{user.progress}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-[var(--dark-color)] text-white border border-[var(--g-color)] p-6 flex-1"
          style={{ flex: "1" }}
        >
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
        </div>
      </div>
    </div>
  );
}
