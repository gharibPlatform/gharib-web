import { useState, useEffect } from "react";
import axios from 'axios';
import { getSettings, patchSettings } from "../../utils/apiSettings";
import { availableRegions } from "../../utils/consts/regions";

export function useLanguageAndRegionSettings() {
    const [language, setLanguage] = useState('en');
    const [region, setRegion] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [initialSettings, setInitialSettings] = useState({
        language: 'en',
        region: '',
    });

    const availableLanguages = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic (العربية)' }
    ];

    // Fetch current settings when component mounts
    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await getSettings();
          console.log(res)
          const fetchedLanguage = res.data.language || 'en';
          const fetchedRegion = res.data.country || '';
          setLanguage(fetchedLanguage);
          setRegion(fetchedRegion);
          setInitialSettings({
              language: fetchedLanguage,
              region: fetchedRegion,
          });
        } catch (err) {
          console.error("Error fetching Quran settings:", err);
        }
      };
      fetch();
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

    const handleSave = async () => {
      const payload = { language };
      if (region) {   
          payload.country = region;
      }
      patchSettings(payload)
    };

    return {
        language,
        setLanguage,
        region,
        setRegion,
        isDirty,
        availableLanguages,
        availableRegions,
        handleLanguageChange,
        handleRegionChange,
        handleSave,
    };
}