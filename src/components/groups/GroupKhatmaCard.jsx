import { BookOpen, Calendar, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GroupKhatmaCard({ khatma, groupId }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/khatmas/${khatma.id}`);
  };

  const progressPercentage = Math.round(
    (khatma.progress / khatma.totalPages) * 100
  );

  return (
    <div
      onClick={handleClick}
      className="rounded-lg border p-4 transition-all hover:shadow-lg cursor-pointer group"
      style={{
        background: "var(--main-color)",
        borderColor: "var(--light-color)",
        borderWidth: "1px",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "var(--o-color)" }}
          >
            <BookOpen className="w-5 h-5" style={{ color: "var(--w-color)" }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: "var(--w-color)" }}>
              {khatma.name}
            </h3>
            <span className="text-xs" style={{ color: "var(--lighter-color)" }}>
              Group Khatma
            </span>
          </div>
        </div>
        <ArrowRight
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          style={{ color: "var(--lighter-color)" }}
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: "var(--lighter-color)" }}>Progress</span>
          <span style={{ color: "var(--w-color)" }}>{progressPercentage}%</span>
        </div>
        <div
          className="w-full rounded-full h-2"
          style={{ background: "var(--input-color)" }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              background: "var(--b-color)",
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Users
              className="w-3 h-3"
              style={{ color: "var(--lighter-color)" }}
            />
            <span style={{ color: "var(--lighter-color)" }}>Pages:</span>
          </div>
          <span style={{ color: "var(--w-color)" }}>
            {khatma.progress}/{khatma.totalPages}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Calendar
              className="w-3 h-3"
              style={{ color: "var(--lighter-color)" }}
            />
            <span style={{ color: "var(--lighter-color)" }}>Ends:</span>
          </div>
          <span style={{ color: "var(--w-color)" }}>
            {new Date(khatma.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
