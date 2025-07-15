import Footer from "../components/common/landing/Footer";
import { Main } from "../components/common/landing/Main";
import { Navbar } from "../components/common/landing/NavBar";

import "./globals.css";
export default function page() {
  return(
  <div className="bg-[#fff] w-screen">
    <Navbar/>
    <Main/>
    <Footer className='arabic'/>
  </div>
  )
}