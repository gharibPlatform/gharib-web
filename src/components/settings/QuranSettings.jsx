import { useState } from 'react';

export default function QuranSettings() {
    const [reciter, setReciter] = useState('Mishary Rashid Al Afasy');
    const [translation, setTranslation] = useState('english');
    const [tafsir, setTafsir] = useState('Ibn Kathir');
    const [isDirty, setIsDirty] = useState(false);

    const availableReciters = [
        { value: 'Mishary Rashid Al Afasy', label: 'Mishary Rashid Al Afasy' },
        { value: 'Abu Bakr Al Shatri', label: 'Abu Bakr Al Shatri' },
        { value: 'Nasser Al Qatami', label: 'Nasser Al Qatami' },
        { value: 'Yasser Al Dosari', label: 'Yasser Al Dosari' },
        { value: 'Hani Ar Rifai', label: 'Hani Ar Rifai' }
    ];

    const availableTranslations = [
        { value: 'english', label: 'English Translation' },
        { value: 'arabic1', label: 'Arabic Translation with Tashkeel (diacritics)' },
        { value: 'arabic2', label: 'Arabic Translation without Tashkeel (diacritics)' },
        { value: 'bengali', label: 'Bengali Translation' },
        { value: 'urdu', label: 'Urdu Translation' },
        { value: 'turkish', label: 'Turkish Translation' },
        { value: 'uzbek', label: 'Uzbek Translation' }
    ];

    const availableTafsirs = [
        { value: 'Ibn Kathir', label: 'Ibn Kathir' },
        { value: 'Maarif Ul Quran', label: 'Maarif Ul Quran' },
        { value: 'Tazkirul Quran', label: 'Tazkirul Quran' }
    ];

    const handleReciterChange = (e) => {
        setReciter(e.target.value);
        setIsDirty(true);
    };

    const handleTranslationChange = (e) => {
        setTranslation(e.target.value);
        setIsDirty(true);
    };

    const handleTafsirChange = (e) => {
        setTafsir(e.target.value);
        setIsDirty(true);
    };

    const handleSave = () => {
        console.log('Saving Quran settings:', { reciter, translation, tafsir });
        setIsDirty(false);
        alert('Quran settings saved successfully!');
    };

    const [rotateReciter, setRotateReciter] = useState(90);
    const [rotateTranslation, setRotateTranslation] = useState(90);
    const [rotateTafsir, setRotateTafsir] = useState(90);

    const changeRotation = (setter, current) => {
        setter(current === 90 ? 270 : 90);
    };

    return (
        <div className="px-8 pt-4 flex flex-col">
            {/* Reciter Section */}
            <div className="flex flex-col pt-4">
                <h1 className="text-white font-medium text-3xl">Reciter</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-white text-lg">Select your preferred reciter</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Choose from the list of available reciters
                        </p>
                    </div>
                    
                    <div
                        onClick={() => changeRotation(setRotateReciter, rotateReciter)}
                        className="relative flex items-center w-min"
                    >
                        <select
                            value={reciter}
                            onChange={handleReciterChange}
                            onBlur={() => setRotateReciter(90)}
                            className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)] appearance-none pr-8"
                        >
                            {availableReciters.map((reciter) => (
                                <option
                                    key={reciter.value}
                                    value={reciter.value}
                                    className="bg-[var(--main-color)] text-white"
                                >
                                    {reciter.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 pointer-events-none">
                            <svg 
                                style={{transform: `rotate(${rotateReciter}deg)`}} 
                                className="w-5 h-5 transition-all duration-200 ease" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15 20L7 12L15 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </div>                
                </div>
            </div>

            {/* Translation Section */}
            <div className="flex flex-col pt-8">
                <h1 className="text-white font-medium text-3xl">Translation</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-white text-lg">Select your preferred translation</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Choose from the list of available translations
                        </p>
                    </div>
                    
                    <div
                        onClick={() => changeRotation(setRotateTranslation, rotateTranslation)}
                        className="relative flex items-center w-min"
                    >
                        <select
                            value={translation}
                            onChange={handleTranslationChange}
                            onBlur={() => setRotateTranslation(90)}
                            className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)] appearance-none pr-8"
                        >
                            {availableTranslations.map((trans) => (
                                <option
                                    key={trans.value}
                                    value={trans.value}
                                    className="bg-[var(--main-color)] text-white"
                                >
                                    {trans.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 pointer-events-none">
                            <svg 
                                style={{transform: `rotate(${rotateTranslation}deg)`}} 
                                className="w-5 h-5 transition-all duration-200 ease" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15 20L7 12L15 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </div>                
                </div>
            </div>

            {/* Tafsir Section */}
            <div className="flex flex-col pt-8">
                <h1 className="text-white font-medium text-3xl">Tafsir</h1>
                <div className="flex items-center justify-center py-2 w-4/5 pb-4">
                    <div className="border-t border-[var(--g-color)] w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4 mb-8">
                    <div>
                        <h2 className="text-white text-lg">Select your preferred tafsir</h2>
                        <p className="text-[var(--g-color)] text-sm">
                            Choose from the list of available tafsirs
                        </p>
                    </div>
                    
                    <div
                        onClick={() => changeRotation(setRotateTafsir, rotateTafsir)}
                        className="relative flex items-center w-min"
                    >
                        <select
                            value={tafsir}
                            onChange={handleTafsirChange}
                            onBlur={() => setRotateTafsir(90)}
                            className="w-min bg-[var(--main-color)] border border-[var(--g-color)] rounded px-4 py-2 text-white focus:outline-none focus:border-[var(--main-color-hover)] appearance-none pr-8"
                        >
                            {availableTafsirs.map((tafs) => (
                                <option
                                    key={tafs.value}
                                    value={tafs.value}
                                    className="bg-[var(--main-color)] text-white"
                                >
                                    {tafs.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 pointer-events-none">
                            <svg 
                                style={{transform: `rotate(${rotateTafsir}deg)`}} 
                                className="w-5 h-5 transition-all duration-200 ease" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15 20L7 12L15 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </div>                
                </div>
            </div>

            {/* Save Button */}
            <div className="flex pb-8">
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