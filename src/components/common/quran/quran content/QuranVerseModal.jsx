"use client";
import { useEffect } from "react";

export default function QuranVerseModal({ verse, onClose }) {
    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                onClose();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[1000] modal-backdrop bg-black bg-opacity-70 flex items-center justify-center p-4">
            <div className="bg-[var(--secondary-color)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-teal-400">
                            {verse.verse_key}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Arabic Text */}
                        <div className="text-right text-3xl leading-loose font-arabic">
                            {verse.text_uthmani}
                        </div>

                        {/* Translation */}
                        <div className="p-4 bg-gray-800 rounded">
                            <h3 className="text-lg font-semibold mb-2">Translation</h3>
                            <p>{verse.translation?.text || "No translation available"}</p>
                        </div>

                        {/* Tafsir */}
                        <div className="p-4 bg-gray-800 rounded">
                            <h3 className="text-lg font-semibold mb-2">Tafsir</h3>
                            <p>{verse.tafsir?.text || "No tafsir available"}</p>
                        </div>

                        {/* Verse Info */}
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
                            <div>
                                <span className="block font-semibold">Page</span>
                                {verse.page_number}
                            </div>
                            <div>
                                <span className="block font-semibold">Juz</span>
                                {verse.juz_number}
                            </div>
                            <div>
                                <span className="block font-semibold">Hizb</span>
                                {verse.hizb_number}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}