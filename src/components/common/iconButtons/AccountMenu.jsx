import Image from "next/image";

function AccountMenu({ toggleUserMenu }) {
    return <>
        <Image src={"/electron.svg"} onClick={()=>toggleUserMenu(true)} class="w-8 h-8 cursor-pointer" width={1} height={1} alt="accountImage" />
    </>    
}

export default AccountMenu;
