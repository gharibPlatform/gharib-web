import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-400 text-white relative w-full overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/20"></div>
        <div className="absolute top-12 right-8 w-16 h-16 rounded-full bg-white/10"></div>
        <div className="absolute bottom-8 left-12 w-12 h-12 rounded-full bg-white/15"></div>
      </div>

      {/* Mobile-first design */}
      <div className="relative z-10">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="px-6 py-8">
            {/* Header with Arabic calligraphy */}
            <div className="text-center mb-8">
              <div className="arab text-white text-[80px] font-[300] mb-4 drop-shadow-lg">غ</div>
              <h3 className="text-2xl font-bold mb-2">Ghareb</h3>
              <p className="text-blue-100 text-sm">Connecting hearts through the Quran</p>
            </div>

            {/* Contact Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h4 className="font-bold text-lg mb-4 text-center">Connect With Us</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <a href="#" className="flex flex-col items-center p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <span className="text-2xl mb-2">📷</span>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a href="#" className="flex flex-col items-center p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <span className="text-2xl mb-2">👥</span>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a href="#" className="flex flex-col items-center p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <span className="text-2xl mb-2">🐙</span>
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a href="#" className="flex flex-col items-center p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
                  <span className="text-2xl mb-2">🔗</span>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
              
              {/* Feedback Section */}
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-2">Share your feedback</p>
                <a href="mailto:exemple@gmail.com" className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                  exemple@gmail.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h4 className="font-bold text-lg mb-4 text-center">Our Work</h4>
              <div className="flex justify-center space-x-8">
                <a href="#" className="text-blue-100 hover:text-white transition-colors">About us</a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">Careers</a>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-blue-200 text-xs space-y-1">
              <p>© 2024 Ghareb Inc.</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout (preserved original design) */}
        <div className="hidden md:block py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
            {/* Left column - Contact info */}
            <div className="md:w-1/3 mb-6 md:mb-0">
              <h3 className="font-bold mb-4">Contact info</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-5">📷</span>
                  <span>Instagram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-5">👥</span>
                  <span>Facebook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-5">🐙</span>
                  <span>GitHub</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-5">🔗</span>
                  <span>LinkedIn</span>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm">your feedback here</p>
                <p className="text-xl font-semibold">exemple@gmail.com</p>
              </div>
              <div className="mt-4 text-xs">
                <span>© 2024 Ghareb Inc.</span>
                <span className="mx-2">·</span>
                <span>Privacy</span>
                <span className="mx-2">·</span>
                <span>Terms</span>
              </div>
            </div>
            
            {/* Middle column - Site links */}
            <div className="md:w-1/3 mb-6 md:mb-0 md:border-l border-blue-400 md:pl-8">
              <div className="flex flex-col space-y-2">
                <p className="font-bold mb-2">Our work</p>
                <p>About us</p>
                <p>Careers</p>
              </div>
            </div>
            
            {/* Right column - Arabic calligraphy */}
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <div className="relative">
                <div className='arab text-white text-[100px] sm:text-[200px] md:text-[300px] absolute -top-[60px] sm:-top-[120px] md:-top-[190px] -left-[20px] sm:-left-[40px] md:-left-[50px] z-10 font-[300]'>غ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;