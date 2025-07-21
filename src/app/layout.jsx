import React from "react";
import { Cairo } from "next/font/google";
import "./globals.css";
import "./fonts.css"
import ReactQueryProvider from "../components/ReactQueryProviders";
import { Toaster } from "react-hot-toast";

const cairo = Cairo({
  subsets: ["latin"],
});

export const metadata = {
  title: "Gharib",
  description: "This is simple website for Gharib",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={`${cairo.className} w-[100vw] overflow-hidden`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}