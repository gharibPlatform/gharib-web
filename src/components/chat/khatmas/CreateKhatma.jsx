import { useState, useRef, useEffect, use } from "react";
import { listChapters } from "@/utils/quran/quran";
import QuranHeaderSection from "@/components/common/quran/quran header/QuranHeaderSection";
import ChapterDropdown from "@/components/common/quran/quran header/dropdown/ChapterDropdown";
import VerseDropdown from "@/components/common/quran/quran header/dropdown/VerseDropdown";
import PageDropdown from "@/components/common/quran/quran header/dropdown/PageDropdown";
import useQuranHeaderChapter from "@/stores/chapterQuranHeaderStore";
import useQuranHeaderVerse from "@/stores/verseQuranHeaderStore";
import useQuranHeaderPage from "@/stores/pageQuranHeaderStore";
import { createKhatma } from "@/utils/apiKhatma";
import { useKhatmaContext } from "@/context/KhatmaContext";
import { getUserData } from "@/utils/userAuth";

const QuranHeader = ({ selectionType }) => {
    const [quranHeaderData, setQuranHeaderData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const chapterButtonRef = useRef(null);
    const verseButtonRef = useRef(null);
    const pageButtonRef = useRef(null);
    
    const dropdownRef = useRef(null);

    // Different hooks for different purpose (from and to)
    // Chapter
    const fromChapter = useQuranHeaderChapter((state) => state.fromChapter);
    const setFromChapter = useQuranHeaderChapter((state) => state.setFromChapter);

    const toChapter = useQuranHeaderChapter((state) => state.toChapter);
    const setToChapter = useQuranHeaderChapter((state) => state.setToChapter);

    const selectedChapter = selectionType === "from" ? fromChapter : toChapter;
    const setSelectedChapter = selectionType === "from" ? setFromChapter : setToChapter;

    // Page
    const fromPage = useQuranHeaderPage((state) => state.fromPage);
    const setFromPage = useQuranHeaderPage((state) => state.setFromPage);

    const toPage = useQuranHeaderPage((state) => state.toPage);
    const setToPage = useQuranHeaderPage((state) => state.setToPage);

    const selectedPage = selectionType === "from" ? fromPage : toPage;
    const setSelectedPage = selectionType === "from" ? setFromPage : setToPage;

    // Verse
    const fromVerse = useQuranHeaderVerse((state) => state.fromVerse);
    const setFromVerse = useQuranHeaderVerse((state) => state.setFromVerse);

    const toVerse = useQuranHeaderVerse((state) => state.toVerse);
    const setToVerse = useQuranHeaderVerse((state) => state.setToVerse);

    const selectedVerse = selectionType === "from" ? fromVerse : toVerse;
    const setSelectedVerse = selectionType === "from" ? setFromVerse : setToVerse;

    // logic to hanle when the user choses a starting chapter or verse or page that is greater than the ending chapter or verse or page
    useEffect(() => {
        if (selectedPage && toPage) {
            if (toPage < selectedPage) {
                setToPage(selectedPage);
                setSelectedPage(toPage);
            }
        }
        
        if (selectedChapter && toChapter) {
            if (toChapter.id < selectedChapter.id) {
                setToChapter(selectedChapter);
                setSelectedChapter(toChapter);
            }
        }

        if (selectedChapter && toChapter) {
            if (selectedChapter.id === toChapter.id) {
                if (selectedVerse && toVerse) {
                    if (toVerse < selectedVerse) {
                        setToVerse(selectedVerse);
                        setSelectedVerse(toVerse);
                    }
                }
            } else if (toChapter.id < selectedChapter.id) {
                setToChapter(selectedChapter);
                setSelectedChapter(toChapter);
            }
        }

    }, [selectedPage, toPage, selectedChapter, toChapter, selectedVerse, toVerse]);

    useEffect(() => {
            listChapters().then((resp) => {
                setQuranHeaderData(resp);
            });
        }, []);
    
        const [sections, setSections] = useState({
            chapter: { rotation: 90, isOpen: false },
            verse: { rotation: 90, isOpen: false },
            page: { rotation: 90, isOpen: false },
        });
    
        const toggleSection = (section, e) => {
            e.stopPropagation();
            setSections((prev) => ({
                ...prev,
                [section]: {
                    rotation: prev[section].isOpen ? 90 : 270,
                    isOpen: !prev[section].isOpen,
                },
            }));
        };

    const handleClickOutside = (event) => {
        const isInsideChapterButton = chapterButtonRef.current && chapterButtonRef.current.contains(event.target);
        const isInsideVerseButton = verseButtonRef.current && verseButtonRef.current.contains(event.target);
        const isInsidePageButton = pageButtonRef.current && pageButtonRef.current.contains(event.target);
        const isInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);

        if (!isInsideDropdown && !isInsideChapterButton && !isInsideVerseButton && !isInsidePageButton) {
            setSections({
                chapter: { rotation: 90, isOpen: false },
                verse: { rotation: 90, isOpen: false },
                page: { rotation: 90, isOpen: false },
            });
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sectionsData = [
        { name: "Chapter", value: selectedChapter ? selectedChapter.name_simple : "Select Chapter", ref: chapterButtonRef },
        { name: "Verse", value: selectedVerse ? `Verse ${selectedVerse}` : "Select Verse", ref: verseButtonRef },
        { name: "Page", value: selectedPage ? `Page ${selectedPage}` : "Select Page", ref: pageButtonRef },
    ];

    const filteredChapters = quranHeaderData.filter((chapter) =>
        chapter.name_simple.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return(
        <div className="h-20 bg-[var(--dark-color)] rounded-sm flex justify-between px-6 ml-auto mr-auto scroll-mt-16 gap-2">
            {sectionsData.map((section, index) => (
                <QuranHeaderSection
                    key={index}
                    section={section}
                    sections={sections}
                    toggleSection={toggleSection}
                    buttonRef={section.ref} 
                    fontSize={14}
                >
                    {sections[section.name.toLowerCase()].isOpen && section.name === "Chapter" && (
                        <ChapterDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filteredChapters={filteredChapters}
                            onSelectChapter={(chapter, e) => {
                                setSelectedChapter(chapter)
                                setSelectedPage(null)
                                toggleSection(section.name.toLowerCase(), e);
                            }}
                        />
                    )}

                    {sections[section.name.toLowerCase()].isOpen && section.name === "Page" && (
                        <PageDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSelectPage={(page, e)=>{
                                setSelectedPage(page)
                                setSelectedChapter(null)
                                setSelectedVerse(null)
                                toggleSection(section.name.toLowerCase(), e)
                            }}
                        />
                    )}

                    {sections[section.name.toLowerCase()].isOpen && section.name === "Verse" && (
                        <VerseDropdown
                            dropdownRef={dropdownRef}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedChapter={selectedChapter}
                            onSelectVerse={(verse, e)=>{
                                toggleSection(section.name.toLowerCase(), e)
                                setSelectedPage(null)
                                setSelectedVerse(verse)
                            }}
                        />
                    )}
                </QuranHeaderSection>
            ))}
        </div>
    )
}
export default function CreateKhatma() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [khatmaName, setKhatmaName] = useState("");
    const [isLimited, setIsLimited] = useState(null);
    const [userLimit, setUserLimit] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [description, setDescription] = useState(null);

    const {fromChapter, toChapter} = useQuranHeaderChapter();
    const {fromPage, toPage} = useQuranHeaderPage();
    const {fromVerse, toVerse} = useQuranHeaderVerse();

    const [isPage, setIsPage] = useState(false);
    const [isChapter, setIsChapter] = useState(false);

    const inputRef = useRef(null);
    const errorsRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (fromPage || toPage) {
            setIsPage(true);
            setIsChapter(false);
        }

        if (fromChapter || toChapter || fromVerse || toVerse) {
            setIsChapter(true);
            setIsPage(false);
        }
    }, [fromChapter, toChapter, fromPage, toPage, fromVerse, toVerse]);

    const validateForm = async () => {
        const newErrors = {};

        if (!khatmaName) newErrors.khatmaName = "Khatma name is required"; 
        if (!selectedStartDate) newErrors.selectedStartDate = "Date from is required";
        if (!selectedEndDate) newErrors.selectedEndDate = "Date to is required";
        if (selectedStartDate && selectedEndDate && new Date(selectedStartDate) > new Date(selectedEndDate)) newErrors.selectedEndDate = "End date must be after start date.";
        if (isLimited === true && (!userLimit || userLimit <= 0)) newErrors.userLimit = "Please enter a valid number.";
        if (isLimited === null) newErrors.isLimited = "Please choose whether the khatma is limited or not";
        if (!description) newErrors.description = "Description is required";

        if (isPage) {
            if (!fromPage) newErrors.fromPage = "Starting page is required";
            if (!toPage) newErrors.toPage = "Ending page is required";
        }

        if (isChapter) {
            if (!fromChapter) newErrors.fromChapter = "Starting chapter is required";
            if (!toChapter) newErrors.toChapter = "Ending chapter is required";
            if (!fromVerse) newErrors.fromVerse = "Starting verse is required";
            if (!toVerse) newErrors.toVerse = "Ending verse is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            await submitForm();
        } else {
            if (errorsRef.current !== null) clearTimeout(errorsRef.current);
            errorsRef.current = setTimeout(() => {
                setErrors({});
            }, 5000);
        }
    };
    
    const submitForm = async () => {
        setIsSubmitting(true);
        setApiError(null);

        try {
            const userData = await getUserData();
            if (!userData?.id) {
                throw new Error("Could not determine user ID");
            }

            const requestBody = {
                name: khatmaName.trim(),     
                endDate: selectedEndDate,
                intentions: description,
                duaa: "no duaa",            
                startSurah: fromChapter,
                startVerse: fromVerse,
                endSurah: toChapter,
                endVerse: toVerse,
                progress: 0, 
                status: "ongoing",
                launcher: userData.id,       
                group: 13
            };

            console.log("Submitting Khatma:", requestBody); // Debug log

            const response = await createKhatma(requestBody);
            setShowConfirmation(true);
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            setApiError(error.response?.data?.error || "Failed to create khatma");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (errorsRef.current !== null) clearTimeout(errorsRef.current);
        };
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="no-scrollbar">
            <div className={`relative overflow-hidden no-scrollbar ${showConfirmation ? "w-[380px] h-[200px]" : "w-[700px] h-[600px]"}`}>
                <div
                    className={`no-scrollbar absolute inset-0 transition-opacity duration-500 overflow-y-auto hide-scrollbar ${
                        showConfirmation ? "opacity-0 pointer-events-none hidden w-1" : "opacity-100 visibility-visible"
                    }`}
                >
                    <div className="max-h-[1680px] pb-4 bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col">
                        <h2 className="text-[var(--w-color)] text-2xl py-4">Create Khatma</h2>

                        <div className="flex flex-col relative pl-6 gap-6">
                            {/* Name Input */}
                            <form className="flex gap-2 text-[var(--w-color)] flex-col">
                                <h2 className="text-lg font-semibold">Name :</h2>
                                <input
                                    ref={inputRef}
                                    value={khatmaName}
                                    onChange={(e) => setKhatmaName(e.target.value)}
                                    placeholder="Gharib"
                                    className="text-b outline-none flex-grow bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg gap-2"
                                    type="text"
                                />
                                {errors.khatmaName && <p className="text-[var(--r-color)]">{errors.khatmaName}</p>}
                            </form>

                            {/* Number of People Selection */}
                            <form className="flex gap-2 text-[var(--w-color)] flex-col">
                                <h2 className="text-lg font-semibold">Number of people :</h2>
                                <div className="flex gap-10">
                                    {/* Limited Option */}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="limit"
                                            checked={isLimited === true}
                                            onChange={() => setIsLimited(true)}
                                            className="hidden"
                                        />
                                        <div
                                            className={`w-5 h-5 border rounded-lg flex items-center justify-center ${
                                                isLimited === true ? "bg-[var(--b-color)]" : "bg-[var(--light-color)]"
                                            }`}
                                        ></div>
                                        Limited
                                    </label>

                                    {/* Unlimited Option */}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="limit"
                                            checked={isLimited === false}
                                            onChange={() => {
                                                setIsLimited(false);
                                                setUserLimit("");
                                            }}
                                            className="hidden"
                                        />
                                        <div
                                            className={`w-5 h-5 border rounded-lg flex items-center justify-center ${
                                                isLimited === false ? "bg-[var(--b-color)]" : "bg-[var(--light-color)]"
                                            }`}
                                        ></div>
                                        Unlimited
                                    </label>
                                </div>
                                {errors.isLimited && <p className="text-[var(--r-color)]">{errors.isLimited}</p>}

                                {isLimited && (
                                    <div className="mt-2">
                                        <h2>Specify Number of Users</h2>
                                        <input
                                            type="number"
                                            min="1"
                                            value={userLimit}
                                            onChange={(e) => setUserLimit(e.target.value)}
                                            className="outline-none bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg w-full"
                                            placeholder="Enter number of users"
                                        />
                                        {errors.userLimit && <p className="text-[var(--r-color)]">{errors.userLimit}</p>}
                                    </div>
                                )}
                            </form>

                            {/* Share Section */}
                            <container className="text-[var(--w-color)] flex-col gap-2">
                                <h2 className="text-lg font-semibold pb-4">Share :</h2>

                                <h2>From :</h2>
                                <QuranHeader selectionType={"from"} />
                                {errors.fromChapter && <p className="text-[var(--r-color)]">{errors.fromChapter}</p>}
                                {errors.fromVerse && <p className="text-[var(--r-color)]">{errors.fromVerse}</p>}
                                {errors.fromPage && <p className="text-[var(--r-color)]">{errors.fromPage}</p>}

                                <div className="pb-4"></div>

                                <h2>To :</h2>
                                <QuranHeader selectionType={"to"} />
                                {errors.toChapter && <p className="text-[var(--r-color)]">{errors.toChapter}</p>}
                                {errors.toVerse && <p className="text-[var(--r-color)]">{errors.toVerse}</p>}
                                {errors.toPage && <p className="text-[var(--r-color)]">{errors.toPage}</p>}
                            </container>

                            {/* Duration Section */}
                            <container className="text-[var(--w-color)] flex-col gap-2 cursor-pointer">
                                <h2 className="text-lg font-semibold pb-4">Duration :</h2>

                                <h2>From :</h2>
                                <input 
                                    type="datetime-local"
                                    className="bg-[var(--dark-color)] p-2"
                                    onChange={(e) => setSelectedStartDate(e.target.value)}
                                />
                                {errors.selectedStartDate && <p className="text-[var(--r-color)]">{errors.selectedStartDate}</p>}

                                <div className="pb-4"></div>

                                <h2>To :</h2>
                                <input 
                                    type="datetime-local"
                                    className="bg-[var(--dark-color)] p-2"
                                    onChange={(e) => setSelectedEndDate(e.target.value)}
                                />
                                {errors.selectedEndDate && <p className="text-[var(--r-color)]">{errors.selectedEndDate}</p>}
                            </container>

                            {/* Description Section */}
                            <form action="">
                                <h2 className="text-lg font-semibold text-[var(--w-color)] ">Description :</h2>
                                <textarea
                                    className="resize-none outline-none bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg w-full"
                                    placeholder="Enter description"
                                    rows="6"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <p className="text-[var(--r-color)]">{errors.description}</p>}
                            </form>

                            {apiError && (
                                <div className="text-[var(--r-color)]">
                                    {apiError}
                                </div>
                            )}
                        </div>

                        <div className="pb-4"></div>

                        {/* Submit Button */}
                        <button
                            className={`hover:bg-[var(--b-color-hover)] py-2 px-4 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={validateForm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Khatma"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Message */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 w-[360px] h-[200px] overflow-y-auto no-scrollbar ${
                    showConfirmation ? "opacity-100" : "opacity-0 pointer-events-none hidden"
                }`}
            >
                <div className="w-[360px] h-[200px] flex justify-center items-center border border-[var(--g-color)] flex-col p-6 bg-[var(--main-color)]">
                    <div className="text-[var(--w-color)] items-center justify-center text-lg text-center">
                        A confirmation request has been sent to the group admin. Please wait for their approval.
                    </div>
                </div>
            </div>
        </div>
    );
}
