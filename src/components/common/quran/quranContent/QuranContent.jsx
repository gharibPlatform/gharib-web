import { useEffect, useMemo, useRef, useState } from "react";
import useQuranHeaderChapter from "../../../../stores/chapterQuranHeaderStore";
import useQuranHeaderPage from "../../../../stores/pageQuranHeaderStore";
import useShouldFetch from "../../../../stores/shouldFetchStore";

import QuranSurah from "./QuranSurah";
import QuranFooter from "../QuranFooter";
import ProgressTrackerLine from "../../progress tracker line/ProgressTrackerLine";
import CurrentKhatma from "../quranKhatmas/CurrentKhatma";
import { useKhatmaProgress } from "../../../../hooks/useKhatmaProgress";

import {
  getChapter,
  verseByPageAndChapter,
} from "../../../../utils/quran/quran";
import { verseByPage, verseByChapter } from "../../../../utils/quran/quran";

import VersePopup from "./VersePopup";
import { audioByVerse } from "../../../../utils/quran/quranAudio";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";
import useKhatmaStore from "../../../../stores/khatmasStore";
import QuranVerseModal from "./QuranVerseModal";

export default function QuranContent({ isLoadingUserKhatmas }) {
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

  const { quranHeaderVerse, activeVerse, setActiveVerse } =
    useQuranHeaderVerse();
  const { shouldFetch } = useShouldFetch();

  const { currentKhatma } = useKhatmaStore();

  const totalVersesInChapter = quranHeaderChapter?.verses_count || 1;
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
  const progress = useMemo(() => {
    return quranHeaderVerse * rate;
  }, [quranHeaderVerse]);

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

  const { khatmaSelfMembership, khatmaDetails, quranChapters, userKhatmas } =
    useKhatmaStore();
  const {
    userProgress,
    loading: progressLoading,
    currentChapter,
  } = useKhatmaProgress(khatmaSelfMembership, khatmaDetails, quranChapters);

  useEffect(() => {
    if (!userProgress) return;

    const updated = khatmas.map((khatma) => {
      return {
        ...khatma,
        progress: Math.min(Math.max(userProgress.percentage, 0), 100),
      };
    });

    setKhatmasWithProgress(updated);
  }, [userProgress?.percentage]);

  useEffect(() => {
    console.log("here is userProgress ", userProgress);
  }, [userProgress]);

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

  const [showHighlightsConfirmation, setShowHighlightsConfirmation] =
    useState(false);

  const handleHighlightVerse = () => {
    setClickBoxBool(false);
    setShowHighlightsConfirmation(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {shouldFetch === "chapter" && <ProgressTrackerLine progress={progress} />}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar relative"
      >
        {currentKhatma && (
          <CurrentKhatma
            name={currentKhatma?.khatma?.name}
            group={currentKhatma?.khatma?.group_data?.name}
            finishDate={currentKhatma?.finishDate}
            currentSurah={currentKhatma?.currentSurah}
            currentVerse={currentKhatma?.currentVerse}
            progress={currentKhatma?.khatma?.progress}
            selfProgress={currentKhatma?.progress}
          />
        )}

        <QuranSurah
          cache={cache}
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
              setClickBoxBool={setClickBoxBool}
              handleHighlightVerse={handleHighlightVerse}
            />
          </div>
        )}

        {showHighlightsConfirmation && (
          <QuranVerseModal
            create={true}
            verse={activeVerse}
            onClose={() => setShowHighlightsConfirmation(false)}
          />
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
