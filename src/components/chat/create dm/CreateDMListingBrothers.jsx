import CreateDMBrotherCard from "./CreateDMBrotherCard";

export default function CreateDMListingBrothers() {
    const brothersDataArray = ["Malek", "Moh", "Zohir", "Walid", "Moussa"];

    return (
        <div className="overflow-y-auto no-scrollbar">
            {brothersDataArray.map((brother, index) => (
                <CreateDMBrotherCard 
                    Name={brother}
                    key={index}
                />
            ))}
        </div>
    );
}