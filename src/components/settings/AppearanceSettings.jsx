import { useState } from 'react';

export default function AppearanceSettings() {
    const [selectedTheme, setSelectedTheme] = useState(null);

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
    };

    return(
        <div className="px-8 pt-4 flex flex-col overflow-hidden">
            <div className="flex flex-col pt-4 bg-[var(--secondary-color)]">
                <h1 className="text-white font-medium text-3xl">Theme settings</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                <p className="text-[var(--g-color)] ">Here you can change your toggle your theme, choose that you like the most.</p>
            </div>
            
            {/* themes section */}
            <div className="flex items-center pl-16 gap-16 pt-24">

                {/* light theme */}
                <div 
                    className={`w-1/3 border rounded-[4px] pb-8 cursor-pointer transition-all duration-200 ${
                        selectedTheme === 'light' 
                            ? 'border-[var(--b-color)] shadow-lg' 
                            : 'border-[var(--g-color)]'
                    }`}
                    onClick={() => handleThemeClick('light')}
                >
                    <div className={`p-4 font-medium text-xl border-b text-white  ${
                        selectedTheme === 'light'
                            ? 'bg-[var(--main-color-hover)] border-[var(--b-color)]'
                            : 'text-white bg-[var(--main-color-hover)] border-[var(--g-color)]'
                    }`}>
                        Light theme
                    </div>
                    <div className="bg-[var(--main-color)] h-full">
                        <p className="text-[var(--g-color)] px-2 pt-3 pb-5">This theme will be active when you set the theme to "Light mode"</p>
                        <div className="bg-white w-11/12 min-h-52 mx-auto rounded-[4px]"></div>
                    </div>
                </div>

                {/* dark theme */}
                <div 
                    className={`w-1/3 border rounded-[4px] pb-8 cursor-pointer transition-all duration-200 ${
                        selectedTheme === 'dark' 
                            ? 'border-[var(--b-color)] shadow-lg' 
                            : 'border-[var(--g-color)]'
                    }`}
                    onClick={() => handleThemeClick('dark')}
                >
                    <div className={`p-4 font-medium text-xl border-b text-white  ${
                        selectedTheme === 'dark'
                            ? 'bg-[var(--main-color-hover)] border-[var(--b-color)]'
                            : 'bg-[var(--main-color-hover)] border-[var(--g-color)]'
                    }`}>
                        Dark theme
                    </div>
                    <div className="bg-[var(--main-color)] h-full">
                        <p className="text-[var(--g-color)] px-2 pt-3 pb-5">This theme will be active when you set the theme to "Dark mode"</p>
                        <div className="bg-black w-11/12 min-h-52 mx-auto rounded-[4px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}