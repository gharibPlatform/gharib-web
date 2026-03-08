"use client";
import React from "react";
import Link from "next/link";
import RandomVerse from "../../../components/quran/quranOverview/RandomVerse";
import indexToStringSurah from "../../../utils/consts/indexToStringSurah.json";
import { verseByKey } from "../../../utils/quran/quran";
import { useState, useEffect } from "react";

export const Main = () => {
  const [verse, setVerse] = useState(null);
  const [surahName, setSurahName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomVerse = () => {
    const surahIds = Object.keys(indexToStringSurah);
    const randomSurahId = surahIds[Math.floor(Math.random() * surahIds.length)];
    const totalVerses = indexToStringSurah[randomSurahId].verses;
    const randomVerseNumber = Math.floor(Math.random() * totalVerses) + 1;
    const surahName = indexToStringSurah[randomSurahId].name;
    const verseKey = `${randomSurahId}:${randomVerseNumber}`;
    return [verseKey, surahName];
  };

  const fetchRandomVerse = async () => {
    try {
      const [randomVerseKey, surahName] = getRandomVerse();
      const randomVerseData = await verseByKey(randomVerseKey);
      setVerse(randomVerseData);
      setSurahName(surahName);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomVerse();
  }, []);

  return (
    <main
      className="overflow-hidden"
      style={{
        fontFamily: "var(--font-cairo)",
        backgroundColor: "var(--secondary-color)",
        color: "var(--w-color)",
      }}
    >
      <div className="relative min-h-screen">
        {/* Background noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Ambient glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(220,153,8,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(65,115,250,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(220,153,8,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Geometric accent lines */}
        <div className="absolute top-32 right-10 opacity-20 hidden lg:block">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect
              x="1"
              y="1"
              width="60"
              height="60"
              stroke="#dc9908"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              stroke="#dc9908"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
        <div className="absolute bottom-40 left-10 opacity-15 hidden lg:block">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle
              cx="40"
              cy="40"
              r="39"
              stroke="#4173fa"
              strokeWidth="0.5"
              strokeDasharray="3 5"
            />
            <circle
              cx="40"
              cy="40"
              r="25"
              stroke="#4173fa"
              strokeWidth="0.5"
              strokeDasharray="3 5"
            />
          </svg>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl relative z-10">
          {/* Hero section */}
          <div className="text-center mb-24 sm:mb-32 relative">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border"
              style={{
                borderColor: "rgba(220,153,8,0.25)",
                backgroundColor: "rgba(220,153,8,0.07)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--o-color)" }}
              />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "var(--o-color)" }}
              >
                Quran · Community · Growth
              </span>
            </div>

            <div className="space-y-2 mb-8">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                style={{ color: "var(--w-color)" }}
              >
                Ghareb among people,
              </h1>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #dc9908 0%, #f5c842 50%, #dc9908 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                remembered in the heavens.
              </h2>
            </div>

            <div className="max-w-2xl mx-auto mb-10">
              <p
                className="text-base sm:text-lg md:text-xl px-4 leading-relaxed"
                style={{ color: "var(--g-color)" }}
              >
                Unite individuals and groups in a shared journey to complete the
                Quran. Spiritual growth, group recitations, personal tracking,
                and daily reminders — all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
              <Link href="/quran">
                <button
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                  style={{
                    backgroundColor: "var(--main-color)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--lighter-color)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--main-color-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--main-color)")
                  }
                >
                  Read Quran
                </button>
              </Link>
              <Link href="/signup">
                <button
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                  style={{
                    backgroundColor: "var(--o-color)",
                    color: "#0a0a0a",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--o-color-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--o-color)")
                  }
                >
                  Join Ghareb
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 opacity-60">
              {[
                ["114", "Surahs"],
                ["6236", "Ayahs"],
                ["∞", "Rewards"],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--o-color)" }}
                  >
                    {val}
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest mt-1"
                    style={{ color: "var(--g-color)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Random Verse */}
          <div className="mb-24 sm:mb-32">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-px flex-1 max-w-[40px]"
                  style={{ backgroundColor: "rgba(220,153,8,0.3)" }}
                />
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--g-color)" }}
                >
                  Verse of the moment
                </p>
              </div>

              <div
                className="rounded-2xl p-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(220,153,8,0.15), rgba(255,255,255,0.03), rgba(65,115,250,0.08))",
                }}
              >
                <div
                  className="rounded-2xl px-8 py-10 relative overflow-hidden"
                  style={{ backgroundColor: "var(--main-color)" }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% -20%, rgba(220,153,8,0.05) 0%, transparent 60%)",
                    }}
                  />
                  {isLoading ? (
                    <div
                      className="flex items-center justify-center gap-2 py-8"
                      style={{ color: "var(--g-color)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: "var(--o-color)" }}
                      />
                      <span className="text-sm">Loading verse...</span>
                    </div>
                  ) : (
                    <RandomVerse randomVerse={verse} surahName={surahName} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* What is Ghareb section */}
          <div className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div
                className="h-px flex-1 max-w-[40px]"
                style={{ backgroundColor: "rgba(220,153,8,0.4)" }}
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                What is{" "}
                <span
                  className="px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: "rgba(220,153,8,0.12)",
                    color: "var(--o-color)",
                    border: "1px solid rgba(220,153,8,0.2)",
                  }}
                >
                  Ghareb?
                </span>
              </h2>
            </div>

            <div
              className="rounded-2xl p-[1px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(220,153,8,0.2), rgba(65,115,250,0.1), rgba(220,153,8,0.05))",
              }}
            >
              <div
                className="rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 min-h-[320px]"
                style={{ backgroundColor: "var(--main-color)" }}
              >
                <div className="md:w-1/2 text-center md:text-left">
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-8"
                    style={{ color: "var(--lighter-color)" }}
                  >
                    <span
                      className="font-bold"
                      style={{ color: "var(--o-color)" }}
                    >
                      Ghareb
                    </span>{" "}
                    turns your screen time into meaningful moments by guiding
                    you to recite and complete the Quran. It nurtures your soul
                    while empowering the next generation with Quranic values,
                    fostering a stronger, more connected community.
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/signup">
                      <button
                        className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                        style={{
                          backgroundColor: "var(--o-color)",
                          color: "#0a0a0a",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--o-color-hover)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--o-color)")
                        }
                      >
                        Join Ghareb
                      </button>
                    </Link>
                    <Link href="/login">
                      <button
                        className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                        style={{
                          backgroundColor: "var(--secondary-color)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "var(--lighter-color)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(220,153,8,0.4)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      >
                        Log in
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Static Arabic accent — no spinning circle */}
                <div className="md:w-1/2 flex justify-center items-center">
                  <div
                    className="rounded-2xl flex flex-col items-center justify-center gap-4 px-12 py-10"
                    style={{
                      backgroundColor: "var(--secondary-color)",
                      border: "1px solid rgba(220,153,8,0.1)",
                    }}
                  >
                    <div
                      className="arab text-8xl font-light"
                      style={{ color: "var(--o-color)", lineHeight: 1 }}
                    >
                      غ
                    </div>
                    <div
                      className="h-px w-12"
                      style={{ backgroundColor: "rgba(220,153,8,0.3)" }}
                    />
                    <p
                      className="text-xs uppercase tracking-[0.25em]"
                      style={{ color: "var(--g-color)" }}
                    >
                      Ghareb
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why choose Ghareb section */}
          <div className="mb-20 sm:mb-28">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div
                className="h-px flex-1 max-w-[40px]"
                style={{ backgroundColor: "rgba(65,115,250,0.4)" }}
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Why choose{" "}
                <span
                  className="px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: "rgba(65,115,250,0.1)",
                    color: "var(--bright-b-color)",
                    border: "1px solid rgba(65,115,250,0.2)",
                  }}
                >
                  Ghareb?
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {/* Card 1 */}
              <div
                className="rounded-xl p-6 flex flex-col transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: "var(--main-color)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(220,153,8,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                }
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: "rgba(220,153,8,0.1)",
                    border: "1px solid rgba(220,153,8,0.15)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#dc9908"
                    strokeWidth="1.5"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "var(--w-color)" }}
                >
                  Group Khatma
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--g-color)" }}
                >
                  Collaborate with others to complete the Quran together. Divide
                  portions, set a timeframe, and invite your community —
                  concluding with a heartfelt Dua.
                </p>
                <div
                  className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: "var(--o-color)" }}
                >
                  <span>Learn more</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="rounded-xl p-6 flex flex-col transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: "var(--main-color)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(65,115,250,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                }
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: "rgba(65,115,250,0.1)",
                    border: "1px solid rgba(65,115,250,0.15)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4173fa"
                    strokeWidth="1.5"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "var(--w-color)" }}
                >
                  Personal Tracking
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--g-color)" }}
                >
                  Monitor your Quranic progress, highlight your favorite Ayah,
                  and dive into reflections with Tafsir tools to enhance your
                  understanding.
                </p>
                <div
                  className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: "var(--bright-b-color)" }}
                >
                  <span>Learn more</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="rounded-xl p-6 flex flex-col transition-all duration-300 cursor-default"
                style={{
                  backgroundColor: "var(--main-color)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,76,76,0.25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
                }
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: "rgba(255,76,76,0.08)",
                    border: "1px solid rgba(255,76,76,0.15)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff4c4c"
                    strokeWidth="1.5"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "var(--w-color)" }}
                >
                  Daily Reminders
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--g-color)" }}
                >
                  Stay connected with daily Islamic reminders, Hadith, and
                  inspirational quotes to keep your faith strong and your heart
                  at peace.
                </p>
                <div
                  className="mt-auto pt-6 flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: "var(--bright-r-color)" }}
                >
                  <span>Learn more</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quran quote section */}
          <div className="mb-20 sm:mb-28 px-2">
            <div className="relative max-w-3xl mx-auto">
              <div
                className="absolute -top-8 -left-4 text-8xl font-serif opacity-10 select-none"
                style={{ color: "var(--o-color)", lineHeight: 1 }}
              >
                "
              </div>
              <div
                className="rounded-2xl p-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(220,153,8,0.2), rgba(220,153,8,0.05))",
                }}
              >
                <div
                  className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
                  style={{ backgroundColor: "var(--darker-color)" }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(220,153,8,0.06) 0%, transparent 60%)",
                    }}
                  />
                  <p
                    className="text-xs uppercase tracking-widest mb-6"
                    style={{ color: "var(--o-color)", opacity: 0.7 }}
                  >
                    Allah, Exalted is He, said
                  </p>
                  <p
                    className="font-medium text-base sm:text-lg md:text-xl leading-relaxed mb-2"
                    style={{ color: "var(--lighter-color)" }}
                  >
                    "And cooperate in righteousness and piety, but do not
                    cooperate in sin and aggression.
                  </p>
                  <p
                    className="font-medium text-base sm:text-lg md:text-xl leading-relaxed"
                    style={{ color: "var(--lighter-color)" }}
                  >
                    And fear Allah; indeed, Allah is severe in punishment."
                  </p>
                  <div
                    className="mt-6 pt-6 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-sm" style={{ color: "var(--g-color)" }}>
                      Al-Ma'idah, verse 2
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="mb-8 text-center">
            <div
              className="rounded-2xl p-[1px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(220,153,8,0.15), rgba(65,115,250,0.1))",
              }}
            >
              <div
                className="rounded-2xl py-16 px-8"
                style={{ backgroundColor: "var(--main-color)" }}
              >
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "var(--w-color)" }}
                >
                  Begin your journey today
                </h2>
                <p
                  className="text-sm sm:text-base mb-8 max-w-md mx-auto"
                  style={{ color: "var(--g-color)" }}
                >
                  Join thousands connecting with the Quran every day. It's free,
                  it's meaningful.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link href="/signup">
                    <button
                      className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                      style={{
                        backgroundColor: "var(--o-color)",
                        color: "#0a0a0a",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--o-color-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--o-color)")
                      }
                    >
                      Join Ghareb — it's free
                    </button>
                  </Link>
                  <Link href="/quran">
                    <button
                      className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 w-full sm:w-auto"
                      style={{
                        backgroundColor: "var(--secondary-color)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--lighter-color)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.15)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.08)")
                      }
                    >
                      Read Quran
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
