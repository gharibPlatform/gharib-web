import { useState, useEffect } from "react";
import axios from 'axios';

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

    const availableRegions = [
        "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE",
        "BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","BN","BG","BF","BI","CV","KH","CM","CA","KY","CF","TD",
        "CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG",
        "SV","GQ","ER","EE","SZ","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL",
        "GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL",
        "IT","JM","JP","JE","JO","KZ","KE","KI","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MG","MW",
        "MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP",
        "NL","NC","NZ","NI","NE","NG","NU","NF","KP","MK","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN",
        "PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC",
        "SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","SS","ES","LK","SD","SR","SJ","SE","CH","SY","TW","TJ","TZ",
        "TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","UM","US","UY","UZ","VU","VE","VN",
        "VG","VI","WF","EH","YE","ZM","ZW"
    ];

    // Fetch current settings when component mounts
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/settings/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                
                const fetchedLanguage = res.data.language || 'en';
                const fetchedRegion = res.data.country || '';
                
                setLanguage(fetchedLanguage);
                setRegion(fetchedRegion);
                setInitialSettings({
                    language: fetchedLanguage,
                    region: fetchedRegion,
                });
            } catch (err) {
                console.error("Error fetching settings:", err.response ? err.response.data : err.message);
            }
        };
        fetchSettings();
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
        try {
            const payload = { language };

            if (region) {   
                payload.country = region;
            }

            const res = await axios.patch(
                "http://localhost:8000/api/settings/",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            
            console.log("Settings updated:", res.data);
            setInitialSettings({ language, region });
            setIsDirty(false);
            alert('Settings saved successfully!');
        } catch (err) {
            console.error("Error updating settings:", err.response ? err.response.data : err.message);
            alert('Error saving settings.');
        }
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