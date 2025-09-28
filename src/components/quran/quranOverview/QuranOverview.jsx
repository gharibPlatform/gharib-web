import RandomVerse from "./RandomVerse";
import { useRouter } from "next/navigation";

export default function QuranOverview({ chapters, randomVerse, surahName }) {
  const router = useRouter();

  const handleClick = (surahId) => {
    router.push(`/quran/chapters/${surahId}`);
  };
  return (
    <div className="min-h-screen" style={{ background: "var(--main-color)" }}>
      <div
        className="pt-20 pb-28 border-b"
        style={{
          background: "var(--dark-color)",
          borderColor: "var(--light-color)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <RandomVerse randomVerse={randomVerse} surahName={surahName} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-light mb-4"
            style={{ color: "var(--w-color)" }}
          >
            Surahs of the Quran
          </h2>
          <div
            className="w-24 h-px mx-auto"
            style={{ background: "var(--g-color)" }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((surah) => (
            <div
              key={surah.id}
              onClick={() => handleClick(surah.id)}
              className="group p-6 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105"
              style={{
                background: "var(--secondary-color)",
                borderColor: "var(--light-color)",
                borderRadius: "var(--radius)",
                fontFamily: "Cairo",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors group-hover:bg-[var(--b-color)]"
                  style={{
                    background: "var(--input-color)",
                    color: "var(--lighter-color)",
                  }}
                >
                  {surah.id}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    surah.revelation_place === "makkah"
                      ? "group-hover:bg-[var(--o-color-hover)]"
                      : "group-hover:bg-[var(--b-color-hover)]"
                  }`}
                  style={{
                    background:
                      surah.revelation_place === "makkah"
                        ? "var(--o-color)"
                        : "var(--b-color)",
                    color: "var(--w-color)",
                    opacity: 0.9,
                  }}
                >
                  {surah.revelation_place}
                </div>
              </div>

              <div className="text-right mb-3">
                <div
                  className="text-3xl font-arabic leading-relaxed transition-colors group-hover:text-[var(--b-color)]"
                  style={{ color: "var(--w-color)", fontFamily: "surahnames"}}
                >
                  {surah.id.toString().padStart(3, "0")}
                  surah 
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <div
                  className="font-medium text-sm transition-colors group-hover:text-[var(--b-color)]"
                  style={{ color: "var(--w-color)" }}
                >
                  {surah.name_simple}
                </div>
                <div
                  className="text-xs transition-colors group-hover:text-[var(--lighter-color)]"
                  style={{ color: "var(--g-color)" }}
                >
                  {surah.translated_name.name}
                </div>
              </div>

              <div
                className="flex items-center justify-between text-xs pt-3 border-t transition-colors group-hover:border-[var(--b-color)]"
                style={{
                  color: "var(--g-color)",
                  borderColor: "var(--light-color)",
                }}
              >
                <span>{surah.verses_count} verses</span>
                <span>
                  pp. {surah.pages[0]}-{surah.pages[1]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
