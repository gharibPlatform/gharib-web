export default function Circle({ degree }) {
    return(
        <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer z-10" style={
            {
             background: `conic-gradient(#1b1b1f 0deg ${degree}deg, red 0deg 360deg)`,
            }
            }>
    
            <div className="w-9 h-9 bg-[var(--main-color)] rounded-full z-10 flex flex-col items-center justify-center"> 
          </div>
        </div>
    )
}