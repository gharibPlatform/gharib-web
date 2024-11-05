import styles from "./RightElements.module.css"
import Create from "../iconButtons/Create"
import Notifications from "../iconButtons/Notifications"
import AccountMenu from "../iconButtons/AccountMenu"
import Quran from "../iconButtons/Quran"

function RightElements({ toggleUserMenu }) {
    return<>
        <div className={styles.container}>
            <Create />
            <Quran />
            <Notifications />
            <AccountMenu toggleUserMenu={toggleUserMenu} />
        </div>
    </>
}
export default RightElements;