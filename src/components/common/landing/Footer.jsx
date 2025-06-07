import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-black py-8 relative  w-full">
      {/* Black diamond shape at top right */}
      {/* <div className="absolute -top-4 right-24 w-8 h-8 bg-black transform rotate-45"></div> */}
      
      {/* Content container */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
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
            <div className='arab text-black text-[300px] absolute -top-[190px] -left-[50px] z-10 font-[300  ] '>غ</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;