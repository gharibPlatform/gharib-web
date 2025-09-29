import { useState, useRef, useEffect } from "react";
import CreateDMListingBrothers from "./CreateDMListingBrothers";
import CreateDMConfirmation from "./CreateDMConfirmation";
import { ActionButton } from "../../common/buttons/ActionButton";
import { FiSearch, FiX, FiArrowLeft, FiCheck } from "react-icons/fi";

export default function CreateDM({ close }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef(null);

  const toggleUser = (brother) => {
    setSelectedUsers((prev) => {
      const isSelected = prev.some((user) => user.id === brother.id);
      return isSelected
        ? prev.filter((user) => user.id !== brother.id)
        : [...prev, brother];
    });
    setSearchQuery("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUsers]);

  const handleSuccess = () => {
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setShowConfirmation(false);
      setSelectedUsers([]);
    }, 2000);
  };

  const removeUser = (user) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div className="relative w-[90vw] max-w-2xl h-[90vh] max-h-[900px] bg-[var(--main-color)] rounded-lg overflow-hidden border border-[var(--g-color)] border-opacity-30">
      <div
        className={`absolute inset-0 transition-all duration-300 ease-in-out overflow-y-auto no-scrollbar ${
          showConfirmation
            ? "opacity-0 -translate-x-4 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <div className="p-6 bg-[var(--main-color)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[var(--w-color)] text-2xl font-semibold">
              Create Direct Message
            </h2>
            <button
              onClick={close}
              className="text-[var(--g-color)] hover:text-[var(--w-color)] p-2 rounded-full hover:bg-[var(--main-color-hover)] transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          <p className="text-[var(--g-color)] mb-6">
            Select brothers to start a conversation with
          </p>

          <div className="relative mb-6">
            <div className="bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border border-[var(--g-color)] border-opacity-40 py-3 px-4 flex flex-wrap items-center gap-2 min-h-[56px] transition-all focus-within:border-[var(--bright-b-color)] focus-within:border-opacity-80">
              {selectedUsers.map((user) => (
                <span
                  key={user.id}
                  className="cursor-pointer bg-[var(--bright-b-color)] bg-opacity-90 px-3 py-1.5 rounded-md text-sm flex items-center gap-2 group hover:bg-opacity-100 transition-colors"
                >
                  <span className="font-medium text-white">{user.name}</span>
                  <button
                    onClick={() => removeUser(user)}
                    className="text-blue-200 group-hover:text-white transition-colors"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
              <div className="flex items-center flex-grow min-w-[120px]">
                <FiSearch
                  className="text-[var(--g-color)] mr-2 flex-shrink-0"
                  size={20}
                />
                <input
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    selectedUsers.length === 0
                      ? "Search for brothers..."
                      : "Add more brothers..."
                  }
                  className="bg-transparent outline-none flex-grow placeholder-[var(--g-color)] text-[var(--w-color)]"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* User listing */}
          <div className="flex-grow overflow-hidden">
            <h3 className="text-[var(--g-color)] text-sm font-medium uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--bright-b-color)]"></span>
              {searchQuery ? "Search Results" : "All Brothers"}
            </h3>

            <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <CreateDMListingBrothers
                selectedUsers={selectedUsers}
                toggleUser={toggleUser}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--g-color)] border-opacity-30 mt-auto">
            <div className="flex gap-3">
              <ActionButton
                label="Cancel"
                value="1"
                isDirty={true}
                isDisabled={false}
                onClick={close}
                className="flex-1 bg-[var(--secondary-color)] hover:bg-[var(--main-color-hover)] text-[var(--w-color)] border border-[var(--g-color)] border-opacity-40"
              />

              <ActionButton
                label={`Create DM ${selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}`}
                value="2"
                isDirty={true}
                isDisabled={selectedUsers.length === 0}
                onClick={() => setShowConfirmation(true)}
                className="flex-1 bg-[var(--bright-b-color)] hover:bg-[var(--b-color-hover)] text-white disabled:bg-[var(--main-color-hover)] disabled:text-[var(--g-color)] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Component */}
      <div
        className={`absolute inset-0 transition-all duration-300 ease-in-out overflow-y-auto no-scrollbar ${
          showConfirmation
            ? "opacity-100"
            : "opacity-0 pointer-events-none translate-x-4"
        }`}
      >
        {isSuccess ? (
          <div className="bg-[var(--main-color)] h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <FiCheck className="text-green-500" size={32} />
            </div>
            <h2 className="text-[var(--w-color)] text-2xl font-semibold mb-2">
              DM Created Successfully!
            </h2>
            <p className="text-[var(--g-color)]">
              Your direct message group has been created.
            </p>

            <div className="mt-8 w-12 h-1 bg-[var(--g-color)] bg-opacity-40 rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="bg-[var(--main-color)] h-full flex flex-col">
            <div className="flex items-center p-6 border-b border-[var(--g-color)] border-opacity-30">
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-[var(--g-color)] hover:text-[var(--w-color)] p-2 rounded-full hover:bg-[var(--main-color-hover)] transition-colors mr-3"
              >
                <FiArrowLeft size={24} />
              </button>
              <h2 className="text-[var(--w-color)] text-2xl font-semibold">
                Confirm Selection
              </h2>
            </div>

            <CreateDMConfirmation
              selectedUsers={selectedUsers}
              onSuccess={handleSuccess}
              onCancel={() => setShowConfirmation(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
