import styles from "./CommunityButton.module.css"

function CommunityButton({ communityName, communityIcon}) {
    return<>
        <div className={styles.container}>
            <img src={communityIcon} alt="" />
            <p className={styles.p}>{communityName}</p>
        </div>
    </>
}

export default CommunityButton;