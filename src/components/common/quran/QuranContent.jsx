import QuranHeader from "./QuranHeader";
import QuranSurah from "./QuranSurah";
import QuranFooter from "./QuranFooter";

export default function QuranContent() {

    return (
        <div className="w-full overflow-y-auto h-screen no-scrollbar flex flex-col ">
            <div className="flex flex-col justify-center pt-6">
                <QuranHeader />
                <QuranSurah />
                <QuranFooter />
            </div>
        </div>
    );
}
