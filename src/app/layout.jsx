import React from "react";
import "./globals.css";
import "./fonts.css";
import ReactQueryProvider from "../components/ReactQueryProviders";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Gharib",
  description: "This is simple website for Gharib",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className="w-[100vw]" style={{ fontFamily: "cairo, sans-serif" }}>
          <Toaster />
          {children}
        </body>
      </html>
    </ReactQueryProvider>
  );
}
