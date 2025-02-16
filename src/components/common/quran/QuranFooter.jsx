import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import { getChapter } from "@/utils/quran/quran";
import { useRouter } from "next/navigation";
import useBeginningOfTheSurah from "@/stores/begginingOfTheSurah";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import { useParams } from "next/navigation";

export default function QuranFooter() {
    const { quranHeaderChapter, setQuranHeaderChapter } = useQuranHeaderChapter();
    const { quranHeaderPage, setQuranHeaderPage } = useQuranHeaderPage();
    const setBeginningOfTheSurah = useBeginningOfTheSurah((state) => state.setBeginningOfTheSurah);

    const router = useRouter();
    const PreviousSurah = () => {
        getChapter(quranHeaderChapter.id - 1)
        .then((resp) => {
            setQuranHeaderChapter(resp);
        })
        router.push(`/quran/chapters/${quranHeaderChapter.id - 1}`)
    };

    const NextSurah = () => {
        getChapter(quranHeaderChapter.id + 1)
        .then((resp) => {
            setQuranHeaderChapter(resp);
        })
        router.push(`/quran/chapters/${quranHeaderChapter.id + 1}`)
    };

    const PreviousPage = () => {
        const newPage = Number(quranHeaderPage) - 1; 
        setQuranHeaderPage(newPage); 
        router.push(`/quran/pages/${newPage}`);
    };
    
    const NextPage = () => {
        const newPage = Number(quranHeaderPage) + 1; 
        setQuranHeaderPage(newPage); 
        router.push(`/quran/pages/${newPage}`);
    };


    const SurahFooter = () => {
        return(
            <div className="flex gap-8 pb-32 justify-center pt-8">
                <div 
                    className="transition-all duration-75 ease p-4 pl-6 flex items-center border border-[var(--g-color)] text-[var(--lighter-color)] text-xl gap-3 rounded-[6px] cursor-pointer hover:border-[var(--w-color)] hover:text-[var(--w-color)]"
                    onClick={PreviousSurah}
                >
                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 20L7 12L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2>Previous Surah</h2>
                </div>
                
                <div onClick={() => setBeginningOfTheSurah(true)} className="transition-all duration-75 ease p-4 pl-6 flex items-center border border-[var(--g-color)] text-[var(--lighter-color)] text-xl gap-3 rounded-[6px] cursor-pointer hover:border-[var(--w-color)] hover:text-[var(--w-color)]">
                    <h2>Beginning of Surah</h2>
                </div>

                <div 
                    className="transition-all duration-75 ease p-4 pl-6 flex items-center border border-[var(--g-color)] text-[var(--lighter-color)] text-xl gap-3 rounded-[6px] cursor-pointer hover:border-[var(--w-color)] hover:text-[var(--w-color)]"
                    onClick={NextSurah}
                >
                    <svg style={{ rotate: "180deg" }} className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 20L7 12L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2>Next Surah</h2>
                </div>
            </div>
        )
    }

    const PageFooter = () => {
        return(
            <div className="flex gap-8 pb-32 justify-center pt-8">
                <div 
                    className="transition-all duration-75 ease p-4 pl-6 flex items-center border border-[var(--g-color)] text-[var(--lighter-color)] text-xl gap-3 rounded-[6px] cursor-pointer hover:border-[var(--w-color)] hover:text-[var(--w-color)]"
                    onClick={PreviousPage}
                >
                    <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 20L7 12L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2>Previous Page</h2>
                </div>
                
                <div 
                    className="transition-all duration-75 ease p-4 pl-6 flex items-center border border-[var(--g-color)] text-[var(--lighter-color)] text-xl gap-3 rounded-[6px] cursor-pointer hover:border-[var(--w-color)] hover:text-[var(--w-color)]"
                    onClick={NextPage}
                >
                    <svg style={{ rotate: "180deg" }} className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 20L7 12L15 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2>Next Page</h2>
                </div>
            </div>
        )
    }

    return (
        <div>
            {quranHeaderChapter ? (
                <SurahFooter />
                
            ) : (
                <PageFooter />
            )}
        </div>
    );
}
