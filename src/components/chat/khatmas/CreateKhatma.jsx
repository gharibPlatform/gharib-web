import { useState, useRef, useEffect } from "react";

export default function CreateKhatma() {
    const [isLimited, setIsLimited] = useState(null);
    const [userLimit, setUserLimit] = useState(""); 
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <div className={`relative overflow-hidden ${showConfirmation ? "w-[360px] h-[200px]" : "w-[620px] h-[400px]"}`}>
                <div
                    className={`absolute inset-0 transition-opacity duration-500 overflow-y-auto hide-scrollbar ${
                        showConfirmation ? "opacity-0 pointer-events-none hidden w-1" : "opacity-100 visibility-visible"
                    }`}
                >
                    <div className="max-h-[400px] pb-4 bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col">
                        <h2 className="text-[var(--w-color)] text-2xl py-4">Create Khatma</h2>

                        <div className="flex flex-col relative pl-6 gap-6">
                            {/* Name Input */}
                            <form className="flex gap-2 text-[var(--w-color)] flex-col">
                                <h2>Name</h2>
                                <input
                                    ref={inputRef}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Gharib"
                                    className="text-b outline-none flex-grow bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg gap-2"
                                    type="text"
                                />
                            </form>

                            {/* Number of People Selection */}
                            <form className="flex gap-2 text-[var(--w-color)] flex-col">
                                <h2>Number of people</h2>
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
                                                setUserLimit(""); // Reset user limit if Unlimited is chosen
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

                                {/* Show user limit input only if "Limited" is selected */}
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
                                    </div>
                                )}
                            </form>
                        </div>

                        <div className="pb-4"></div>

                        {/* Submit Button */}
                        <button
                            className="hover:bg-[var(--b-color-hover)] py-2 px-4 text-[var(--w-color)] bg-[var(--b-color)] rounded-[4px]"
                            onClick={() => {
                                if (isLimited && (!userLimit || userLimit <= 0)) {
                                    alert("Please specify a valid number of users.");
                                    return;
                                }
                                setShowConfirmation(true);
                            }}
                        >
                            Create Khatma
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
