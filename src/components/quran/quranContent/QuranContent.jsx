import { useEffect, useRef, useState } from "react";
import useQuranHeaderChapter from "../../../stores/chapterQuranHeaderStore";
import useQuranHeaderPage from "../../../stores/pageQuranHeaderStore";
import useShouldFetch from "../../../stores/shouldFetchStore";
import useQuranHeaderVerse from "../../../stores/verseQuranHeaderStore";
import useKhatmaStore from "../../../stores/khatmasStore";

import { verseByKey } from "../../../utils/quran/quran";
import { tafsirByKey } from "../../../utils/quran/quran";

import QuranSurah from "./QuranSurah";
import QuranFooter from "../QuranFooter";
import ProgressTrackerLine from "../../common/progress tracker line/ProgressTrackerLine";
import CurrentKhatma from "../quranKhatmas/CurrentKhatma";
import QuranVerseModal from "./QuranVerseModal";
import FooterContainer from "./FooterContainer";
import VersePopupController from "./VersePopupController";
import verseIndexMap from "../../../../verseIndexMap.json";
import UpdateProgressModal from "./updateProgressModal";
import QuranVerseTranslateModal from "./QuranVerseTranslateModal";
import QuranVeseTafsirModal from "./QuranVerseTafsirModal";

import { useFetchChapterData } from "../../../hooks/quran/useFetchChapterData";
import { useFetchPageData } from "../../../hooks/quran/useFetchPageData";
import { useHeaderFooterVisibility } from "../../../hooks/quran/useHeaderFooterVisibility";
import { useKhatmaProgress } from "../../../hooks/quran/useKhatmaProgress";
import { usePlayVerse } from "../../../hooks/quran/usePlayVerse";
import { useProgress } from "../../../hooks/quran/useProgress";
import { useScrollHandling } from "../../../hooks/quran/useScrollHandling";
import { useCurrentReadVerse } from "../../../hooks/quran/useCurrentReadVerse";
import { usePopupInteractions } from "../../../hooks/quran/usePopupInteractions";
import { useCacheUpdates } from "../../../hooks/quran/useCacheUpdates";
import { useHighlightVerse } from "../../../hooks/quran/useHighlightVerse";

