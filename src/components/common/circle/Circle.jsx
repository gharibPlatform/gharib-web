export default function Circle({ width, height, degree, fontSize, text, backgroundColor }) {
    const innerWidth = width - 40;  // Increased padding to accommodate thicker worm
    const innerHeight = height - 40;
    const radius = Math.min(width, height) / 2 - 10; // Adjusted radius
    const wormThickness = 20; // Much thicker worm
    
    return (
        <div className="flex items-center justify-center rounded-full cursor-pointer z-10 relative" style={{
            width: `${width}px`,
            height: `${height}px`,
        }}>
            <svg className="absolute w-full h-full" viewBox={`0 0 ${width} ${height}`}>
                <circle 
                    cx={width/2} 
                    cy={height/2} 
                    r={radius} 
                    fill="#323232" 
                />
                
                <path 
                    d={`
                        M ${width/2} ${height/2}
                        m 0 -${radius}
                        a ${radius} ${radius} 0 1 1 0 ${radius*2}
                        a ${radius} ${radius} 0 1 1 0 -${radius*2}
                    `}
                    fill="none"
                    stroke="#DC9908"
                    strokeWidth={wormThickness}
                    strokeLinecap="round"
                    strokeDasharray={`${(degree / 360) * 2 * Math.PI * radius}, 1000`}
                />
                
            </svg>
            
            <div className="rounded-full z-10 flex flex-col items-center justify-center text-[var(--w-color)]" style={{
                height: `${innerHeight}px`,
                width: `${innerWidth}px`,
                fontSize: `${fontSize}px`,
                backgroundColor: `${backgroundColor}`,
            }}>
                <p className="text-2xl font-bold">{text}</p>
            </div>
        </div>
    )
}