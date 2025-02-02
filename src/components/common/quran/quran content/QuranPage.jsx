import { useState, useEffect, useRef } from "react";

export default function QuranPage({ verses, pageNumber }) {
    const pageNumberString = pageNumber.toString().padStart(3, "0");
    const [clickBoxBool, setClickBoxBool] = useState(false);
    const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
    const boxRef = useRef(null); // Reference to the floating box

    const handleClick = (event) => {
        setClickBoxBool(true);
        setBoxPosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    // Click outside logic
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setClickBoxBool(false);
            }
        };

        if (clickBoxBool) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [clickBoxBool]);

    return (
        <div className="w-3/4 rounded-sm text-[var(--w-color)] text-center text-4xl pl-16 pr-16 pt-16 relative">
            <div
                style={{
                    fontFamily: `p${pageNumberString}-v1`,
                    direction: "rtl"
                }}
            >
                {verses.flatMap((verse, index) =>
                    verse.words.map((word, wordIndex) => (
                        <span
                            key={`${index}-${wordIndex}`} // Ensure each key is unique
                            onClick={handleClick}
                            className="p-1 pb-3 inline-block hover:text-[var(--g-color)] cursor-pointer"
                        >
                            {word.text}{" "}
                        </span>
                    ))
                )}
            </div>

            {clickBoxBool && (
                <div
                    ref={boxRef}
                    className="bg-[var(--main-color)] text-lg w-min flex gap-4 justify-center items-center px-6 py-4 rounded-md text-[var(--w-color)] absolute"
                    style={{
                        left: `${boxPosition.x}px`,
                        top: `${boxPosition.y}px`,
                        transform: "translate(-220%, -360%)"
                    }}
                >
                    <div className="flex gap-4">
                        <div className="cursor-pointer">Play</div>
                        <div className="cursor-pointer">Translate</div>
                    </div>
                    <div className="w-px min-h-8 bg-[var(--g-color)]"></div>
                    <div className="flex gap-2">
                        <div>yellow</div>
                        <div>blue</div>
                        <div>red</div>
                    </div>
                </div>
            )}

            <div className="pt-12 gap-6 flex items-center justify-center text-base">
                <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
                <div className="px-6 text-[var(--lighter-color)]">{pageNumber}</div>
                <div className="h-[1px] w-1/2 -mx-8 bg-[var(--g-color)]"></div>
            </div>
        </div>
    );
}
