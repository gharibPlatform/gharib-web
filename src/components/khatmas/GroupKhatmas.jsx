import Current from "./expandContent/khatmas/Current";
import Finished from "./expandContent/khatmas/Finished";
import Pending from "./expandContent/khatmas/Pending";

export default function GroupKhatmas() {

    return(
        
        <div className="h-[var(--height)] overflow-y-auto flex flex-col">
            <Current />
            <Pending />
            <Finished />
        </div>
    )
}