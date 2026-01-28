import SafeHtmlContent from "../../../utils/consts/safeHtmlContent";

export default function RandomVerse({ randomVerse, surahName }) {
  const pageNumberString = randomVerse?.page_number.toString().padStart(3, "0");
  const translation = randomVerse?.translations?.[0]?.text;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main verse card with gradient background matching landing page */}
      <div className="relative group">
        {/* Gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* Main card */}
        <div className="relative bg-gradient-to-br from-white to-indigo-50/30 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-indigo-100/50 hover:shadow-3xl transition-all duration-300">
          
          {/* Arabic text section */}
          <div className="mb-8">
            <div
              style={{ fontFamily: `p${pageNumberString}-v1`, direction: "rtl" }}
              className="flex flex-wrap justify-center text-2xl sm:text-3xl md:text-4xl leading-loose text-gray-800 mb-2"
            >
              {randomVerse.words.map((word, index) => (
                <span
                  key={index}
                  className="px-1 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-200 cursor-pointer"
                >
                  {word.text}
                </span>
              ))}
            </div>
          </div>

          {/* Translation section */}
          {translation && (
            <div className="mb-6">
              <div className="relative">
                {/* Decorative quote background */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 rounded-xl opacity-50"></div>
                
                <div className="relative p-6 rounded-xl border-2 border-amber-200/50">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl text-amber-500/40 leading-none">"</div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-amber-600 font-semibold mb-2">
                        Translation
                      </div>
                      <SafeHtmlContent
                        html={`"${translation}"`}
                        className="text-gray-700 text-base sm:text-lg leading-relaxed"
                      />
                    </div>
                    <div className="text-4xl text-amber-500/40 leading-none rotate-180">"</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Metadata footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t-2 border-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">📖</span>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Surah</div>
                <div className="text-sm font-semibold text-gray-800">{surahName}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="text-center px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                <div className="text-xs text-indigo-600 font-medium mb-1">Verse</div>
                <div className="font-bold text-gray-800">{randomVerse.verse_number}</div>
              </div>
              
              <div className="text-center px-4 py-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                <div className="text-xs text-purple-600 font-medium mb-1">Page</div>
                <div className="font-bold text-gray-800">{randomVerse.page_number}</div>
              </div>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
            <div className="absolute rotate-12 right-0 top-0 h-2 w-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
            <div className="absolute rotate-12 right-2 top-3 h-2 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-4 left-4 w-16 h-16 opacity-20">
            <div className="absolute -rotate-12 left-0 bottom-0 h-2 w-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
            <div className="absolute -rotate-12 left-2 bottom-3 h-2 w-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}