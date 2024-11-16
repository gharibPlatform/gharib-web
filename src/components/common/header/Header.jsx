import RightElements from "./RightElements";
import InputSearch from "../inputs/inputSearch/InputSearch";
import Gharib from "../gharib/Gharib";
import { useRef, useState } from "react";
import UserMenu from "../usermenu/UserMenu";
// import { motion } from 'framer-motion'

function Header() {
    const [toggleUserMenuBool, setToggleUserMenuBool] = useState(false);
    const nodeRef = useRef(null);
    
    const toggleUserMenu = (prop) => {
        if (toggleUserMenuBool) {
            setToggleUserMenuBool(!toggleUserMenuBool);
            return;
        }
        setToggleUserMenuBool(prop);
        console.log(prop)
    }

    return <>
    
        <div class="flex items-center justify-between bg-[var(--main-color)] border-b border-[var(--g-color)] pt-2 pb-2">
            {/* gharib icon */}
            <Gharib />
            <InputSearch />
            <RightElements toggleUserMenu={toggleUserMenu} />
        </div>

    </>
}
export default Header;