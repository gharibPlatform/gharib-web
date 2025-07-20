import RightElements from "./RightElements";
import InputSearch from "../inputs/inputSearch/InputSearch";
import Gharib from "../gharib/Gharib";
import { useState } from "react";
import UserMenu from "../usermenu/UserMenu";
import NotificationsMenu from "../notifications/NotificationsMenu";
import QuranHeader from "../quran/quran header/QuranHeader";

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

    const [toggleNotificationsMenuBool, setToggleNotificationsMenuBool] = useState(false);
    
    const toggleNotificationsMenu = (prop) => {
        if (toggleNotificationsMenuBool) {
            setToggleNotificationsMenuBool(!toggleNotificationsMenuBool);
            return;
        }

        setToggleNotificationsMenuBool(prop);
        console.log(prop)
    }

    return <>
    
        <div className="w-screen h-14 flex z-50 items-center justify-between bg-[var(--main-color)] border-b border-[var(--g-color)] pt-2 pb-3">
            <Gharib />
            <QuranHeader />
            <RightElements toggleUserMenu={toggleUserMenu} toggleNotificationsMenu={toggleNotificationsMenu}/>
        </div>

        {toggleUserMenuBool ? <UserMenu toggleUserMenu={toggleUserMenu} /> : <div />}
        {toggleNotificationsMenuBool ? <NotificationsMenu toggleNotificationsMenu={toggleNotificationsMenu} /> : <div />}

    </>
}
export default Header;
