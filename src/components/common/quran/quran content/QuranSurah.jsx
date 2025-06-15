import { useEffect, useRef } from 'react';
import QuranPage from "./QuranPage";

export default function QuranSurah({ cache, onPageVisible }) {
    const pageRefs = useRef({});
    console.log(cache)
    // Page Observer Effect
    useEffect(() => {
        const pageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const pageNumber = entry.target.dataset.pageNumber;
                        onPageVisible(pageNumber); // Notify parent component
                        
                        // Optional: Log or track visible page
                        console.log(`Page ${pageNumber} is visible`);
                    }
                });
            },
            {
                threshold: 0.1, // 10% of page visible triggers callback
                rootMargin: "200px" // Look 200px ahead of viewport
            }
        );

        // Observe all page elements
        Object.values(pageRefs.current).forEach(el => {
            if (el) pageObserver.observe(el);
        });

        // Cleanup
        return () => {
            pageObserver.disconnect();
        };
    }, [cache, onPageVisible]); // Re-run if cache changes

    return (
        <div className="flex flex-col items-center justify-center pt-6">
            {Object.entries(cache).map(([pageNumber, verses]) => (
                <div 
                    key={pageNumber}
                    ref={el => pageRefs.current[pageNumber] = el}
                    data-page-number={pageNumber}
                >
                    <QuranPage 
                        verses={verses} 
                        pageNumber={pageNumber}
                        onPageVisible={onPageVisible}
                    />
                </div>
            ))}
        </div>
    );
};