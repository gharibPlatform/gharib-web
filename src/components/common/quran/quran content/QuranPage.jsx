import { audioByVerse } from "@/utils/quran/quranAudio";
import { useState, useEffect, useRef } from "react";
import QuranSurahSeparator from "./QuranSurahSeparator";

export default function QuranPage({ verses, pageNumber }) {
    const pageNumberString = pageNumber.toString().padStart(3, "0");
    const [clickBoxBool, setClickBoxBool] = useState(false);
    const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
    const boxRef = useRef(null); 
    const [verseKey, setVerseKey] = useState("");
    
    const handleClick = (event, verse) => {
        setClickBoxBool(true);
        setBoxPosition({
            x: event.clientX,
            y: event.clientY
        });
        setVerseKey(verse.verse_key);
    };
    
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
    
    const PlayVerse = () => {
        setClickBoxBool(false)
        audioByVerse(1, verseKey)
        .then((resp) => {
            console.log(resp);
        })
    }
    
    if (!Array.isArray(verses)) {
        console.error("Verses is not an array:", verses);
    }
    console.log("verses are  : ", verses)
    console.log(typeof(verses))
    
    return (
        <div className="w-3/4 rounded-sm text-[var(--w-color)] text-center text-4xl pl-16 pr-16 pt-16 relative">
            <div
                style={{
                    fontFamily: `p${pageNumberString}-v1`,
                    direction: "rtl"
                }}
            >
                {verses.flatMap((verse, index) => (
                    <>
                       {verse.verse_number === 1 && (
                            index !== 0 ? (
                                <QuranSurahSeparator
                                chapterId={verse.verse_key.split(":")[0].padStart(3, "0")}
                                pageNumber={pageNumber}
                                pageNumberBool={true}
                                basmalaPre={true}
                                />
                            ) : (Number(verse.verse_key.split(":")[0]) === 1 || Number(verse.verse_key.split(":")[0]) === 9) ? (
                                <QuranSurahSeparator
                                chapterId={verse.verse_key.split(":")[0].padStart(3, "0")}
                                />
                            ) : (
                                <QuranSurahSeparator
                                chapterId={verse.verse_key.split(":")[0].padStart(3, "0")}
                                basmalaPre={true}
                                />
                            )
                        )}

                        {verse.words.map((word, wordIndex) => (
                            <span
                                key={`${index}-${wordIndex}`} 
                                onClick={(e) => handleClick(e, verse)}
                                className="p-1 pb-3 inline-block hover:text-[var(--g-color)] cursor-pointer"
                            >
                                {word.text}{" "}
                            </span>
                        ))}
                    </>
                ))}
            </div>

            {clickBoxBool && (
                <div
                    ref={boxRef}
                    className="flex-col bg-[var(--main-color)] text-lg w-min flex gap-4 justify-center items-center px-2 py-4 rounded-md text-[var(--w-color)] absolute"
                    style={{
                        left: `${boxPosition.x}px`,
                        top: `${boxPosition.y}px`,
                        transform: "translate(-340%, -75%)"
                    }}
                >
                    <div className="flex flex-col">
                        <div onClick={PlayVerse} className="cursor-pointer flex flex-row justify-center items-center rounded-sm px-4 py-2 gap-6  hover:bg-[var(--g-color-ver-02)] ">
                            <svg className="h-7 w-7 -ml-4" viewBox="0 0 72 72" id="emoji" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="color"></g> <g id="hair"></g> <g id="skin"></g> <g id="skin-shadow"></g> <g id="line"> <path fill="none" stroke="#fff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M19.5816,55.6062 c0.4848,0.1782,1.0303,0.297,1.5758,0.297c0.8485,0,1.697-0.297,2.4242-0.7722l30-15.9793l0.303-0.297 c0.7879-0.7722,1.2121-1.7227,1.2121-2.7919c0-1.0692-0.4242-2.0791-1.2121-2.7919l-0.303-0.297l-30-16.0981 c-1.0909-0.8316-2.6667-1.0098-4-0.4752c-1.5152,0.594-2.4848,2.0791-2.4848,3.683v31.8397 C17.0967,53.5272,18.0664,55.0122,19.5816,55.6062z"></path> </g> </g></svg>
                            <h2>Play</h2>
                        </div>
                        <div onClick={()=>setClickBoxBool(false)} className="cursor-pointer flex flex-row justify-between items-center rounded-sm px-4 py-2 gap-2  hover:bg-[var(--g-color-ver-02)] ">
                            <svg className="w-7 h-7" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.4 5.4H4V6.6H13.2189C13.1612 6.78478 13.0895 6.99578 13.0025 7.22211C12.7032 8.00031 12.2402 8.91125 11.5757 9.57574L10 11.1515L9.42426 10.5757C8.72102 9.8725 8.25297 9.16987 7.96199 8.64611C7.81668 8.38455 7.71617 8.16874 7.65305 8.02146C7.62151 7.94787 7.59937 7.89154 7.5857 7.85534C7.57886 7.83725 7.57415 7.8242 7.57144 7.81657L7.56886 7.80922C7.56886 7.80922 7.56921 7.81026 7 8C6.43079 8.18974 6.43091 8.19009 6.43091 8.19009L6.43133 8.19135L6.43206 8.19351L6.4341 8.19948L6.44052 8.21786C6.44587 8.23292 6.45336 8.25357 6.46313 8.27942C6.48266 8.33112 6.5113 8.40369 6.55008 8.49416C6.62758 8.67501 6.74582 8.92795 6.91301 9.22889C7.24703 9.83013 7.77898 10.6275 8.57574 11.4243L9.15147 12L4.57964 16.5718L4.57655 16.5749L4.57577 16.5757L5.4243 17.4242L5.42688 17.4216L10.0368 12.8117L12.6159 14.9609L13.3841 14.0391L10.8888 11.9597L12.4243 10.4243C13.2598 9.58875 13.7968 8.49969 14.1225 7.65289C14.2818 7.23863 14.395 6.87072 14.4696 6.6H16V5.4H10.6V4H9.4V5.4ZM17.4405 10L21.553 19.7672H20.2509L19.1279 17.1H14.8721L13.7491 19.7672H12.447L16.5595 10H17.4405ZM15.3773 15.9H18.6227L17 12.0462L15.3773 15.9Z" fill="#fff"></path> </g></svg>                            <h2>Translate</h2> 
                        </div>
                    </div>
                    <div className="w-3/4 h-px bg-[var(--lighter-color)]"></div>
                    <div className="flex gap-2">
                        <div onClick={()=>setClickBoxBool(false)} >
                            <svg className="w-8 h-8 cursor-pointer" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z" stroke="#FFFF00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                        </div>
                        <div onClick={()=>setClickBoxBool(false)} >
                            <svg className="w-8 h-8 cursor-pointer" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z" stroke="#FF0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                        </div>
                        <div onClick={()=>setClickBoxBool(false)} >
                            <svg className="w-8 h-8 cursor-pointer" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z" stroke="#0000FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                        </div>
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
