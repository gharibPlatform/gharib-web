"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const images = ["/Group.svg"];

  return (
    <nav className="h-16 px-6 md:px-16 lg:px-[15%] flex justify-between items-center border-b border-slate-200 top-0 z-[100] bg-white sticky">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image src={images[0]} width={40} height={40} alt="group" />
        </div>
        <span className="text-lg font-semibold text-slate-900 hidden sm:block">Ghareb</span>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-1">
        <Link href="/" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
          Home
        </Link>
        <Link href="/features" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
          Features
        </Link>
        <Link href="/about" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
          About Us
        </Link>
      </div>

      {/* Right buttons (desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <button className="px-5 py-2 text-slate-700 hover:text-slate-900 transition-colors font-medium">
          Get APK
        </button>
        <Link href="/login">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
            Log in
          </button>
        </Link>
      </div>

      {/* Hamburger (mobile) */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-slate-200 flex flex-col py-3 md:hidden">
          <Link href="/" className="px-6 py-3 text-slate-700 hover:bg-slate-50 transition-colors">
            Home
          </Link>
          <Link href="/features" className="px-6 py-3 text-slate-700 hover:bg-slate-50 transition-colors">
            Features
          </Link>
          <Link href="/about" className="px-6 py-3 text-slate-700 hover:bg-slate-50 transition-colors">
            About Us
          </Link>
          <div className="border-t border-slate-200 mt-3 pt-3 px-6 space-y-2">
            <button className="w-full py-2.5 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium">
              Get APK
            </button>
            <Link href="/login" className="block">
              <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                Log in
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};