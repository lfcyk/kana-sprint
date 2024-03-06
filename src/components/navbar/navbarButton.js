import styles from './styles.module.css';
import Link from "next/link";

function NavbarButton({text, route, bgColor}) {
  return (
    <Link href={route}>
        <button			
            className={`${styles.mainButton} text-md font-bold ${bgColor}`}
            >
            {text}
        </button>
    </Link>
  )
}

export default NavbarButton
