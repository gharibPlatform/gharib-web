import { useEffect } from "react";

export function useHeaderFooterVisibility(scrollRef, lastScrollTop, setIsFooterVisible) {
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = scrollRef.current.scrollTop;
      const scrollDirection = currentScroll > lastScrollTop.current ? "down" : "up";

      if (scrollDirection === "down" && currentScroll > 50) {
        setIsFooterVisible(false);
      } else {
        setIsFooterVisible(true);
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
}