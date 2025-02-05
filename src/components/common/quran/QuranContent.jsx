import { useEffect, useRef } from "react";
import QuranHeader from "./quran header/QuranHeader";
import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";

export default function QuranContent() {
    const scrollRef = useRef(null); // Reference to scrollable div

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const scrollHeight = scrollRef.current.scrollHeight;
        const scrollTop = scrollRef.current.scrollTop;
        const innerHeight = window.innerHeight;

        console.log("Height:", scrollHeight);
        console.log("Top:", scrollTop);
        console.log("Window : ", innerHeight)

        if (scrollTop + innerHeight + 400 >= scrollHeight ) {
            console.log("Happened")
        }

        if (scrollTop + innerHeight + 400 >= scrollHeight ) {
            //fetch pages logic up
        }

        
    };

    useEffect(() => {
        const scrollableDiv = scrollRef.current;
        if (!scrollableDiv) return;

        scrollableDiv.addEventListener("scroll", handleScroll);
        console.log("Event listener added");

        return () => {
            scrollableDiv.removeEventListener("scroll", handleScroll);
            console.log("Event listener removed");
        };
    }, []);

    return (
        <div 
            ref={scrollRef} 
            className="w-full overflow-y-auto h-screen no-scrollbar flex flex-col"
        >
            <div className="flex flex-col justify-center pt-6">
                <QuranHeader />
                <QuranSurah />
                <QuranFooter />
            </div>
        </div>
    );
}
