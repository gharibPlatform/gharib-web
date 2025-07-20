import { useEffect, useRef, useState } from "react";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import useQuranHeaderPage from "../../../stores/pageQuranHeaderStore";
import useShouldFetch from "../../../stores/shouldFetch";

import QuranSurah from "./quran content/QuranSurah";
import QuranFooter from "./QuranFooter";
import ProgressTrackerLine from "../progress tracker line/ProgressTrackerLine";
import KhatmasInQuran from "./KhatmasInQuran";

import { getChapter, verseByPageAndChapter } from "../../../utils/quran/quran";
import { verseByPage, verseByChapter } from "../../../utils/quran/quran";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast from "react-hot-toast";
import VersePopup from "./quran content/VersePopup";
import { audioByVerse } from "../../../utils/quran/quranAudio";

export default function QuranContent() {
  const scrollRef = useRef(null);
  const [cache, setCache] = useState({});
  const [addedPage, setAddedPage] = useState([]);
  const [lastFetchedPage, setLastFetchedPage] = useState();

  const { quranHeaderPage } = useQuranHeaderPage();
  const {
    quranHeaderChapter,
    setPriority,
    setQuranHeaderChapter,
    setGoToPath,
  } = useQuranHeaderChapter();
  const { shouldFetch } = useShouldFetch();

  const [currentVerse, setCurrentVerse] = useState();
  const totalVersesInChapter = quranHeaderChapter?.verses_count || 1;
  const [progress, setProgress] = useState(0);
  const rate = 100 / totalVersesInChapter;

  //fetch for one page
  useEffect(() => {
    if (shouldFetch !== "page") return;
    let isMounted = true;

    verseByPage(quranHeaderPage).then((updatedCache) => {
      if (
        !quranHeaderChapter ||
        quranHeaderChapter.id !== updatedCache[0].verse_key.split(":")[0]
      ) {
        getChapter(updatedCache[0].verse_key.split(":")[0]).then((resp) => {
          setQuranHeaderChapter(resp);
          setGoToPath(false);
        });
      }
      if (isMounted) {
        const tempObj = { [quranHeaderPage]: updatedCache };
        setCache(tempObj);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [quranHeaderPage]);

  //fetch for one chapter
  useEffect(() => {
    if (shouldFetch !== "chapter") return;
    let isMounted = true;

    verseByChapter(quranHeaderChapter.id).then((updatedCache) => {
      if (isMounted) {
        const keys = Object.keys(updatedCache);
        setLastFetchedPage(+keys[keys.length - 1]);
        setCache(updatedCache);
        setPriority(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [quranHeaderChapter]);

  //scroll to apply lazy loading and fetch surah while scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollHeight = scrollRef.current.scrollHeight;
    const scrollTop = scrollRef.current.scrollTop;
    const innerHeight = window.innerHeight;

    if (scrollTop + innerHeight + 3600 >= scrollHeight) {
      if (lastFetchedPage) {
        verseByPageAndChapter(lastFetchedPage + 1, quranHeaderChapter.id).then(
          (resp) => {
            setAddedPage(resp);
          }
        );
        setLastFetchedPage(lastFetchedPage + 1);
      }
    }
  };

  // updating the cache
  useEffect(() => {
    if (addedPage && addedPage.length > 0 && addedPage[0]) {
      setCache({ ...cache, [addedPage[0].page_number]: addedPage });
    }
  }, [addedPage]);

  // onscroll update the cache
  useEffect(() => {
    const scrollableDiv = scrollRef.current;
    if (!scrollableDiv) return;

    scrollableDiv.addEventListener("scroll", handleScroll);

    return () => {
      scrollableDiv.removeEventListener("scroll", handleScroll);
    };
  }, [lastFetchedPage]);

  //change the progress for the tracker line
  const changeProgress = (verseKey) => {
    setCurrentVerse(verseKey);
    setProgress(verseKey * rate);
  };

  //hide header and footer when scrolling
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = scrollRef.current.scrollTop;
      const scrollDirection =
        currentScroll > lastScrollTop.current ? "down" : "up";

      if (scrollDirection === "down" && currentScroll > 50) {
        setIsFooterVisible(false);
        setIsHeaderVisible(false);
      } else {
        setIsFooterVisible(true);
        setIsHeaderVisible(true);
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //list of khatmas to test
  const khatmas = [
    {
      name: "Khatma 1",
      startingVerse: "2:1",
      endingVerse: "2:50",
    },
    {
      name: "Khatma 2",
      startingVerse: "2:51",
      endingVerse: "2:100",
    },
    {
      name: "Khatma 3",
      startingVerse: "2:101",
      endingVerse: "2:150",
    },
    {
      name: "Khatma 4",
      startingVerse: "2:151",
      endingVerse: "2:200",
    },
    {
      name: "Khatma 5",
      startingVerse: "2:201",
      endingVerse: "3:100",
    },
  ];

  const [khatmasWithProgress, setKhatmasWithProgress] = useState(khatmas);
  const [showKhatmas, setShowKhatmas] = useState(false);

  //updating progress of the khatmas logic
  useEffect(() => {
    const updated = khatmas.map((khatma) => {
      const startingVerse = parseInt(khatma.startingVerse.split(":")[1]);
      const startingChapter = parseInt(khatma.startingVerse.split(":")[0]);

      const endingVerse = parseInt(khatma.endingVerse.split(":")[1]);
      const endingChapter = parseInt(khatma.endingVerse.split(":")[0]);

      //NEW KHATMA CALCULATING LOGIC HERE :

      //calculating the total for each khamta
      // let totalVerses = 0;

      // //either : khatma starting and ending both in the same chapter
      // if (startingChapter === endingChapter) {
      //     totalVerses = endingVerse - startingVerse + 1;
      // }

      // //or : khamta starting chapter and ending chapter are different
      // else{
      //     totalVerses += //verses count of the first chapter - the starting verses count + 1 ;

      //     for ( let chapter = startingChapter + 1; chapter < endingChapter; chapter++ ) {
      //         totalVerses += //verses count of this chapter
      //     }

      //     totalVerses += //vereses count of the ending chapter
      // }

      // //calculating the completed verses

      // let completedVerses = 0;

      // //case 1 : still not reached
      // if (quranHeaderChapter.id < startingChapter || quranHeaderChapter.id === startingChapter && currentVerse < startingVerse) {
      //     completedVerses = 0;
      // }

      // //case 2 : ended
      // else if (quranHeaderChapter.id > endingChapter || quranHeaderChapter.id === endingChapter && currentVerse > endingVerse) {
      //     completedVerses = totalVerses;
      // }

      // //case 3 : in progress
      // else {
      //     //case1 : both same chapter
      //     if( quranHeaderChapter.id  === startingChapter ) {
      //         completedVerses += currentVerse - startingVerse + 1;
      //     }

      //     //case 2 : in between
      //     else if ( quranHeaderChapter.id > startingChapter && quranHeaderChapter.id < endingChapter ) {
      //         completedVerses += //verses count of the staring chapter

      //         for (let chapter = startingChapter + 1; chapter < quranHeaderChapter.id ; chapter++) {
      //             completedVerses += //verses couhnt of the chapter
      //         }

      //         completedVerses += currentVerse;
      //     }

      //     //case 3: at the end
      //     else if ( quranHeaderChapter.id === endingChapter ) {
      //         completedVerses += //verses count of the staring chapter

      //         for (let chapter = startingChapter + 1; chapter < endingChapter; chapter++) {
      //             completedVerses += //count of the chapter
      //         }

      //         completedVerses += currentVerse;
      //     }
      // }

      // let progress = (completedVerses / totalVerses ) * 100;

      // return{
      //     ...khatma,
      //     progress: Math.min(Math.max(0, progress), 100)
      // }

      //old logic used for now:/
      let progress = 0;

      if (
        currentVerse >= startingVerse &&
        currentVerse <= endingVerse &&
        startingChapter === endingChapter &&
        startingChapter === quranHeaderChapter.id &&
        endingChapter === quranHeaderChapter.id
      ) {
        const totalVerses = endingVerse - startingVerse + 1;
        const current = currentVerse - startingVerse + 1;
        progress = (current / totalVerses) * 100;
      }

      return {
        ...khatma,
        progress:
          currentVerse > endingVerse &&
          startingChapter === quranHeaderChapter.id &&
          endingChapter === quranHeaderChapter.id
            ? 100
            : Math.min(Math.max(progress, 0), 100),
      };
    });

    setKhatmasWithProgress(updated);
  }, [currentVerse]);

  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [clickBoxBool, setClickBoxBool] = useState(false);
  const boxRef = useRef(null);

  //closing the pop up when clikcing outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setClickBoxBool(false);
      }
    };

    if (clickBoxBool) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [clickBoxBool]);

  //closing the pop up when scrolling
  useEffect(() => {
    if (!clickBoxBool) return;

    const handleScroll = () => {
      setClickBoxBool(false);
    };

    const scrollContainer = scrollRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [clickBoxBool]);

  //playing the verse when clickng
  const [verseKey, setVerseKey] = useState();
  const playVerse = () => {
    setClickBoxBool(false);
    audioByVerse(1, verseKey).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <ProgressTrackerLine progress={progress} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar relative"
      >
        <div className="sticky top-10 right-5 float-right z-30 flex justify-end">
          <div className="flex flex-col items-end">
            <button
              onClick={() => setShowKhatmas(!showKhatmas)}
              className="p-2 bg-[var(--main-color)] border border-[var(--g-color)] text-[var(--g-color)] rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              {showKhatmas ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {showKhatmas && (
              <div className="mt-2 p-2 rounded-lg shadow-lg flex flex-col gap-1 border border-[var(--main-color)]">
                {khatmasWithProgress.map((khatma) => (
                  <KhatmasInQuran
                    key={khatma.name}
                    name={khatma.name}
                    percentage={Math.round(khatma.progress || 0)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <QuranSurah
          cache={cache}
          changeProgress={changeProgress}
          setClickBoxBool={setClickBoxBool}
          setBoxPosition={setBoxPosition}
          setVerseKey={setVerseKey}
        />

        {clickBoxBool && (
          <div ref={boxRef}>
            <VersePopup
              left={boxPosition.x}
              top={boxPosition.y + (scrollRef.current?.scrollTop || 0)}
              playVerse={playVerse}
            />
          </div>
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out 
                            ${isFooterVisible ? "max-h-[500px] opacity-100 py-2" : "max-h-0 opacity-0 overflow-hidden"}
                            `}
      >
        <QuranFooter />
      </div>
    </div>
  );
}
