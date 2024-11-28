import React from "react";
import { Cairo } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProviders";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cairo = Cairo({
  subsets: ["latin"],
});

export const metadata = {
  title: "Welcome Day",
  description: "Welcome Day project",
};

export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en">
      <head>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />          
        </head>
        <body className={`${cairo.className}`}>
          {children}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </body>
      </html>
    </ReactQueryProvider>
  );
}