import { useRouter } from "next/navigation";

export default function SettingsSideBar() {
    return (
        <div className="h-screen border-r border-[var(--g-color)] bg-[var(--main-color)] inline-block">
            <div className="inline-block flex-col pt-4">
                <SettingsItem title="Account" path="/settings/account" />
                <SettingsItem title="Profile" path="/settings/profile" />
                <SettingsItem title="Appearance" path="/settings/appearance" />
                <SettingsItem title="Quran" path="/settings/quran" />
                <SettingsItem title="Security" path="/settings/security" />
                <SettingsItem title="Notifications" path="/settings/notifications" />
                <SettingsItem title="Language and region" path="/settings/language" />
                <SettingsItem title="Blocking" path="/settings/blocking" />
            </div>
        </div>
    );
}

function SettingsItem({ title, path }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(path);
    };

    return (
        <div
            onClick={handleClick}
            className="hover:bg-[var(--secondary-color)] pt-3 pb-3 flex flex-inline items-center gap-4 cursor-pointer pl-9 pr-28"
        >
            <p className="text-r text-white">{title}</p>
        </div>
    );
}
