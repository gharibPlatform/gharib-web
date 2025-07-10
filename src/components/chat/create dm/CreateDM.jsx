import { useState, useRef, useEffect } from "react";
import CreateDMListingBrothers from "./CreateDMListingBrothers";
import CreateDMConfirmation from "./CreateDMConfirmation";

export default function CreateDM() {
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

    return (
        <div
            className={`relative overflow-hidden ${showConfirmation ? "w-[500px] h-[385px]" : "w-[620px] h-[400px]"}`}
        >
            {/* Create DM Component */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 overflow-y-auto hide-scrollbar ${showConfirmation ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
            >
                <div className="max-h-[400px] pb-4 bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col">
                    <h2 className="text-[var(--w-color)] text-2xl py-4">
                        Select Brothers
                    </h2>

                    {/* Search Input */}
                    <div className="relative">
                        <div className="bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg flex flex-wrap items-center gap-2">
                            {selectedUsers.map((user) => (
                                <span
                                    key={user.id}
                                    onClick={() => toggleUser(user)}
                                    className="cursor-pointer bg-[var(--main-color-hover)] px-2 py-2 rounded-md text-sm flex items-center gap-2"
                                >
                                    <h2>{user.name}</h2>
                                    <h2>✕</h2>
                                </span>
                            ))}
                            <input
                                ref={inputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Type the username of the brother"
                                className="text-b bg-transparent outline-none flex-grow"
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="pb-2"></div>

                    {/* Pass searchQuery to filter the list */}
                    <CreateDMListingBrothers
                        selectedUsers={selectedUsers}
                        toggleUser={toggleUser}
                        searchQuery={searchQuery}
                    />

                    <div className="pb-4"></div>

                    <button
                        className="hover:bg-[var(--b-color-hover)] py-2 px-4 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] "
                        onClick={() => setShowConfirmation(true)}
                        disabled={selectedUsers.length === 0}
                    >
                        Create DM
                    </button>
                </div>
            </div>

            {/* Confirmation Component */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] transition-opacity duration-500 overflow-y-auto no-scrollbar ${showConfirmation ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            >
                {isSuccess ? (
                    <div className="bg-[var(--main-color)] p-6 rounded-sm border border-[var(--g-color)] h-full flex flex-col items-center justify-center">
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h2 className="text-[var(--w-color)] text-2xl text-center">
                            DM Created Successfully!
                        </h2>
                        <p className="text-[var(--g-color)] text-center mt-2">
                            Your direct message group has been created.
                        </p>
                    </div>
                ) : (
                    <CreateDMConfirmation
                        selectedUsers={selectedUsers}
                        onSuccess={handleSuccess}
                        onCancel={() => setShowConfirmation(false)}
                    />
                )}
            </div>
        </div>
    );
}
