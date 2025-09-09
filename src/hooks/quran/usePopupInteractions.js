import { useEffect } from "react";

export function usePopupInteractions(clickBoxBool, boxRef, scrollRef, setClickBoxBool) {
  // Outside click handling
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

  // Scroll handling for popup
  useEffect(() => {
    if (!clickBoxBool) return;

    const handleScroll = () => {
      setClickBoxBool(false);
    };

    const scrollContainer = scrollRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [clickBoxBool]);
}