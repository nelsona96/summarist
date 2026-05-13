"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { openModal } from "@/store/authModalSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();

  return (
    <header>
      <div className={`container ${styles.navContainer}`}>
        <Image
          className={styles.logo}
          width={200}
          height={46.5}
          priority
          src="/assets/logo.png"
          alt="Summarist logo"
        />
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navLinks}>
            <li>
              <button
                onClick={() => dispatch(openModal())}
                className={styles.primaryLink}
              >
                Login
              </button>
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
