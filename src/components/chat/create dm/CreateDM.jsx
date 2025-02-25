import { useState, useRef } from "react";
import CreateDMListingBrothers from "./CreateDMListingBrothers";

export default function CreateDM() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const inputRef = useRef(null); 

    const toggleUser = (brother) => {
        setSelectedUsers((prev) =>
            prev.includes(brother) ? prev.filter((name) => name !== brother) : [...prev, brother]
        );
    };

    return (
        <div
            style={{ width: "620px", height: "400px" }}
            className="bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col"
        >
            <h2 className="text-[var(--w-color)] text-2xl py-4">Select Brothers</h2>
            
            <div className="bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-2 px-4 text-lg flex flex-wrap items-center gap-2">
                {selectedUsers.map((user) => (
                    <span 
                        key={user}
                        onClick={() => toggleUser(user)} 
                        className= "cursor-pointer bg-[var(--main-color-hover)] px-2 py-2 rounded-md text-sm flex items-center gap-1"
                    >
                        <h2>{user}</h2>
                        <h2>✕</h2>
                    </span>
                ))}

                <input 
                    ref={inputRef} 
                    placeholder="Type the username of the brother"
                    className="bg-transparent outline-none flex-grow"
                    type="text"
                />
                
            </div>

            <div className="pb-2"></div>

            <CreateDMListingBrothers selectedUsers={selectedUsers} toggleUser={toggleUser} />

            <button>Create DM</button>
        </div>
    );
}
