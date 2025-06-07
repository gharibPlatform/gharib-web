import Create from "../iconButtons/Create"
import Notifications from "../iconButtons/Notifications"
import AccountMenu from "../iconButtons/AccountMenu"
import Quran from "../iconButtons/Quran"

function RightElements({ toggleUserMenu, toggleNotificationsMenu }) {
    return<>
        <div className="flex gap-7 items-center pr-5">
            <Create fill={"#fff"} />
            <Quran />
            <Notifications toggleNotificationsMenu={toggleNotificationsMenu} />
            <AccountMenu toggleUserMenu={toggleUserMenu} />
        </div>
    </>
}
export default RightElements;