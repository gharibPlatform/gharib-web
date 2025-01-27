import QuranHeader from "./QuranHeader";
import QuranSurah from "./QuranSurah";

export default function QuranContent() {

    return (
        <div className="w-full h-2">
            <div className="flex flex-col justify-center pt-6">
                <QuranHeader />
                <QuranSurah />
            </div>
        </div>
    );
}
