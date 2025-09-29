import { useEffect, useState, useRef } from "react";
import { FiSearch, FiX, FiPlus, FiAlertCircle } from "react-icons/fi";
import CreateDM from "./create_dm/CreateDM";
import DirectMessagesSection from "./direct_messages/DirectMessagesSection";
import useGroupStore from "../../stores/groupStore";

export default function ChatRightBar() {
  const [showCreateDM, setShowCreateDM] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const createDMRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (createDMRef.current && !createDMRef.current.contains(event.target)) {
        setShowCreateDM(false);
      }
    }
    if (showCreateDM) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCreateDM]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const { loadingGroups, errorGroups, fetchGroups } = useGroupStore();

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="w-[420px] border-r border-[var(--g-color)] bg-[var(--main-color)] flex flex-col h-full">
      {/* Header Section */}
      <div className="flex flex-col p-5 gap-4 border-b border-[var(--g-color)] bg-[var(--secondary-color)]">
        <div className="flex items-center justify-between">
          <h2 className="text-[var(--w-color)] text-xl font-semibold">
            Messages
          </h2>
        </div>

        <div className="relative">
          <div className="relative flex items-center">
            <FiSearch className="absolute left-3 w-4 h-4 text-[var(--lighter-color)]" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10 py-2 w-full bg-[var(--input-color)] text-[var(--w-color)] rounded-lg border border-[var(--g-color)] focus:outline-none focus:ring-2 focus:ring-[var(--b-color)]"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 p-1 text-[var(--lighter-color)] hover:text-[var(--w-color)]"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <button
          className="flex items-center justify-center gap-2 text-white cursor-pointer bg-[var(--b-color)] py-3 px-4 rounded-xl hover:bg-[var(--b-color-hover)] transition-colors shadow-sm"
          onClick={() => setShowCreateDM(true)}
        >
          <FiPlus className="w-5 h-5" />
          Create New Group
        </button>
      </div>

      {showCreateDM && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm transition-opacity">
          <div ref={createDMRef} className="animate-scaleIn">
            <CreateDM close={() => setShowCreateDM(false)} />
          </div>
        </div>
      )}

      {loadingGroups && (
        <div className="flex flex-col items-center justify-center h-40 gap-3">
          <div className="w-10 h-10 border-4 border-[var(--b-color)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[var(--lighter-color)]">Loading groups...</p>
        </div>
      )}

      {errorGroups && (
        <div className="flex flex-col items-center justify-center h-40 gap-3 p-4">
          <div className="p-3 rounded-full bg-[var(--r-color)] bg-opacity-20">
            <FiAlertCircle className="w-8 h-8 text-[var(--bright-r-color)]" />
          </div>
          <p className="text-[var(--bright-r-color)] text-center">
            {errorGroups}
          </p>
          <button
            className="text-[var(--b-color)] hover:text-[var(--b-color-hover)] font-medium mt-2"
            onClick={fetchGroups}
          >
            Try Again
          </button>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <DirectMessagesSection searchQuery={searchQuery} />
      </div>
    </div>
  );
}
