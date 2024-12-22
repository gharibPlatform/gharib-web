import { useState } from "react";
import QuranHeader from "./QuranHeader";

export default function QuranContent() {
    return (
        <div className="w-full h-2">
            <div className="flex flex-col justify-center pt-6">
                <QuranHeader />
        
                <div className="flex items-center justify-center pt-12">
                    <div className="bg-[var(--dark-color)] w-2/3 h-screen"></div>
                </div>
            </div>
        </div>
    );
}
