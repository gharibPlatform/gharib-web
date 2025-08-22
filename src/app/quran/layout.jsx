"use client";
import Header from "../../components/common/header/Header";
import QuranRightBar from "../../components/common/quran/QuranRightBar";
import SideBar from "../../components/common/sidebar/Sidebar";
import { useState, useEffect } from "react";
import QuranVerseModal from "../../components/common/quran/quran content/QuranVerseModal";
import QuranSidebar from "../../components/common/quran/quran_sidebar/QuranSidebar";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useQuranHighlightStore from "../../stores/quranHighlightStore";

const Layout = ({ children }) => {
  const [showRightBar, setShowRightBar] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleRightBar = () => setShowRightBar(!showRightBar);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const handleVerseClick = (verse) => setSelectedVerse(verse);
  const closeModal = () => setSelectedVerse(null);

  const { quranHighlights, fetchQuranHighlights } = useQuranHighlightStore();
  const [isLoadingHighlights, setIsLoadingHihglights] = useState(true);

  useEffect(() => {
    fetchQuranHighlights();
  }, []);

  useEffect(() => {
    if (quranHighlights) {
      setIsLoadingHihglights(false);
      console.log("actual quranHighlights is here : ", quranHighlights);
    }
  }, [quranHighlights]);

  return (
    <div className="w-screen overflow-hidden h-screen flex flex-col">
      {selectedVerse && (
        <QuranVerseModal verse={selectedVerse} onClose={closeModal} />
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
