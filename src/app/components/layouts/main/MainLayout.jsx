import Header from "../../common/header/Header";
import SideBar from "../../common/sidebar/Sidebar"
import styles from "./MainLayout.module.css"
import UserProfile from "../../pages/userProfile/UserProfile";

function MainLayout() {

    return<>
        <div className="real">
            <Header />
            <div className={styles.sidebarANDpage}>
                <SideBar />
                <userMenu />
                <UserProfile />
            </div>
        </div>
    </>
}
export default MainLayout;