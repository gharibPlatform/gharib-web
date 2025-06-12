import React from "react";
import QuranPage from "./QuranPage";

const QuranSurah = ({ cache }) => {
    return (
        <div className="flex flex-col items-center justify-center pt-6">
            {Object.entries(cache).map(([pageNumber, verses]) => (
                <QuranPage key={pageNumber} verses={verses || []} pageNumber={pageNumber} />
            ))}
        </div>
    );
};

export default QuranSurah;