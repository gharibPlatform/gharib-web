'use client'
import QuranContent from "@/components/common/quran/QuranContent";
import { useParams } from "next/navigation";
import { getChapter } from "@/utils/quran/quran";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import { useEffect } from "react";

const Page = () => {
    const { id } = useParams();
    const setQuranHeaderChapter = useQuranHeaderChapter((state) => state.setQuranHeaderChapter);
    useEffect(()=>{
        if (id >= 1 && id <= 114) {
            getChapter(id)
            .then((resp) => {
                setQuranHeaderChapter(resp);
            })            
        }
    }, [id])
    
    return (
        <div>
            <QuranContent />
        </div>
    );
};

export default Page;
