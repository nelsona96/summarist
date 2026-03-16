import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <div className={`container ${styles.navContainer}`}>
        <Image
          className={styles.logo}
          width={200}
          height={46.5}
          src="/assets/logo.png"
          alt="Summarist logo"
        />
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
