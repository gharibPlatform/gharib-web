import CreateDMListingBrothers from "./CreateDMListingBrothers"

export default function CreateDM() {
    const Input = () => {
        return(
            <input placeholder="Type the username of the brother" className="bg-[var(--dark-color)] text-[var(--w-color)] rounded-[5px] border border-[var(--g-color)] py-1 px-4" type="text"/>
        )
    }

    const ListingBrothers = () => {
        return(
            <div>
                
            </div>
        )
    }
    return(
        <div
         style={{width: "620px", height: "400px"}}
         className="bg-[var(--main-color)] pt-4 px-4 rounded-sm border border-[var(--g-color)] flex flex-col ">
            <h2 className="text-[var(--w-color)] text-2xl py-4">Select Brothers</h2>
            <Input></Input>
            <CreateDMListingBrothers />
            <button>Create DM</button>
        </div>
    )
}