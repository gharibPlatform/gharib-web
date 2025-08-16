import { useState, useEffect } from "react";

export function useLanguageAndRegionSettings() {
  const [language, setLanguage] = useState("english");
  const [region, setRegion] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [initialSettings, setInitialSettings] = useState({
    language: "english",
    region: "",
  });

  const availableLanguages = [
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic (العربية)" },
  ];

  // Load initial settings (API/localStorage later)
  useEffect(() => {
    const savedSettings = {
      language: "english",
      region: "",
    };
    setLanguage(savedSettings.language);
    setRegion(savedSettings.region);
    setInitialSettings(savedSettings);
  }, []);

  useEffect(() => {
    const hasChanged =
      language !== initialSettings.language ||
      region !== initialSettings.region;
    setIsDirty(hasChanged);
  }, [language, region, initialSettings]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleSave = () => {
    console.log("Saving settings:", { language, region });
    setInitialSettings({ language, region });
    setIsDirty(false);
    alert("Settings saved successfully!");
  };

  return {
    language,
    setLanguage,
    region,
    setRegion,
    isDirty,
    availableLanguages,
    handleLanguageChange,
    handleRegionChange,
    handleSave,
  };
}
