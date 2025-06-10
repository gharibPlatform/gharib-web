import { useState } from 'react';

export default function LanguageAndRegion() {
    const [language, setLanguage] = useState('english');
    const [region, setRegion] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const availableLanguages = [
        { value: 'english', label: 'English' },
        { value: 'arabic', label: 'Arabic (العربية)' }
    ];

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        setIsDirty(true);
    };

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
        setIsDirty(true);
    };

    const handleSave = () => {
        console.log('Saving settings:', { language, region });
        setIsDirty(false);
        alert('Settings saved successfully!');
    };

    return (
        <div className="px-8 pt-4 flex flex-col">
            {/* Language Section */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Language</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-white text-lg">Select your preferred language</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Choose between English and Arabic
                        </p>
                    </div>
                    
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)] appearance-none"
                    >
                        {availableLanguages.map((lang) => (
                            <option 
                                key={lang.value} 
                                value={lang.value}
                                className="bg-[var(--main-color)] text-white"
                            >
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Region Section */}
            <div className="flex flex-col pt-8">
                <h1 className="text-white font-medium text-3xl">Region</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-white text-lg">Enter your region</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Specify your geographic location (country, city, etc.)
                        </p>
                    </div>
                    
                    <input
                        type="text"
                        value={region}
                        onChange={handleRegionChange}
                        placeholder="e.g. United States, Saudi Arabia, etc."
                        className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)]"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex">
                <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className={`bg-[var(--main-color)] text-[var(--w-color)] px-4 py-2 flex justify-center items-center rounded-[4px] border border-[var(--g-color)] w-min whitespace-nowrap ${
                        isDirty 
                            ? 'hover:bg-[var(--r-color)] hover:text-white cursor-pointer' 
                            : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}