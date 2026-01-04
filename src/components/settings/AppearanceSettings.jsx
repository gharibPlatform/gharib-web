import { useState, useEffect } from "react";
import { ConfirmationPopup } from "./common/ConfirmationPopup";
import { patchSettings, getSettings } from "../../utils/apiSettings";

export default function AppearanceSettings() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
    actionType: "confirm",
  });

  useEffect(() => {
    loadCurrentMode();
  }, []);

  const loadCurrentMode = async () => {
    try {
      setIsLoading(true);
      const settings = await getSettings();
      console.log("settings", settings);
      if (settings?.data?.mode) {
        setSelectedMode(settings?.data?.mode);
      }
    } catch (error) {
      console.error("Failed to load mode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeClick = (mode) => {
    if (mode === selectedMode) {
      console.log("Mode already selected");
      return;
    }

    setPopupContent({
      title: "Change Theme",
      description: `Are you sure you want to switch to ${mode === "light" ? "Light" : "Dark"} mode?`,
      actionType: "confirm",
    });
    setPopupOpen(true);

    window.pendingModeUpdate = mode;
  };

  const updateMode = async (mode) => {
    try {
      setIsLoading(true);
      await patchSettings({ mode });
      setSelectedMode(mode);
      console.log("Mode updated successfully");
    } catch (error) {
      console.error("Failed to update mode:", error);
      await loadCurrentMode();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupConfirm = async () => {
    if (window.pendingModeUpdate) {
      await updateMode(window.pendingModeUpdate);
      window.pendingModeUpdate = null;
    }
    setPopupOpen(false);
  };

  console.log("selectedMode", selectedMode);

  return (
    <div className="px-8 pt-4 flex flex-col overflow-hidden">
      {/* Use existing ConfirmationPopup component */}
      <ConfirmationPopup
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          window.pendingModeUpdate = null;
        }}
        onConfirm={handlePopupConfirm}
        title={popupContent.title}
        description={popupContent.description}
        actionType={popupContent.actionType}
        isLoading={isLoading}
      />

      {/* Header Section */}
      <div className="flex flex-col pt-4 bg-[var(--secondary-color)]">
        <h1 className="text-white font-medium text-3xl">Theme settings</h1>
        <div className="flex items-center justify-center py-2 w-4/5 pb-4">
          <div className="border-t border-[var(--g-color)] w-full"></div>
        </div>
        <p className="text-[var(--g-color)]">
          Here you can toggle your theme, choose the one you like the most.
        </p>
      </div>

      {/* Themes Section */}
      <div className="flex items-center pl-16 gap-16 pt-24">
        {/* Light Theme */}
        <div
          className={`w-1/3 border rounded-[4px] pb-8 cursor-pointer transition-all duration-200 ${
            selectedMode === "light"
              ? "border-[var(--b-color)] shadow-lg"
              : "border-[var(--g-color)]"
          } ${isLoading && "opacity-70 cursor-not-allowed"}`}
          onClick={() => !isLoading && handleModeClick("light")}
        >
          <div
            className={`p-4 font-medium text-xl border-b text-white ${
              selectedMode === "light"
                ? "bg-[var(--main-color-hover)] border-[var(--b-color)]"
                : "bg-[var(--main-color-hover)] border-[var(--g-color)]"
            }`}
          >
            Light theme
          </div>
          <div className="bg-[var(--main-color)] h-full">
            <p className="text-[var(--g-color)] px-2 pt-3 pb-5">
              This theme will be active when you set the theme to "Light mode"
            </p>
            <div className="bg-white w-11/12 min-h-52 mx-auto rounded-[4px]"></div>
          </div>
        </div>

        {/* Dark Theme */}
        <div
          className={`w-1/3 border rounded-[4px] pb-8 cursor-pointer transition-all duration-200 ${
            selectedMode === "dark"
              ? "border-[var(--b-color)] shadow-lg"
              : "border-[var(--g-color)]"
          } ${isLoading && "opacity-70 cursor-not-allowed"}`}
          onClick={() => !isLoading && handleModeClick("dark")}
        >
          <div
            className={`p-4 font-medium text-xl border-b text-white ${
              selectedMode === "dark"
                ? "bg-[var(--main-color-hover)] border-[var(--b-color)]"
                : "bg-[var(--main-color-hover)] border-[var(--g-color)]"
            }`}
          >
            Dark theme
          </div>
          <div className="bg-[var(--main-color)] h-full">
            <p className="text-[var(--g-color)] px-2 pt-3 pb-5">
              This theme will be active when you set the theme to "Dark mode"
            </p>
            <div className="bg-black w-11/12 min-h-52 mx-auto rounded-[4px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
