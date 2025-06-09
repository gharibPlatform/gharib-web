"use client"

import SettingsSideBar from "@/components/settings/SettingsSideBar"
import AppearanceSettings from "@/components/settings/AppearanceSettings"

export default function page() {
  return(
  <div className="w-screen">
    <SettingsSideBar />
    <AppearanceSettings />
  </div>
  )
}