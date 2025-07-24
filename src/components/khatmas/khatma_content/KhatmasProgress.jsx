import Circle from "../../common/circle/Circle";
import useKhatmaStore from "../../../stores/khatmasStore";
import PersonalTrackerLine from "./PersonalTrackerLine";

export default function KhatmasProgress() {
  const { khatmaDetails } = useKhatmaStore();

  const personalProgress = 2;
  const groupProgress = 23;
  const timeLeft = 28;
  const orangeDegree = (groupProgress * 360) / 100;
  const blueDegree = (personalProgress * 360) / 100;

  const users = [
    {
      name: "Ahmed Mohamed",
      joined_date: "2024-03-15",
      progress: 45,
    },
    {
      name: "Ahmed Al-Mansoori",
      joined_date: "2024-03-20",
      progress: 72,
    },
    {
      name: "Youssef Khan",
      joined_date: "2024-03-10",
      progress: 18,
    },
    {
      name: "Aymen Al-Farsi",
      joined_date: "2024-03-25",
      progress: 90,
    },
    {
      name: "Omar Abdullah",
      joined_date: "2024-03-05",
      progress: 33,
    },
  ];

  const handleClickVerse = () => {
    //router push verse
  };
  return (
    <div className="flex px-10 w-full h-[calc(100vh-9rem)] gap-4 overflow-hidden">
      <div className="flex flex-col w-2/3 gap-4">
        {/* Personal Progress */}
        <div className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col min-h-0">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-4">Personal Progress</h2>
            <div className="flex flex-col justify-between gap-8">
              <PersonalTrackerLine
                progress={30}
                currentVerse={3}
                wantedVerse={90}
              />
              <h3>Your share is from:</h3>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-grow mt-6">
            <h3 className="text-3xl flex items-center justify-center gap-4">
              <a
                className="hover:text-[var(--b-color)]"
                onClick={() => handleClickVerse()}
                href=""
              >
                Al-Baqarah 13
              </a>{" "}
              to{" "}
              <a
                className="hover:text-[var(--b-color)]"
                onClick={() => handleClickVerse()}
                href=""
              >
                Al-Baqarah 201
              </a>
            </h3>

            <div className="flex items-center justify-between mt-4">
              <h3 className="text-center text-[var(--g-color)]">42 verses</h3>
              <h3 className="text-center text-[var(--g-color)]">
                joined khatma at : date
              </h3>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-semibold mb-4">Members</h2>

          <div className="grid grid-cols-12 gap-4 mb-3 px-2">
            <span className="col-span-6 font-medium">Name</span>
            <span className="col-span-3 font-medium">Joined</span>
            <span className="col-span-3 font-medium text-right">Progress</span>
          </div>

          <div className="overflow-y-auto flex-1 pr-2">
            {users
              .sort((a, b) => b.progress - a.progress)
              .map((user, index) => (
                <div
                  key={`${user.name}-${index}`}
                  className={`grid grid-cols-12 gap-4 py-3 px-2 hover:bg-[var(--darker-color)] rounded-[4px] items-center cursor-pointer ${
                    index % 2 === 0 ? "" : "bg-[var(--secondary-color)]"
                  } ${index == 0 ? "text-[var(--o-color)]" : ""}`}
                >
                  <span className="col-span-6 truncate flex items-center">
                    <div className="flex gap-2 items-center">
                      <span className="w-6 text-right">#{index + 1}</span>
                      <span>{user.name}</span>
                    </div>
                  </span>
                  <span className="col-span-3 text-sm">
                    {new Date(user.joined_date).toLocaleDateString()}
                  </span>
                  <span className="col-span-3 text-right">
                    <span className="font-bold">{user.progress}%</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/3 ">
        <div className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-semibold">Group Progress</h2>
          <div className="flex-grow flex flex-col items-center justify-center gap-4">
            <Circle
              width={180}
              height={180}
              orangeDegree={orangeDegree}
              blueDegree={blueDegree}
              fontSize={20}
              groupProgress={`${groupProgress}%`}
              personalProgress={`${personalProgress}%`}
              backgroundColor={"var(--dark-color)"}
            />

            <h2>Time left: {timeLeft}h</h2>

            {/* legend */}
            <div className="flex gap-4 mb-6">
              <div className="flex gap-2 items-center">
                <div className="bg-[var(--b-color)] w-6 h-6 rounded-[4px]"></div>
                <span>Personal</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[var(--o-color)] w-6 h-6 rounded-[4px]"></div>
                <span>Group</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--secondary-color)] pt-4 mt-auto">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Start verse:</span>
                <span>
                  {khatmaDetails.startSurah} : {khatmaDetails.startVerse}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">End verse:</span>
                <span>
                  {khatmaDetails.endSurah} : {khatmaDetails.endVerse}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Created at:</span>
                <span>
                  {new Date(khatmaDetails.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">End date:</span>
                <span>
                  {khatmaDetails.endDate
                    ? new Date(khatmaDetails.endDate).toLocaleDateString()
                    : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Intention:</span>
                <span className="text-right">
                  {khatmaDetails.intentions || "Not specified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--g-color)]">Launcher:</span>
                <span className="text-right">
                  {khatmaDetails.launcher_data?.username || "Not specified"}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
