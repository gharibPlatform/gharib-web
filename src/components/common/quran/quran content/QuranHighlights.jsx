import { verseByKey } from "@/utils/quran/quran"
import { useEffect, useState } from "react"

export default function QuranHighlights({ highlights = ["3:23", "2:23", "4:23", "5:24", "2:13", "3:2"] }) {
    const [verses, setVerses] = useState({});

    useEffect(() => {
        // Fetch all highlighted verses
        const fetchVerses = async () => {
            const newVerses = {};
            
            for (const key of highlights) {
                try {
                    const verseData = await verseByKey(key);
                    newVerses[key] = verseData;
                } catch (error) {
                    console.error(`Failed to fetch verse ${key}:`, error);
                    newVerses[key] = { text: `Error loading verse ${key}` };
                }
            }
            
            setVerses(newVerses);
        };

        fetchVerses();
    }, [highlights]);

    return (
        <div className="text-white">
            {Object.entries(verses).map(([key, verseData]) => (
                <div 
                    key={key} 
                    className="verse-highlight" 
                >
                    <p><strong>{key}</strong>: {verseData.text}</p>
                </div>
            ))}
        </div>
    )    
}