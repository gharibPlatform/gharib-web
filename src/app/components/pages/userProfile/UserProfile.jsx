import UserProfileStyles from "./UserProfile.module.css"

function UserProfile() {
    const Bio = "In today's fast-paced world, digital design has become a cornerstone of innovation. From sleek user interfaces to immersive digital experiences, the boundaries of creativity continue to expand. Whether you're designing for web, mobile, or interactive applications, the importance of a well-crafted design cannot be overstated"
    return<>
        <div className={UserProfileStyles.container}>

            <div className={UserProfileStyles.backgroundContainer}>
                <div className={UserProfileStyles.background}>
                    <div className={UserProfileStyles.penANDthreedotsContainer}>
                        <svg className={UserProfileStyles.penSvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <svg className={UserProfileStyles.threedotsSvg} fill="#ffffff" height="200px" width="200px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path class="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"></path> </g></svg>
                    </div>
                    <img className={UserProfileStyles.userIcon} src="public/electron.svg" alt="icon" />
                    <p className={UserProfileStyles.username}>@R.x.Electron</p>
                    <h3 className={UserProfileStyles.fullname}>Electron React</h3>
                    <h5 className={UserProfileStyles.khatmatCount}>2351 Khatma</h5>
                    <p className={UserProfileStyles.joinDate}>Joined 18 may 2022</p>
                    <div className={UserProfileStyles.bioSection}>
                        {Bio}
                    </div>
                </div>
            </div>

            <div className={UserProfileStyles.lists}>
                <div className={UserProfileStyles.userList}>Posts</div>
                <div className={UserProfileStyles.userList}>Comments</div>
                <div className={UserProfileStyles.userList}>Brothers</div>
                <div className={UserProfileStyles.userList}>Highlights</div>
                <div className={UserProfileStyles.userList}>Saved</div>
                <div className={UserProfileStyles.userList}>Communities</div>
                <div className={UserProfileStyles.userList}>Khatmat</div>
            </div>
            
        </div>
    </>
}

export default UserProfile;