import RightElements from "./RightElements";
import InputSearch from "../inputs/inputSearch/InputSearch";
import Gharib from "../gharib/Gharib";
import { useState } from "react";
import UserMenu from "../usermenu/UserMenu";

function Header() {
    const [toggleUserMenuBool, setToggleUserMenuBool] = useState(false);
    
    const toggleUserMenu = (prop) => {
        if (toggleUserMenuBool) {
            setToggleUserMenuBool(!toggleUserMenuBool);
            return;
        }

        setToggleUserMenuBool(prop);
        console.log(prop)
    }

    return <>
    
        <div className="fixed z-10 w-screen overflow-hidden h-14 flex items-center justify-between bg-[var(--main-color)] border-b border-[var(--g-color)] pt-2 pb-3">
            <Gharib />
            <InputSearch />
            <RightElements toggleUserMenu={toggleUserMenu} />
        </div>

        {toggleUserMenuBool ? <UserMenu toggleUserMenu={toggleUserMenu} /> : <div />}

    </>
}
export default Header;