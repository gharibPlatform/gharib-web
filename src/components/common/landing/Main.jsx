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

  // Memoized function to get random verse data
  useEffect(() => {
    const fetchRandomVerse = async () => {
      try {
        const surahIds = Object.keys(indexToStringSurah);
        const randomSurahId =
          surahIds[Math.floor(Math.random() * surahIds.length)];
        const totalVerses = indexToStringSurah[randomSurahId].verses;
        const randomVerseNumber = Math.floor(Math.random() * totalVerses) + 1;
        const verseKey = `${randomSurahId}:${randomVerseNumber}`;

        const randomVerseData = await verseByKey(verseKey);
        setVerse(randomVerseData);
        setSurahName(indexToStringSurah[randomSurahId].name);
      } catch (error) {
        console.error("Failed to fetch verse:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomVerse();
  }, []);

  return (
    <main
      className="relative overflow-hidden min-h-screen"
      style={{
        fontFamily: "var(--font-cairo)",
        backgroundColor: "var(--secondary-color)",
        color: "var(--w-color)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-pulse"
          style={{
            background:
              "radial-gradient(circle, var(--o-color) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--bright-b-color) 0%, transparent 70%)",
          }}
        />
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--w-color) 1px, transparent 1px),
                              linear-gradient(90deg, var(--w-color) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 max-w-7xl relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh] mb-24">
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-sm"
              style={{
                borderColor: "rgba(220,153,8,0.3)",
                backgroundColor: "rgba(220,153,8,0.1)",
                color: "var(--o-color)",
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: "var(--o-color)" }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: "var(--o-color)" }}
                ></span>
              </span>
              Quran · Community · Growth
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter">
                Ghareb among people,
              </h1>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter"
                style={{
                  background:
                    "linear-gradient(135deg, #dc9908 0%, #f5c842 50%, #dc9908 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                remembered in the heavens.
              </h1>
            </div>

            <p
              className="text-lg md:text-xl max-w-xl opacity-70"
              style={{ color: "var(--lighter-color)" }}
            >
              Unite with others in a shared journey to complete the Quran.
              Spiritual growth, group recitations, and daily reminders — all in
              one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup">
                <button
                  className="group px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--o-color)",
                    color: "#0a0a0a",
                    boxShadow: "0 0 30px rgba(220, 153, 8, 0.3)",
                  }}
                >
                  Join Ghareb
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
              <Link href="/quran">
                <button
                  className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 border"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--w-color)",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  Read Quran
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Visual - Floating Card */}
          <div className="relative hidden lg:flex justify-center items-center animate-fade-in">
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-amber-500/10 to-blue-500/10 blur-3xl" />
            <div
              className="relative w-full max-w-md p-8 rounded-3xl border backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div className="text-center mb-6">
                <p className="text-xs uppercase tracking-widest opacity-50 mb-4">
                  Verse of the Moment
                </p>
                {isLoading ? (
                  <div className="h-20 flex items-center justify-center opacity-50">
                    Loading...
                  </div>
                ) : (
                  <RandomVerse randomVerse={verse} surahName={surahName} />
                )}
              </div>
              <div className="w-full h-px bg-white/10 my-6" />
              <div className="flex justify-between items-center text-xs opacity-50">
                <span>The Noble Quran</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />{" "}
                  Live
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS BAR --- */}
        <section className="flex justify-center gap-8 md:gap-16 mb-32">
          {[
            { val: "114", label: "Surahs" },
            { val: "6,236", label: "Ayahs" },
            { val: "∞", label: "Rewards" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <p
                className="text-3xl md:text-4xl font-bold transition-transform group-hover:scale-110"
                style={{ color: "var(--o-color)" }}
              >
                {stat.val}
              </p>
              <p className="text-xs uppercase tracking-widest mt-1 opacity-50">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* --- FEATURED SECTION (BENTO GRID) --- */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span style={{ color: "var(--o-color)" }}>Ghareb</span>
              ?
            </h2>
            <p className="opacity-60 max-w-2xl mx-auto">
              Designed to bridge the gap between your daily life and spiritual
              goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            {/* Large Card: Group Khatma */}
            <div
              className="md:col-span-2 relative rounded-3xl p-10 overflow-hidden group transition-all duration-500 hover:-translate-y-2 border"
              style={{
                background:
                  "linear-gradient(135deg, rgba(220,153,8,0.05) 0%, rgba(10,10,10,0.4) 100%)",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: "rgba(220,153,8,0.1)",
                      border: "1px solid rgba(220,153,8,0.2)",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
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
                  <h3 className="text-2xl font-bold mb-3">Group Khatma</h3>
                  <p className="opacity-60 max-w-md">
                    Collaborate with friends, family, or the community to
                    complete the Quran. Divide portions, track progress, and
                    conclude with a collective Dua.
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--o-color)" }}
                >
                  Start a Khatma{" "}
                  <span className="transition-transform group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border border-white/5 opacity-20" />
              <div className="absolute -right-5 -bottom-5 w-40 h-40 rounded-full border border-white/5 opacity-20" />
            </div>

            {/* Small Card: Personal Tracking */}
            <div
              className="relative rounded-3xl p-10 overflow-hidden group transition-all duration-500 hover:-translate-y-2 border flex flex-col justify-between"
              style={{
                background:
                  "linear-gradient(135deg, rgba(65,115,250,0.05) 0%, rgba(10,10,10,0.4) 100%)",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: "rgba(65,115,250,0.1)",
                  border: "1px solid rgba(65,115,250,0.2)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4173fa"
                  strokeWidth="1.5"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Personal Tracking</h3>
                <p className="opacity-60 text-sm">
                  Visualize your journey, bookmark Ayahs, and reflect with
                  Tafsir tools.
                </p>
              </div>
            </div>

            {/* Small Card: Daily Reminders */}
            <div
              className="relative rounded-3xl p-10 overflow-hidden group transition-all duration-500 hover:-translate-y-2 border flex flex-col justify-between"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,76,76,0.05) 0%, rgba(10,10,10,0.4) 100%)",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{
                  background: "rgba(255,76,76,0.1)",
                  border: "1px solid rgba(255,76,76,0.2)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff4c4c"
                  strokeWidth="1.5"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Daily Reminders</h3>
                <p className="opacity-60 text-sm">
                  Stay connected with daily Hadith and inspirational verses.
                </p>
              </div>
            </div>

            {/* Large Card: Quran Quote */}
            <div
              className="md:col-span-2 relative rounded-3xl p-10 overflow-hidden flex flex-col justify-center items-center text-center border"
              style={{
                background: "var(--main-color)",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="text-8xl font-serif absolute top-4 left-8 opacity-10"
                style={{ color: "var(--o-color)" }}
              >
                “
              </span>
              <p className="text-lg md:text-xl font-light italic opacity-80 max-w-2xl relative z-10">
                "And cooperate in righteousness and piety, but do not cooperate
                in sin and aggression. And fear Allah; indeed, Allah is severe
                in punishment."
              </p>
              <div className="mt-6 pt-6 border-t border-white/10 w-24" />
              <p className="text-sm opacity-50 mt-2">Al-Ma'idah, verse 2</p>
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="text-center py-20 relative">
          {/* Decorative glows */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
            Begin your journey today
          </h2>
          <p className="opacity-60 max-w-md mx-auto mb-10 relative z-10">
            Join thousands connecting with the Quran every day. It's free,
            meaningful, and life-changing.
          </p>

          <Link href="/signup">
            <button
              className="px-10 py-5 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--o-color), #f5c842)",
                color: "#000000",
                boxShadow: "0 10px 40px rgba(220, 153, 8, 0.3)",
              }}
            >
              Get Started for Free
            </button>
          </Link>
        </section>
      </div>

      {/* Inline styles for animations (inject into global css for production) */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </main>
  );
};
