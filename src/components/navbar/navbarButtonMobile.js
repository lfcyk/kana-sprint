import styles from './styles.module.css';
import Link from "next/link";

function NavbarButtonMobile({text, route, textColor, bgColorChill}) {
  return (
    <Link href={route}>
        <div className={`w-full text-center h-24 align-middle m-auto  flex flex-col items-center justify-center ${bgColorChill} border`}>
            <div className={`text-3xl font-bold ${textColor} `}>{text}</div>
        </div>
    </Link>
  )
}

export default NavbarButtonMobile
