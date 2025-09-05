// hooks/settings/useQuranSettings.js
import { useState, useEffect } from "react";
import axios from "axios";

export function useQuranSettings() {
  const [settings, setSettings] = useState({
    reciter: "",
    translation: "",
    tafsir: "",
  });
  const [originalSettings, setOriginalSettings] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  const options = {
    reciters: [
      { value: "reciter1", label: "Mishary Rashid Al Afasy" },
      { value: "reciter2", label: "Abu Bakr Al Shatri" },
      { value: "reciter3", label: "Nasser Al Qatami" },
      { value: "reciter4", label: "Yasser Al Dosari" },
      { value: "reciter5", label: "Hani Ar Rifai" },
    ],
    translations: [
      { value: "translation1", label: "English Translation" },
      { value: "translation2", label: "Arabic Translation with Tashkeel" },
      { value: "translation3", label: "Arabic Translation without Tashkeel" },
      { value: "translation4", label: "Bengali Translation" },
      { value: "translation5", label: "Urdu Translation" },
      { value: "translation6", label: "Turkish Translation" },
      { value: "translation7", label: "Uzbek Translation" },
    ],
    tafsirs: [
      { value: "tafsir1", label: "Ibn Kathir" },
      { value: "tafsir2", label: "Maarif Ul Quran" },
      { value: "tafsir3", label: "Tazkirul Quran" },
    ],
  };

  // Fetch current settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/settings/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setSettings(res.data);        // backend should return { reciter, translation, tafsir }
        setOriginalSettings(res.data);
      } catch (err) {
        console.error(
          "Error fetching Quran settings:",
          err.response ? err.response.data : err.message
        );
      }
    };
    fetchSettings();
  }, []);

  // Update settings + check if dirty
  const handleSettingChange = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);

    setIsDirty(
      updated.reciter !== originalSettings.reciter ||
      updated.translation !== originalSettings.translation ||
      updated.tafsir !== originalSettings.tafsir
    );
  };

  // Save settings to backend
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/settings/",
        {
          reciter: settings.reciter,
          translation: settings.translation,
          tafsir: settings.tafsir,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("All Quran settings saved:", res.data);
      setOriginalSettings(settings); // reset dirty check
      setIsDirty(false);
      alert("Quran settings saved successfully!");
    } catch (err) {
      console.error(
        "Error saving Quran settings:",
        err.response ? err.response.data : err.message
      );
      alert("Failed to save settings. Please try again.");
    }
  };

  return {
    settings,
    isDirty,
    options,
    handleSettingChange,
    handleSave,
  };
}
