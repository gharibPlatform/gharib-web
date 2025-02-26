import { useState, useRef } from "react";
import CreateDMListingBrothers from "./CreateDMListingBrothers";
import CreateDMConfirmation from "./CreateDMConfirmation";

export default function CreateDM() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const inputRef = useRef(null);

    const toggleUser = (brother) => {
        setSelectedUsers((prev) =>
            prev.includes(brother) ? prev.filter((name) => name !== brother) : [...prev, brother]
        );
    };

    return (
        <div className="relative w-[620px] h-[400px] overflow-hidden">
            {/* Create DM Component */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 overflow-y-auto hide-scrollbar ${
                    showConfirmation ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <div className="pb-4 bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col h-full">
                    <h2 className="text-[var(--w-color)] text-2xl py-4">Select Brothers</h2>

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
                            placeholder="Type the username of the brother"
                            className="text-b bg-transparent outline-none flex-grow"
                            type="text"
                        />
                    </div>

                    <div className="pb-2"></div>

                    <CreateDMListingBrothers selectedUsers={selectedUsers} toggleUser={toggleUser} />

                    <div className="pb-4"></div>

                    <button
                        className="hover:bg-[var(--b-color-hover)] py-2 px-4 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px] "
                        onClick={() => setShowConfirmation(true)}
                    >
                        Create DM
                    </button>
                </div>
            </div>

            {/* Confirmation Component */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 overflow-y-auto hide-scrollbar ${
                    showConfirmation ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            >
                <CreateDMConfirmation selectedUsers={selectedUsers} />
            </div>
        </div>
    );
}
