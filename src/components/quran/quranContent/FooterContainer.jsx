export default function FooterContainer({ isVisible, children }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out 
                ${isVisible ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-0 overflow-hidden"}
            `}
    >
      {children}
    </div>
  );
}
