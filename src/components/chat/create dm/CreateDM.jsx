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
    <div className="relative w-[620px] h-[900px] bg-[var(--main-color)] rounded-sm overflow-hidden">
      {/* Create DM Component */}
      <div
        className={`absolute inset-0 transition-all duration-300 ease-in-out overflow-y-auto hide-scrollbar ${
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
              className="text-[var(--g-color)] hover:text-[var(--w-color)] p-1 rounded-full hover:bg-[var(--main-color-hover)] transition-colors"
            >
              <FiX size={24} />
            </button>
          </div>

          <p className="text-[var(--g-color)] mb-6">
            Select brothers to start a conversation with
          </p>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="bg-[var(--main-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-3 px-4 text-lg flex flex-wrap items-center gap-2 min-h-[56px] transition-all focus-within:border-[var(--bright-b-color)]">
              {selectedUsers.map((user) => (
                <span
                  key={user.id}
                  className="cursor-pointer bg-[var(--bright-b-color)] px-3 py-1.5 rounded-md text-sm flex items-center gap-2 group hover:bg-[var(--bright-b-color)] transition-colors"
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
              <div className="flex items-center flex-grow">
                <FiSearch className="text-[var(--g-color)] mr-2" size={20} />
                <input
                  ref={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    selectedUsers.length === 0
                      ? "Search for brothers..."
                      : "Add more brothers..."
                  }
                  className="bg-transparent outline-none flex-grow placeholder-[var(--g-color)]"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* User listing */}
          <div className="flex-grow overflow-hidden">
            <h3 className="text-[var(--g-color)] text-sm font-medium uppercase tracking-wide mb-3">
              {searchQuery ? "Search Results" : "All Brothers"}
            </h3>

            <div className="h-[560px] overflow-y-auto pr-2 custom-scrollbar">
              <CreateDMListingBrothers
                selectedUsers={selectedUsers}
                toggleUser={toggleUser}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--g-color)] mt-auto">
            <div className="flex gap-3">
              <ActionButton
                label="Cancel"
                value="1"
                isDirty={true}
                isDisabled={false}
                onClick={close}
                className="flex-1 bg-[var(--secondary-color)] hover:bg-[var(--bright-b-color)] text-[var(--w-color)]"
              />

              <ActionButton
                label={`Create DM ${selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}`}
                value="2"
                isDirty={true}
                isDisabled={selectedUsers.length === 0}
                onClick={() => setShowConfirmation(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white disabled:bg-[var(--main-color-hover)] disabled:text-[var(--g-color)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Component */}
      <div
        className={`absolute inset-0 p-6 transition-all duration-300 ease-in-out overflow-y-auto no-scrollbar ${
          showConfirmation
            ? "opacity-100"
            : "opacity-0 pointer-events-none translate-x-4"
        }`}
      >
        {isSuccess ? (
          <div className="bg-[var(--main-color)] p-8 rounded-sm h-full flex flex-col items-center justify-center text-center border border-[var(--g-color)]">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
              <FiCheck className="text-green-500" size={32} />
            </div>
            <h2 className="text-[var(--w-color)] text-2xl font-semibold mb-2">
              DM Created Successfully!
            </h2>
            <p className="text-[var(--g-color)]">
              Your direct message group has been created.
            </p>

            <div className="mt-8 w-12 h-1 bg-[var(--g-color)] rounded-full mx-auto"></div>
          </div>
        ) : (
          <div className="bg-[var(--main-color)] rounded-sm h-full flex flex-col border border-[var(--g-color)]">
            <div className="flex items-center mb-6 p-6 border-b border-[var(--g-color)]">
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-[var(--g-color)] hover:text-[var(--w-color)] p-1 rounded-full hover:bg-[var(--main-color-hover)] transition-colors mr-3"
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
