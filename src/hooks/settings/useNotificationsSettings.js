import { useState, useEffect } from "react";
import axios from 'axios';

export function useNotificationsSettings() {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [initialSettings, setInitialSettings] = useState({
        email: false,
        push: false,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/settings/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                console.log("Fetched notification settings:", res.data);

                setEmailNotifications(res.data.receive_email_updates ?? false);
                setPushNotifications(res.data.receive_notifications ?? false);

                setInitialSettings({
                    email: res.data.receive_email_updates ?? false,
                    push: res.data.receive_notifications ?? false,
                });
            } catch (err) {
                console.error(
                    "Error fetching notification settings:",
                    err.response ? err.response.data : err.message
                );
            }
        };

        fetchSettings();
    }, []);

    useEffect(() => {
        const hasChanged =
            emailNotifications !== initialSettings.email ||
            pushNotifications !== initialSettings.push;
        setIsDirty(hasChanged);
    }, [emailNotifications, pushNotifications, initialSettings]);

    const handleSave = async () => {
        try {
            console.log('Saving notification settings:', {
                receive_email_updates: emailNotifications,
                receive_notifications: pushNotifications
            });

            const res = await axios.patch(
                "http://localhost:8000/api/settings/",
                {
                    receive_email_updates: emailNotifications,
                    receive_notifications: pushNotifications
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Saved notification settings:", res.data);

            setInitialSettings({
                email: emailNotifications,
                push: pushNotifications
            });
            setIsDirty(false);
            alert("Notification settings saved successfully!");
        } catch (err) {
            console.error(
                "Error saving notification settings:",
                err.response ? err.response.data : err.message
            );
            alert("Failed to save settings. Please try again.");
        }
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