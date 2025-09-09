import { useState, useEffect } from "react";
import axios from 'axios';
import { getSettings, patchSettings } from "../../utils/apiSettings";


export function useNotificationsSettings() {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [initialSettings, setInitialSettings] = useState({
        email: false,
        push: false,
    });

    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await getSettings();
          console.log(res)
          setEmailNotifications(res.data.receive_email_updates ?? false);
                setPushNotifications(res.data.receive_notifications ?? false);

                setInitialSettings({
                    email: res.data.receive_email_updates ?? false,
                    push: res.data.receive_notifications ?? false,
                });
        } catch (err) {
          console.error("Error fetching Quran settings:", err);
        }
      };
      fetch();
    }, []);
    
    useEffect(() => {
        const hasChanged =
            emailNotifications !== initialSettings.email ||
            pushNotifications !== initialSettings.push;
        setIsDirty(hasChanged);
    }, [emailNotifications, pushNotifications, initialSettings]);

    const handleSave = async () => {
        patchSettings({
                    receive_email_updates: emailNotifications,
                    receive_notifications: pushNotifications
                })
    };

    return {
        emailNotifications,
        setEmailNotifications,
        pushNotifications,
        setPushNotifications,
        isDirty,
        handleSave,
    };
}