export default function Circle({ width,  height,  degree, fontSize, text, backgroundColor }) {
    const innerWidth = width - 5 ;
    const innerHeight = height - 5 ;
    
    return(
        <div className="flex items-center justify-center rounded-full cursor-pointer z-10" style={
            {
             width : `${width}px`,
             height : `${height}px`,
             background: `conic-gradient(#DC9908 0deg ${degree}deg, var(--circle-color) 0deg 360deg)`,
            }
            }>
    
            <div className="rounded-full z-10 flex flex-col items-center justify-center text-[var(--w-color)]" style={{
                height : `${innerHeight}px`,
                width : `${innerWidth}px`,
                fontSize: `${fontSize}px`,
                backgroundColor: `${backgroundColor}`
            }}> 

            {text}
          </div>
        </div>
    )
}