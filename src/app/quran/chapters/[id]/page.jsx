'use client'
import QuranContent from "@/components/common/quran/QuranContent";
import { useParams } from "next/navigation";
import { getChapter } from "@/utils/quran/quran";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";

const Page = () => {
    const { id } = useParams();
    const setQuranHeaderChapter = useQuranHeaderChapter((state) => state.setQuranHeaderChapter);
    getChapter(id)
    .then((resp) => {
        setQuranHeaderChapter(resp);
    })
    
    return (
        <div>
            <QuranContent />
        </div>
    );
};

export default Page;
