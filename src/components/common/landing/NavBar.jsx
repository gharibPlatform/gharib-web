"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="h-16 px-6 md:px-16 lg:px-[15%] flex justify-between items-center border-b border-white/[0.06] top-0 z-[100] sticky"
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="arab font-light"
          style={{ color: "#dc9908", fontSize: "2rem", lineHeight: 1 }}
        >
          غ
        </div>
        <span
          className="text-lg font-semibold"
          style={{ color: "var(--w-color)", fontFamily: "var(--font-cairo)" }}
        >
          Ghareb
        </span>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-1">
        {["Home", "Features", "About Us"].map((item, i) => (
          <Link
            key={i}
            href={
              item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`
            }
            className="px-4 py-2 rounded-lg transition-colors text-sm"
            style={{ color: "var(--lighter-color)" }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--w-color)";
              e.target.style.backgroundColor = "var(--main-color-hover)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--lighter-color)";
              e.target.style.backgroundColor = "transparent";
            }}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Right buttons (desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <Link href="/login">
          <button
            className="px-6 py-2 rounded-lg transition-all font-medium text-sm"
            style={{ backgroundColor: "var(--o-color)", color: "#0a0a0a" }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--o-color-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--o-color)")
            }
          >
            Log in
          </button>
        </Link>
      </div>

      {/* Hamburger (mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: "var(--lighter-color)" }}
        >
          {isOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="absolute top-16 left-0 w-full border-b border-white/[0.06] flex flex-col py-3 md:hidden animate-fade-in"
          style={{ backgroundColor: "var(--secondary-color)" }}
        >
          {["Home", "Features", "About Us"].map((item, i) => (
            <Link
              key={i}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "")}`
              }
              className="px-6 py-3 transition-colors text-sm"
              style={{ color: "var(--lighter-color)" }}
            >
              {item}
            </Link>
          ))}
          <div className="border-t border-white/[0.06] mt-3 pt-3 px-6">
            <Link href="/login" className="block">
              <button
                className="w-full py-2.5 rounded-lg transition-colors font-medium text-sm"
                style={{ backgroundColor: "var(--o-color)", color: "#0a0a0a" }}
              >
                Log in
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
