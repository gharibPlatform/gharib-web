import React, { useEffect, useState, useRef } from "react";
import { fetchPagesAroundCenter } from "@/utils/quran";

export default function QuranPage ({ verses, pageNumberString}) {
    return (
        <div>
            <div style={{fontFamily: `p${pageNumberString}-v1`}}>
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
            <div className="pt-56"></div>

        </div>
    );
};

