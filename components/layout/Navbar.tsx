"use client";

import Image from "next/image";
import styles from "./Navbar.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { openModal } from "@/store/authModalSlice";

export default function Navbar() {
  const isLoggedIn = useAppSelector((state) => state.auth.user !== null);

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
                onClick={() => {
                  !isLoggedIn ? dispatch(openModal()) : signOut(auth);
                }}
                className={styles.primaryLink}
              >
                {isLoggedIn ? "Log Out" : "Login"}
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
