"use client"
import React from 'react'
import Image from 'next/image'
import RandomVerse from "../../../components/quran/quranOverview/RandomVerseLanding";
import indexToStringSurah from "../../../utils/consts/indexToStringSurah.json";
import { verseByKey } from "../../../utils/quran/quran";
import { useState, useEffect } from 'react';
export const Main = () => {
  const img = ["/yakra.svg"]
  
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
      console.log("randomVerseKey", randomVerseKey);
      console.log("surahName", surahName);
      const randomVerseData = await verseByKey(randomVerseKey);
      setVerse(randomVerseData);
      setSurahName(surahName);
      setIsLoading(false);
      console.log("randomVerseKey", randomVerseKey);
      console.log("randomVerseData", randomVerseData);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomVerse();
  }, []);
  
  return (
    <main className='poppins overflow-hidden'>
      <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50/30 rounded-full blur-3xl -z-10"></div>
        
        {/* Simple accent shapes */}
        <div className="absolute top-20 right-8 w-24 h-24">
          <div className="absolute rotate-12 right-0 top-12 h-2 w-28 bg-emerald-500/40 rounded-sm"></div>
          <div className="absolute rotate-12 right-4 top-14 h-2 w-20 bg-emerald-500/30 rounded-sm"></div>
        </div>
        <div className="absolute bottom-24 left-8 w-24 h-24">
          <div className="absolute -rotate-12 left-0 bottom-12 h-2 w-28 bg-amber-500/40 rounded-sm"></div>
          <div className="absolute -rotate-12 left-4 bottom-14 h-2 w-20 bg-amber-500/30 rounded-sm"></div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-12 sm:py-16 max-w-7xl relative z-10">
          {/* Hero section */}
          <div className="text-center mb-16 sm:mb-20 relative">
            <div className="space-y-3 mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight text-gray-900">
                Ghareb among people,
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-indigo-700">
                remembered in the heavens.
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 px-4">
                Unite individuals and groups in a shared journey to complete the Quran.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 leading-relaxed max-w-3xl mx-auto">
                Ghareb empowers spiritual growth with features like group recitations, personal tracking tools, 
                focused Ayah sharing, and daily Islamic reminders.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <button className="px-8 py-3 bg-amber-50 border border-amber-300 rounded-lg font-semibold text-base hover:bg-amber-100 hover:shadow-md transition-all duration-200">
                Read Quran
              </button>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-base hover:bg-indigo-700 hover:shadow-md transition-all duration-200">
                Join Ghareb
              </button>
            </div>
          </div>
          <div
            className="pt-20 pb-28 mb-20"
          >
            <div className="max-w-4xl mx-auto px-6">
              {isLoading ? (
                <div className="flex justify-center items-center text-[var(--g-color)]">
                  Loading Verse...
                </div>
              ) : (
                <RandomVerse className='bg-red-500' randomVerse={verse} surahName={surahName} />
              )}
            </div>
          </div>
          
          {/* What is Ghareb section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 px-2">
              What is <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg">Ghareb?</span>
            </h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 min-h-[400px] md:h-[420px] mt-8 border border-gray-200">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-gray-800 mb-6">
                  <span className="text-indigo-600 font-semibold">Ghareb</span> turns your screen time into 
                  meaningful moments by guiding you to 
                  recite and complete the Quran. It nurtures 
                  your soul while empowering the next 
                  generation with Quranic values, fostering a 
                  stronger, more connected society.
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-base hover:bg-indigo-700 transition-colors duration-200">
                    Join Ghareb
                  </button>
                  <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-base hover:border-indigo-600 hover:text-indigo-600 transition-colors duration-200">
                    Log in
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-6xl">📖</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Why choose Ghareb section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 px-2">
              Why choose <span className="bg-amber-400 text-gray-900 px-3 py-1 rounded-lg">Ghareb?</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-md p-6 h-auto sm:h-[340px] md:h-[360px] flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-5 pb-4 border-b border-gray-200">
                  <h3 className="font-bold text-xl sm:text-2xl text-gray-800">Group Khatma</h3>
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-xl">
                    👥
                  </div>
                </div>
                <div className='flex flex-col justify-center flex-1 text-gray-700 space-y-2'>
                  <p className="text-base leading-relaxed">Collaborate with others to complete the Quran together.</p>
                  <p className="text-base leading-relaxed">Divide portions, set a timeframe, and invite as a community, concluding with a heartfelt Dua.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-md p-6 h-auto sm:h-[340px] md:h-[360px] flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-5 pb-4 border-b border-gray-200">
                  <h3 className="font-bold text-xl sm:text-2xl text-gray-800">Personal Tracking</h3>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                    📈
                  </div>
                </div>
                <div className='flex flex-col justify-center flex-1 text-gray-700 space-y-2'>
                  <p className="text-base leading-relaxed">Monitor your Quranic progress, highlight your favorite Ayah, and dive into reflections with Tafsir tools to enhance your understanding.</p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-md p-6 h-auto sm:h-[340px] md:h-[360px] flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-5 pb-4 border-b border-gray-200">
                  <h3 className="font-bold text-xl sm:text-2xl text-gray-800">Daily Reminders</h3>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl">
                    🔔
                  </div>
                </div>
                <div className='flex flex-col justify-center flex-1 text-gray-700 space-y-2'>
                  <p className="text-base leading-relaxed">Stay connected with daily Islamic reminders, Hadith, and inspirational quotes to keep your faith strong and your heart at peace.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quran quote section */}
          <div className="mb-12 sm:mb-16 px-2">
            <p className="text-xl sm:text-2xl md:text-3xl font-light mb-6 text-center text-gray-700">Allah, Exalted is He, said:</p>
            <div className="bg-amber-100 p-6 sm:p-8 rounded-lg max-w-full sm:max-w-[85%] md:max-w-[70%] mx-auto text-center shadow-md border border-amber-200">
              <p className="font-semibold mb-2 text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">"And cooperate in righteousness and piety, but do not cooperate in sin and aggression.</p>
              <p className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed">And fear Allah; indeed, Allah is severe in punishment"</p>
            </div>
            <p className="text-right text-sm sm:text-base mt-3 px-4 text-gray-600">— Al-Ma'idah, verse 2</p>
          </div>
        </div>
        
        {/* Simple dots decoration */}
        <div className="absolute right-8 bottom-24 opacity-40">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-rose-400"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}