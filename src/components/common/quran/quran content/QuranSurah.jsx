import QuranPage from "./QuranPage";

export default function QuranSurah ({ cache, onPageVisible }) {
    return (
        <div className="flex flex-col ...">
            {Object.entries(cache).map(([pageNumber, verses]) => (
                <QuranPage 
                    key={pageNumber} 
                    verses={verses} 
                    pageNumber={pageNumber}
                    onPageVisible={onPageVisible}
                />
            ))}
        </div>
    );
};