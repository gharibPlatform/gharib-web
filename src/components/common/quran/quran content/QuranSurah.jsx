import QuranPage from "./QuranPage";

export default function QuranSurah ({ cache, onPageVisible, increaseProgress}) {
        return (
        <div className="flex flex-col items-center justify-center pt-6">
            {Object.entries(cache).map(([pageNumber, verses]) => (
                <QuranPage 
                    key={pageNumber} 
                    verses={verses} 
                    pageNumber={pageNumber}
                    onPageVisible={onPageVisible}
                    increaseProgress={increaseProgress}
                />
            ))}
        </div>
    );
};