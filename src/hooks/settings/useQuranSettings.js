import { useState } from "react";

export function useQuranSettings() {
  const [settings, setSettings] = useState({
    reciter: "Mishary Rashid Al Afasy",
    translation: "english",
    tafsir: "Ibn Kathir",
  });

  const [isDirty, setIsDirty] = useState(false);

  const options = {
    reciters: [
      { value: "Mishary Rashid Al Afasy", label: "Mishary Rashid Al Afasy" },
      { value: "Abu Bakr Al Shatri", label: "Abu Bakr Al Shatri" },
      { value: "Nasser Al Qatami", label: "Nasser Al Qatami" },
      { value: "Yasser Al Dosari", label: "Yasser Al Dosari" },
      { value: "Hani Ar Rifai", label: "Hani Ar Rifai" },
    ],
    translations: [
      { value: "english", label: "English Translation" },
      {
        value: "arabic1",
        label: "Arabic Translation with Tashkeel (diacritics)",
      },
      {
        value: "arabic2",
        label: "Arabic Translation without Tashkeel (diacritics)",
      },
      { value: "bengali", label: "Bengali Translation" },
      { value: "urdu", label: "Urdu Translation" },
      { value: "turkish", label: "Turkish Translation" },
      { value: "uzbek", label: "Uzbek Translation" },
    ],
    tafsirs: [
      { value: "Ibn Kathir", label: "Ibn Kathir" },
      { value: "Maarif Ul Quran", label: "Maarif Ul Quran" },
      { value: "Tazkirul Quran", label: "Tazkirul Quran" },
    ],
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    console.log("Saving Quran settings:", settings);
    setIsDirty(false);
    alert("Quran settings saved successfully!");
  };

  return {
    settings,
    isDirty,
    options,
    handleSettingChange,
    handleSave,
  };
}
