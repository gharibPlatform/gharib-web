export default function Tooltip ({ text, children, top, right }) {
    return (
      <div className="relative group inline-block">
        {children}
        <div style={{top: `${top}px`, right: `${right}px`}} className="absolute mb-2 px-3 py-1 w-max max-w-xs text-md text-white bg-[var(--darker-color)] rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          {text}
        </div>
      </div>
    );
  };