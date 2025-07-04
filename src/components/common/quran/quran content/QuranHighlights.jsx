import { verseByKey } from "@/utils/quran/quran"
import { useEffect, useState } from "react"
import QuranHighlightsVerse from "./QuranHighlightsVerse";

export default function QuranHighlights({ highlights = ["3:23", "2:23", "4:23", "5:24", "2:13", "3:2"] }) {
    const [verses, setVerses] = useState({});

    // fetch all highlighted verses
    useEffect(() => {
        const fetchVerses = async () => {
            const newVerses = {};
            
            for (const key of highlights) {
                try {
                    const verseData = await verseByKey(key);
                    console.log(verseData);
                    newVerses[key] = verseData;
                } catch (error) {
                    console.error(`Failed to fetch verse ${key}:`, error);
                    newVerses[key] = { text: `Error loading verse ${key}` };
                }
            }
            
            setVerses(newVerses);
            console.log(newVerses)
        };
        fetchVerses();
    }, []);

    return (
        <div className="flex flex-col text-white flex-wrap px-2 gap-6">
            {Object.entries(verses).map(([key, verseData]) => (
                <QuranHighlightsVerse verse={verseData} />
            ))}
        </div>
    )    
}