import { FiCheck, FiUserX, FiSearch, FiUsers } from "react-icons/fi";
import DefaultIcon from "../../common/icon/DefaultIcon";

export default function CreateDMListingBrothers({
  selectedUsers,
  toggleUser,
  searchQuery,
}) {
  const brothersDataArray = [
    { id: 1, name: "Malek" },
    { id: 2, name: "Moh" },
    { id: 3, name: "Zohir" },
    { id: 4, name: "Walid" },
    { id: 5, name: "Moussa" },
    { id: 6, name: "Ahmed" },
    { id: 7, name: "Karim" },
    { id: 8, name: "Omar" },
    { id: 9, name: "Yassin" },
    { id: 10, name: "Bilal" },
    { id: 11, name: "Hassan" },
    { id: 12, name: "Samir" },
  ];

  const filteredBrothers = brothersDataArray.filter((brother) =>
    brother.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSelected = (brother) => {
    return selectedUsers.some((user) => user.id === brother.id);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable content area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar py-2">
        {filteredBrothers.length > 0 ? (
          <div className="space-y-2">
            {filteredBrothers.map((brother) => (
              <div
                key={brother.id}
                onClick={() => toggleUser(brother)}
                className={`flex items-center justify-between cursor-pointer p-3 mx-2 rounded-lg transition-all duration-100 hover:bg-[var(--main-color-hover)]`}
              >
                <div className="flex items-center gap-3">
                  <DefaultIcon name={brother.name} height={9} width={9} />
                  <span className="text-[var(--w-color)] font-medium">
                    {brother.name}
                  </span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected(brother)
                      ? "bg-[var(--bright-b-color)] shadow-sm"
                      : "border-2 border-[var(--g-color)] border-opacity-40 hover:border-[var(--bright-b-color)]"
                  }`}
                >
                  {isSelected(brother) && (
                    <FiCheck className="text-[var(--w-color)]" size={14} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-[var(--g-color)]">
            <div className="relative mb-4">
              {searchQuery ? (
                <div className="relative">
                  <FiSearch size={48} className="opacity-50" />
                  <div className="absolute -inset-3 bg-[var(--bright-b-color)] bg-opacity-10 rounded-full"></div>
                </div>
              ) : (
                <div className="relative">
                  <FiUsers size={48} className="opacity-50" />
                  <FiUserX
                    size={24}
                    className="absolute -top-2 -right-2 opacity-70"
                  />
                </div>
              )}
            </div>
            <p className="text-center text-lg font-medium text-[var(--w-color)] mb-1">
              {searchQuery ? "No matches found" : "No brothers available"}
            </p>
            <p className="text-sm text-center max-w-xs mx-auto leading-relaxed">
              {searchQuery
                ? `No results for "${searchQuery}". Try searching with a different name.`
                : "There are currently no brothers to display in the directory."}
            </p>
          </div>
        )}
      </div>

      {selectedUsers.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-[var(--main-color)] border-t border-[var(--g-color)] border-opacity-20 p-3 mt-auto backdrop-blur-sm bg-opacity-95 z-10">
          <div className="flex items-center justify-center text-sm text-[var(--w-color)]">
            <span className="bg-[var(--bright-b-color)] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">
              {selectedUsers.length}
            </span>
            {selectedUsers.length === 1
              ? "1 person selected"
              : `${selectedUsers.length} people selected`}
          </div>
        </div>
      )}
    </div>
  );
}
