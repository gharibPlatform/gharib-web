"use client"

import Header from "../../components/common/header/Header"
import SettingsSideBar from "../../components/settings/SettingsSideBar"

export default function page() {
  return(
  <div className="bg-[#fff] w-screen">
    <Header />
    <SettingsSideBar />
  </div>
  )
}