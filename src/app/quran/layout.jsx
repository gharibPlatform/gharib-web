"use client";
import Header from "../../components/common/header/Header";
import QuranRightBar from "../../components/common/quran/quranRightbar/QuranRightBar";
import SideBar from "../../components/common/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuranVerseModal from "../../components/common/quran/quranContent/QuranVerseModal";
import QuranSidebar from "../../components/common/quran/quranSidebar/QuranSidebar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useQuranHighlightStore from "../../stores/quranHighlightStore";
import useKhatmaStore from "../../stores/khatmasStore";

const Layout = ({ children }) => {
  const [showRightBar, setShowRightBar] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedHighlight, setSelectedHighlight] = useState(null); // Add this
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleRightBar = () => setShowRightBar(!showRightBar);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleVerseClick = (verse, highlightContent, highlightCreatedAt) => {
    setSelectedVerse(verse);
    setSelectedHighlight({
      content: highlightContent,
      created_at: highlightCreatedAt,
    });
  };

  const closeModal = () => {
    setSelectedVerse(null);
    setSelectedHighlight(null);
  };

  const { quranHighlights, fetchQuranHighlights } = useQuranHighlightStore();
  const [isLoadingHighlights, setIsLoadingHihglights] = useState(true);

  useEffect(() => {
    fetchQuranHighlights();
  }, []);

  useEffect(() => {
    if (quranHighlights) {
      setIsLoadingHihglights(false);
      console.log("actual quranHighlights are here : ", quranHighlights);
    }
  }, [quranHighlights]);

  const [isLoadingKhatmas, setIsLoadingKhatmas] = useState();
  const { userKhatmas, fetchUserKhatmas } = useKhatmaStore();

  useEffect(() => {
    if (userKhatmas) return;
    const fetch = async () => {
      try {
        await fetchUserKhatmas();
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    console.log("Done");
  }, []);

  useEffect(() => {
    userKhatmas ? setIsLoadingKhatmas(false) : setIsLoadingKhatmas(true);
    console.log("userkhatmas are : ", userKhatmas);
  }, [userKhatmas]);

  return (
    <div className="w-screen overflow-hidden h-screen flex flex-col">
      {selectedVerse && (
        <QuranVerseModal
          verse={selectedVerse}
          highlight={selectedHighlight}
          onClose={closeModal}
        />
      )}

      <Header />
      <div className="flex overflow-hidden relative">
        <SideBar />
        {showSidebar && <QuranSidebar onClose={toggleSidebar} />}

        {showSidebar ? (
          <></>
        ) : (
          <button
            onClick={toggleSidebar}
            className="p-2 absolute cursor-pointer top-1/2 left-14 z-50 bg-[var(--main-color)] border border-[var(--g-color)] text-[var(--g-color)] rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            {showSidebar ? <></> : <FiChevronRight />}
          </button>
        )}

        <div className="flex w-full overflow-hidden">
          <div className="h-screen flex-grow relative">{children}</div>
        </div>

        {showRightBar && (
          <QuranRightBar
            handleVerseClick={handleVerseClick} 
            onClose={toggleRightBar}
            highlights={quranHighlights}
            userKhatmas={userKhatmas}
            isLoadingKhatmas={isLoadingKhatmas}
            isLoadingHighlights={isLoadingHighlights}
          />
        )}

        {showRightBar ? (
          <></>
        ) : (
          <button
            onClick={toggleRightBar}
            className="p-2 absolute top-1/2 right-0 bg-[var(--main-color)] border border-[var(--g-color)] text-[var(--g-color)] rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            {showRightBar ? <></> : <FiChevronLeft />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Layout;
