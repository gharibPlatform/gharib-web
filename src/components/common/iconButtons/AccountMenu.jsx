import styles from "./ButtonIcon.module.css"

function AccountMenu({ toggleUserMenu }) {
    return <>
        <img onClick={()=>toggleUserMenu(true)} className={styles.img} src="./public/electron.svg" alt="" />
    </>    
}

export default AccountMenu;
