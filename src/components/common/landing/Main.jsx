import React from 'react'
import Image from 'next/image'

export const Main = () => {
  const img= ["/yakra.svg"]
  return (
    <main className='mt-8 poppins overflow-hidden'>
      <div className="relative min-h-screen bg-[#fff] text-gray-900">
        {/* Green accent shapes */}
        <div className="absolute top-0 right-0 w-28 h-28">
          <div className="absolute rotate-12 right-0 top-12 h-8 w-32 bg-green-500"></div>
          <div className="absolute rotate-12 right-4 top-16 h-8 w-24 bg-green-500"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <div className="absolute -rotate-12 left-0 bottom-12 h-8 w-32 bg-green-500"></div>
          <div className="absolute -rotate-12 left-4 bottom-16 h-8 w-24 bg-green-500"></div>
        </div>
        
        {/* Main content */}
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
          {/* Hero section */}
          <div className="text-center mb-12 sm:mb-16 relative gradient-background1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-[800] mb-2 leading-tight">
              Ghareb among people,
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-[800] mb-4 sm:mb-6 leading-tight">
              remembered in the heavens.
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 font-light px-2">
              Unite individuals and groups in a shared journey to complete the Quran.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 font-light px-2 leading-relaxed">
              Ghareb empowers spiritual growth with features like group recitations, personal tracking tools, 
              focused Ayah sharing, and daily Islamic reminders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <button className="px-6 py-3 bg-amber-50 border border-amber-900/20 rounded-md font-medium text-sm sm:text-base">
                Read Quran
              </button>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium text-sm sm:text-base">
                Join Ghareb
              </button>
            </div>
          </div>
          
          {/* What is Ghareb section */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">
              What is <span className="bg-indigo-600 text-white px-2 py-1 rounded">Ghareb ?</span>
            </h2>
            
            <div className="bg-white rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.3)] p-4 sm:px-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 min-h-[350px] sm:min-h-[400px] md:h-[400px] mt-8 sm:mt-16">
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-4 sm:mt-6 md:mt-10 leading-relaxed">
                  <span className="text-indigo-600">Ghareb</span> turns your screen time into 
                  meaningful moments by guiding you to 
                  recite and complete the Quran. It nurtures 
                  your soul while empowering the next 
                  generation with Quranic values, fostering a 
                  stronger, more connected society.
                </h3>
                <div className="mt-6 sm:mt-8 md:mt-[3rem] flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-[2rem]">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">Join Ghareb</button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">Log in</button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
                <Image src={img[0]} alt='person' width={500} height={300} className='w-full max-w-[400px] sm:max-w-[500px] h-auto'/>
              </div>
            </div>
          </div>
          
          {/* Why choose Ghareb section */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">
              Why choose <span className="bg-amber-400 text-gray-900 px-2 py-1 rounded">Ghareb ?</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-[8rem] mt-6 sm:mt-8 md:mt-[4rem] text-[#444444]">
              {/* Card 1 */}
              <div className="gradient-background1 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.3)] p-4 sm:p-6 h-auto sm:h-[320px] md:h-[360px] flex flex-col">
                <div className="flex justify-between items-start mb-4 border-b border-[#444444] pb-3 sm:pb-5">
                  <h3 className="font-bold text-xl sm:text-2xl">Group Khatma</h3>
                  <span className="text-gray-600 text-xl sm:text-2xl">👥</span>
                </div>
                <div className='flex flex-col justify-center flex-1 text-base sm:text-lg md:text-xl'>
                  <p className="mb-2">Collaborate with others to complete the Quran together.</p>
                  <p className="mb-2">Divide portions, set a timeframe, and invite as a community, concluding with a heartfelt Dua.</p>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="gradient-background1 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.3)] p-4 sm:p-6 h-auto sm:h-[320px] md:h-[360px] flex flex-col">
                <div className="flex justify-between items-start mb-4 border-b border-[#444444] pb-3 sm:pb-5">
                  <h3 className="font-bold text-xl sm:text-2xl">Personal Tracking</h3>
                  <span className="text-gray-600 text-xl sm:text-2xl">📈</span>
                </div>
                <div className='flex flex-col justify-center flex-1 text-base sm:text-lg md:text-xl'>
                  <p className="mb-2">Monitor your Quranic progress, highlight your favorite Ayah, and dive into reflections with Tafsir tools to enhance your understanding.</p>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="gradient-background1 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.3)] p-4 sm:p-6 h-auto sm:h-[320px] md:h-[360px] flex flex-col">
                <div className="flex justify-between items-start mb-4 border-b border-[#444444] pb-3 sm:pb-5">
                  <h3 className="font-bold text-xl sm:text-2xl">Daily Reminders</h3>
                  <span className="text-gray-600 text-xl sm:text-2xl">🔔</span>
                </div>
                <div className='flex flex-col justify-center flex-1 text-base sm:text-lg md:text-xl'>
                  <p className="mb-2">Stay inspired and connected every day with beautifully crafted reminders that touch your heart, motivate your soul, and guide you closer to the Quran.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quran quote section */}
          <div className="mb-8 sm:mb-12 px-2">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 md:mb-[5rem] text-center">Allah, Exalted is He, said:</p>
            <div className="bg-[#EAB65C] p-4 sm:p-6 rounded-lg max-w-full sm:max-w-[80%] md:max-w-[60%] mx-auto text-center">
              <p className="font-semibold mb-1 text-sm sm:text-base md:text-lg">" And cooperate in righteousness and piety, but do not cooperate in sin and aggression.</p>
              <p className="font-semibold text-sm sm:text-base md:text-lg">And fear Allah; indeed, Allah is severe in punishment "</p>
            </div>
            <p className="text-right text-xs sm:text-sm mt-2 px-4">Al-Ma'idah, verse 2</p>
          </div>
        </div>
        
        {/* Dots decoration */}
        <div className="absolute right-4 bottom-16">
          <div className="grid grid-cols-2 gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-red-400"></div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}