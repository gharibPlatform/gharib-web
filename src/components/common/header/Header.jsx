import stylesHeader from "./Header.module.css"
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
        <div className={stylesHeader.container}>
            {/* gharib icon */}
            <Gharib />
            <InputSearch />
            <RightElements toggleUserMenu={toggleUserMenu} />
        </div>

        {/* <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         >
            <UserMenu toggleUserMenu={toggleUserMenu} />
        </motion.div> */}

    </>
}
export default Header;