import { useState, useEffect } from 'react';

export default function NotificationsSettings() {
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [initialSettings, setInitialSettings] = useState({
        email: false,
        push: false
    });

    useEffect(() => {
        const savedSettings = {
            email: false,
            push: false
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
        console.log('Saving settings:', {
            email: emailNotifications,
            push: pushNotifications
        });
        
        setInitialSettings({
            email: emailNotifications,
            push: pushNotifications
        });
        setIsDirty(false);
    };

    return (
        <div className="px-8 pt-4 flex flex-col">
            {/* Email Notifications Section */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Email Notifications</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-2">
                    <div>
                        <h2 className="text-white text-lg">Receive email notifications</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Get important updates sent to your email
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={emailNotifications}
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-[var(--g-color)] peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--b-color)]"></div>
                    </label>
                </div>
            </div>

            {/* Push Notifications Section */}
            <div className="flex flex-col pt-16">
                <h1 className="text-white font-medium text-3xl">Push Notifications</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-white text-lg">Enable push notifications</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Receive instant notifications on your device
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={pushNotifications}
                            onChange={() => setPushNotifications(!pushNotifications)}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-[var(--g-color)] peer-focus:outline-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--b-color)]"></div>
                    </label>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex">
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`mt-5 bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap ${
                        isDirty 
                            ? 'hover:bg-[var(--r-color)] hover:text-white cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    Confirm Changes
                </button>
            </div>
        </div>
    );
}