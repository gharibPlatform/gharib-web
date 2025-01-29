import React, { useEffect, useState, useRef } from "react";
import { fetchPagesAroundCenter } from "@/utils/quran";

export default function QuranPage ({ verses, pageNumber}) {
    const pageNumberString = pageNumber.toString().padStart(3, "0")
    return (
        <div className="w-3/4 rounded-sm text-[var(--w-color)] text-center text-4xl pl-16 pr-16 pt-16">
            <div className="" style={{fontFamily: `p${pageNumberString}-v1`}}>
                {verses.flatMap((verse, index) =>
                    verse.words.map((word) => (
                        <span
                            className="p-1 pb-3 inline-block"
                        >
                            {word.text}{" "}
                        </span>
                    ))
                )}
            </div>
            <div className="pt-12 gap-6 flex items-center justify-center text-base">
                <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
                <div className="px-6 text-[var(--lighter-color)]" >{pageNumber}</div>
                <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
            </div>

        </div>
    );
};

