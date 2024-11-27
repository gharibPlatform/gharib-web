import Create from "../iconButtons/Create"
import Notifications from "../iconButtons/Notifications"
import AccountMenu from "../iconButtons/AccountMenu"
import Quran from "../iconButtons/Quran"

function RightElements({ toggleUserMenu }) {
    return<>
        <div class="flex gap-7 items-center pr-5">
            <Create fill={"#fff"} />
            <Quran />
            <Notifications />
            <AccountMenu toggleUserMenu={toggleUserMenu} />
        </div>
    </>
}
export default RightElements;