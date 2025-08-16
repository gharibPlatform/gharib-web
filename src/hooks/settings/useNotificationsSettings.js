import { useState, useEffect } from "react";

export function useNotificationsSettings() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [initialSettings, setInitialSettings] = useState({
    email: false,
    push: false,
  });

  useEffect(() => {
    const savedSettings = {
      email: false,
      push: false,
    };
    setEmailNotifications(savedSettings.email);
    setPushNotifications(savedSettings.push);
    setInitialSettings(savedSettings);
  }, []);

  useEffect(() => {
    const hasChanged =
      emailNotifications !== initialSettings.email ||
      pushNotifications !== initialSettings.push;
    setIsDirty(hasChanged);
  }, [emailNotifications, pushNotifications, initialSettings]);

  const handleSave = () => {
    setInitialSettings({
      email: emailNotifications,
      push: pushNotifications,
    });
    setIsDirty(false);
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
