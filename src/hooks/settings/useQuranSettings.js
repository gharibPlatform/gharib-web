import { useState, useCallback, useEffect } from "react";
import { getSettings, patchSettings } from "../../utils/apiSettings";

export function useQuranSettings() {
  const [settings, setSettings] = useState({
    reciter: "",
    translation: "",
    tafsir: "",
  });

  const [originalSettings, setOriginalSettings] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    title: "",
    description: "",
    actionType: "confirm",
    onConfirm: null,
  });

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

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getSettings();

      if (data) {
        const quranSettings = {
          reciter: data.reciter || "",
          translation: data.translation || "",
          tafsir: data.tafsir || "",
        };

        setSettings(quranSettings);
        setOriginalSettings(quranSettings);
        setIsDirty(false);
      }
    } catch (error) {
      console.error("Failed to load Quran settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleSettingChange = useCallback(
    (key, value) => {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);

      const isAnySettingChanged =
        updatedSettings.reciter !== originalSettings.reciter ||
        updatedSettings.translation !== originalSettings.translation ||
        updatedSettings.tafsir !== originalSettings.tafsir;

      setIsDirty(isAnySettingChanged);
    },
    [settings, originalSettings]
  );

  const saveSettings = useCallback(async () => {
    if (!isDirty) {
      console.log("No changes to save");
      return { success: false, message: "No changes to save" };
    }

    setIsLoading(true);
    try {
      const updateData = {};

      if (settings.reciter !== originalSettings.reciter) {
        updateData.reciter = settings.reciter;
      }
      if (settings.translation !== originalSettings.translation) {
        updateData.translation = settings.translation;
      }
      if (settings.tafsir !== originalSettings.tafsir) {
        updateData.tafsir = settings.tafsir;
      }

      console.log("Saving Quran settings:", updateData);
      const response = await patchSettings(updateData);

      setOriginalSettings(settings);
      setIsDirty(false);

      return { success: true, data: response };
    } catch (error) {
      console.error("Failed to save Quran settings:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to save changes",
      };
    } finally {
      setIsLoading(false);
    }
  }, [settings, originalSettings, isDirty]);

  const handleSave = useCallback(() => {
    if (!isDirty) {
      console.log("No changes to save");
      return;
    }

    const changedFields = [];
    if (settings.reciter !== originalSettings.reciter)
      changedFields.push("reciter");
    if (settings.translation !== originalSettings.translation)
      changedFields.push("translation");
    if (settings.tafsir !== originalSettings.tafsir)
      changedFields.push("tafsir");

    const fieldDisplayNames = {
      reciter: "reciter",
      translation: "translation",
      tafsir: "tafsir",
    };

    const displayText = changedFields
      .map((field) => fieldDisplayNames[field])
      .join(", ");

    setPopupContent({
      title: "Save Quran Settings",
      description: `Are you sure you want to save changes to: ${displayText}?`,
      actionType: "confirm",
      onConfirm: async () => {
        const result = await saveSettings();
        if (result.success) {
          console.log("Quran settings saved successfully:", result.data);
        } else {
          console.error("Failed to save Quran settings:", result.message);
        }
        setPopupOpen(false);
      },
    });
    setPopupOpen(true);
  }, [settings, originalSettings, isDirty, saveSettings]);

  const resetSettings = useCallback(() => {
    setSettings(originalSettings);
    setIsDirty(false);
  }, [originalSettings]);

  return {
    settings,
    isDirty,
    isLoading,
    options,
    popupOpen,
    popupContent,

    setPopupOpen,
    handleSettingChange,
    handleSave,
    resetSettings,
    loadSettings,

    saveSettings,
  };
}
