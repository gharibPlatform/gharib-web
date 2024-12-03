export default function Circle({ width,  height,  degree }) {
    console.log("the width is : ", width)
    console.log("the height is : ", height)
    const innerWidth = width - 5 ;
    const innerHeight = height - 5 ;
    return(
        <div className="flex items-center justify-center rounded-full cursor-pointer z-10" style={
            {
             width : `${width}px`,
             height : `${height}px`,
             background: `conic-gradient(#1b1b1f 0deg ${degree}deg, var(--o-color) 0deg 360deg)`,
            }
            }>
    
            <div className="bg-[var(--main-color)] rounded-full z-10 flex flex-col items-center justify-center text-sm text-[var(--w-color)]" style={{
                height : `${innerHeight}px`,
                width : `${innerWidth}px`
            }}> 
            4d23h
          </div>
        </div>
    )
}