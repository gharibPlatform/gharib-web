import styles from "./CommunityButton.module.css"

function CommunityButton({ communityName, communityIcon}) {
    return<>
        <div className={styles.container}>
            <img src="../../../../public/electron.svg" alt="" />
            <p className={styles.p}>{communityName}</p>
        </div>
    </>
}

export default CommunityButton;