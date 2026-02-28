import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image className={styles.logo} src={logo} alt="Summarist logo" />
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navLinks}>
            <li>
              <Link className={styles.primaryLink} href="/for-you">
                Login
              </Link>
            </li>
                <li>
                  <span className={styles.navLink} aria-disabled="true">
                    About
                  </span>
                </li>
                <li>
                  <span className={styles.navLink} aria-disabled="true">
                    Contact
                  </span>
                </li>
                <li>
                  <span className={styles.navLink} aria-disabled="true">
                    Help
                  </span>
                </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
