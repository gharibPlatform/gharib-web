import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white relative w-full">
      <div className="container mx-auto px-6 py-16">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="space-y-12">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="arab text-white text-5xl font-light">غ</div>
              <div>
                <h3 className="text-xl font-semibold text-white">Ghareb</h3>
                <p className="text-sm text-white mt-0.5">Connecting hearts through the Quran</p>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Company</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-white transition-colors">About</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">Careers</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-4">Connect</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">GitHub</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm text-white mb-2">Get in touch</p>
              <a href="mailto:exemple@gmail.com" className="text-white hover:text-blue-600 transition-colors">
                exemple@gmail.com
              </a>
            </div>

            {/* Footer Bottom */}
            <div className="pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-white">
                <p>© 2024 Ghareb Inc.</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex justify-between items-start pb-12 border-b border-slate-200">
            {/* Left - Brand */}
            <div className="flex items-center gap-4">
              <div className="arab text-white text-7xl font-light">غ</div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Ghareb</h3>
                <p className="text-sm text-white mt-1">Connecting hearts through the Quran</p>
              </div>
            </div>

            {/* Right - Navigation */}
            <div className="flex gap-20 pt-2">
              <div>
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-5">Company</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-white transition-colors">About</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">Careers</a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-5">Connect</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-white hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">Facebook</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">GitHub</a>
                  <a href="#" className="block text-white hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-white uppercase tracking-wider mb-5">Contact</h4>
                <a href="mailto:exemple@gmail.com" className="text-white hover:text-blue-600 transition-colors">
                  exemple@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8">
            <div className="flex justify-between items-center text-sm text-white">
              <p>© 2024 Ghareb Inc. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;