export default function QuranContent({
  isLoadingUserKhatmas,
  isKhatmaMode,
  isLoadingKhatmaDetails,
  userKhatmas,
}) {
  const [cache, setCache] = useState({});
  const [addedPage, setAddedPage] = useState([]);
  const [lastFetchedPage, setLastFetchedPage] = useState();
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const [clickBoxBool, setClickBoxBool] = useState(false);
  const [verseKey, setVerseKey] = useState();
  const [showHighlightsConfirmation, setShowHighlightsConfirmation] =
    useState(false);

  const [showTranslateConfirmation, setShowTranslateConfirmation] =
    useState(false);

  const [showTafsirConfirmation, setShowTafsirConfirmation] = useState(false);
  const [translation, setTranslation] = useState(null);
  const [tafsir, setTafsir] = useState(null);

  const lastScrollTop = useRef(0);
  const scrollRef = useRef(null);
  const boxRef = useRef(null);

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
  const { currentKhatma, khatmaDetails } = useKhatmaStore();

  const [isLoadingQuranData, setIsLoadingQuranData] = useState(true);
  const [isLoadingCurrentKhatma, setIsLoadingCurrentKhatma] = useState(true);
  const [loadedPages, setLoadedPages] = useState([]);

  useFetchPageData(
    shouldFetch,
    quranHeaderPage,
    quranHeaderChapter,
    setQuranHeaderChapter,
    setGoToPath,
    setCache,
    setIsLoadingQuranData
  );
  useFetchChapterData(
    shouldFetch,
    quranHeaderChapter,
    currentKhatma,
    setCache,
    setLastFetchedPage,
    setPriority,
    setIsLoadingQuranData,
    setLoadedPages
  );

  useScrollHandling(
    scrollRef,
    lastFetchedPage,
    quranHeaderChapter,
    currentKhatma,
    setAddedPage,
    setLastFetchedPage
  );

  useCacheUpdates(cache, addedPage, setCache);

  useHeaderFooterVisibility(scrollRef, lastScrollTop, setIsFooterVisible);
  usePopupInteractions(clickBoxBool, boxRef, scrollRef, setClickBoxBool);

  const currentReadVerse = useCurrentReadVerse(currentKhatma, quranHeaderVerse);
  const progress = useProgress(quranHeaderVerse, quranHeaderChapter);

  const [
    khatmaSelfProgress,
    khatmaGroupProgress,
    currentVerseProgress,
    currentSurahProgress,
  ] = useKhatmaProgress(
    currentKhatma,
    khatmaDetails,
    quranHeaderChapter,
    currentReadVerse,
    verseIndexMap
  );

  const playVerse = usePlayVerse(setClickBoxBool, verseKey);
  const handleHighlightVerse = useHighlightVerse(
    setClickBoxBool,
    setShowHighlightsConfirmation
  );

  const handleTranslateVerse = () => {
    verseByKey(activeVerse.verse_key).then((resp) => {
      setTranslation(resp.translations[0].text);
    });
    setShowTranslateConfirmation(true);
  };

  const handleTafsirVerse = () => {
    tafsirByKey(activeVerse.verse_key).then((resp) => {
      setTafsir(resp.text);
      console.log("tafsir is :", resp);
    });
    setShowTafsirConfirmation(true);
  };

  const isDirty = khatmaSelfProgress < currentKhatma?.progress;
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);
  const { readVersesKeys } = useKhatmaStore();

  const [userKhatmasProgress, setUserKhatmasProgress] = useState([]);
  const handleUpdateProgress = () => {
    const newUserKhatmasProgress = [];

    userKhatmas.forEach((khatma) => {
      const versesInThisKhatma = readVersesKeys.filter((verseKey) => {
        const [surah, ayah] = verseKey.split(":").map(Number);

        if (surah < khatma.currentSurah || surah > khatma.endShareSurah)
          return false;

        if (surah === khatma.currentSurah && ayah < khatma.currentVerse)
          return false;
        if (surah === khatma.endShareSurah && ayah > khatma.endShareVerse)
          return false;

        return true;
      });

      const data = {
        versesInThisKhatma,
        khatma,
      };
      newUserKhatmasProgress.push(data);
    });

    setUserKhatmasProgress(newUserKhatmasProgress);
    setShowUpdateProgressModal(true);
  };

  useEffect(() => {
    console.log("loaded pages are : ", loadedPages);
  }, [loadedPages]);

  const isLoading =
    isLoadingQuranData || isLoadingUserKhatmas || isLoadingKhatmaDetails;

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
            selfProgress={Math.floor(khatmaSelfProgress * 100) / 100}
            groupProgress={Math.floor(khatmaGroupProgress * 100) / 100}
            isDirty={isDirty}
            handleUpdateProgress={handleUpdateProgress}
          />
        )}

        {showUpdateProgressModal && (
          <UpdateProgressModal
            isOpen={showUpdateProgressModal}
            setIsOpen={setShowUpdateProgressModal}
            userKhatmasProgress={userKhatmasProgress}
          />
        )}

        <QuranSurah
          cache={cache}
          setClickBoxBool={setClickBoxBool}
          setBoxPosition={setBoxPosition}
          setVerseKey={setVerseKey}
          currentKhatma={currentKhatma}
          currentReadVerse={currentReadVerse}
          isLoading={isLoading}
          totalPages={
            quranHeaderChapter?.pages[1] - quranHeaderChapter?.pages[0] + 1
          }
        />

        <VersePopupController
          clickBoxBool={clickBoxBool}
          boxRef={boxRef}
          boxPosition={boxPosition}
          scrollRef={scrollRef}
          playVerse={playVerse}
          setClickBoxBool={setClickBoxBool}
          handleHighlightVerse={handleHighlightVerse}
          translateVerse={handleTranslateVerse}
          handleTafsirVerse={handleTafsirVerse}
        />

        {showHighlightsConfirmation && (
          <QuranVerseModal
            create={true}
            verse={activeVerse}
            onClose={() => setShowHighlightsConfirmation(false)}
          />
        )}

        {showTranslateConfirmation && (
          <QuranVerseTranslateModal
            translation={translation}
            verse={activeVerse}
            onClose={() => setShowTranslateConfirmation(false)}
          />
        )}

        {showTafsirConfirmation && (
          <QuranVeseTafsirModal
            tafsir={tafsir}
            verse={activeVerse}
            onClose={() => setShowTafsirConfirmation(false)}
          />
        )}
      </div>

      {/*      <FooterContainer isVisible={isFooterVisible}>
        <QuranFooter />
      </FooterContainer>*/}
    </div>
  );
}
