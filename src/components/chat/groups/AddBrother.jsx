import { useState, useRef, useEffect } from "react";
import CreateDMListingBrothers from "../create dm/CreateDMListingBrothers";
import CreateDMConfirmation from "./EditGroupSettings";

export default function AddBrother() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef(null);

    const toggleUser = (brother) => {
        setSelectedUsers((prev) =>
            prev.includes(brother) ? prev.filter((name) => name !== brother) : [...prev, brother]
        );
        setSearchQuery(""); 
    };

    useEffect(()=>{
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedUsers])

    return (
        <div>
            <div className={`relative overflow-hidden ${showConfirmation ? "w-[360px] h-[200px]" : "w-[620px] h-[400px]"}`}>
                {/* Create DM Component */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 overflow-y-auto hide-scrollbar ${
                        showConfirmation ? "opacity-0 pointer-events-none hidden w-1 " : "opacity-100 visibility-visible"
                    }`}
                >
                    <div className="max-h-[400px] pb-4 bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col">
                        <h2 className="text-[var(--w-color)] text-2xl py-4">Select Brothers</h2>
                        {/* Search Input */}
                        <div className="relative">
                            <div className="bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg flex flex-wrap items-center gap-2">
                                {selectedUsers.map((user) => (
                                    <span
                                        key={user}
                                        onClick={() => toggleUser(user)}
                                        className="cursor-pointer bg-[var(--main-color-hover)] px-2 py-2 rounded-md text-sm flex items-center gap-2"
                                    >
                                        <h2>{user}</h2>
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
                        >
                            Add Brothers
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 w-[360px] h-[200px]  overflow-y-auto no-scrollbar ${
                    showConfirmation ? "opacity-100" : "opacity-0 pointer-events-none hidden"
                }`}>
                <div className="w-[360px] h-[200px] flex justify-center items-center border border-[var(--g-color)] flex-col p-6 bg-[var(--main-color)] ">
                    <div className="text-[var(--w-color)] items-center justify-center text-lg text-center">
                        A confirmation request has been sent to the group admin. Please wait for their approval
                    </div>
                </div>
            </div>
        </div>
    );
}