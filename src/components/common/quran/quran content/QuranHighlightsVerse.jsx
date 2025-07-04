export default function QuranHighlightsVerse({ verse }) {
    const pageNumberString = verse.page_number.toString().padStart(3, "0");

    return(
        <div 
         style={{fontFamily: `p${pageNumberString}-v1`,}}
         className="">
            {verse.words.map((word, index) => (
                <span key={index}>{word.text}</span>
            ))}
        </div>
    )
}