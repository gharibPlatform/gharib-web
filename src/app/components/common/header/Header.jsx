import stylesHeader from "./Header.module.css"
import RightElements from "./RightElements";
import InputSearch from "../inputs/inputSearch/InputSearch";
import Gharib from "../gharib/Gharib";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
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
        <div className={stylesHeader.container}>
            {/* gharib icon */}
            <Gharib />
            <InputSearch />
            <RightElements toggleUserMenu={toggleUserMenu} />
        </div>

        <CSSTransition
            in={toggleUserMenuBool}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <UserMenu toggleUserMenu={toggleUserMenu} />
        </CSSTransition>

    </>
}
export default Header;