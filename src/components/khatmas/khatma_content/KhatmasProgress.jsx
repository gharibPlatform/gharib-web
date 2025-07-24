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
    <div className="flex flex-col gap-4 px-10 w-full h-min pb-36 max-h-screen overflow-hidden">
      <div className="flex gap-4 w-full">
        {/* personal progress */}
        <div
          className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col"
          style={{ flex: "2" }}
        >
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

        {/* group progress */}
        <div
          className="bg-[var(--dark-color)] text-white p-6 flex-1"
          style={{ flex: "1" }}
        >
          <h2 className="text-lg font-semibold mb-4">Group Progress</h2>
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
            <h2>Time left : 4h 23m</h2>

            {/* legend */}
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <div className="bg-[var(--b-color)] w-6 h-6 rounded-[4px]"></div>
                <span>Personal progress</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[var(--o-color)] w-6 h-6 rounded-[4px]"></div>
                <span>Group progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full h-full overflow-hidden">
        {/* members */}
        <div
          className="bg-[var(--dark-color)] text-white p-6 flex-1 flex flex-col"
          style={{ flex: "2" }}
        >
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

        {/* whatever this is  */}
        <div
          className="bg-[var(--dark-color)] text-white p-6 flex-1"
          style={{ flex: "1" }}
        >
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
        </div>
      </div>
    </div>
  );
}
