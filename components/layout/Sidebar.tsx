"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import clsx from "clsx";
import {
  LuHouse,
  LuBookmark,
  LuHighlighter,
  LuSearch,
  LuSettings,
  LuCircleHelp,
  //   LuLogIn, - commented out until use to avoid ESLint error
  LuLogOut,
} from "react-icons/lu";

export default function Sidebar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logo}
            width={200}
            height={46.5}
            priority
            src="/assets/logo.png"
            alt="Summarist logo"
          />
        </div>
        <nav aria-label="Main navigation" className={styles.navLinks}>
          <ul className={styles.topLinks}>
            <li className={styles.listItem}>
              <Link href={"#"} className={styles.navLink}>
                <span className={styles.navLinkContent}>
                  <LuHouse className={styles.icon} />
                  <span className={styles.navLinkText}>For You</span>
                </span>
              </Link>
            </li>
            <li className={styles.listItem}>
              <Link href={"#"} className={styles.navLink}>
                <span className={styles.navLinkContent}>
                  <LuBookmark className={styles.icon} />
                  <span className={styles.navLinkText}>My Library</span>
                </span>
              </Link>
            </li>
            <li className={styles.listItem}>
              <button
                disabled
                className={clsx(styles.navLink, styles.notImplemented)}
              >
                <span className={styles.navLinkContent}>
                  <LuHighlighter className={styles.icon} />
                  <span className={styles.navLinkText}>Highlights</span>
                </span>
              </button>
            </li>
            <li className={styles.listItem}>
              <button
                disabled
                className={clsx(styles.navLink, styles.notImplemented)}
              >
                <span className={styles.navLinkContent}>
                  <LuSearch className={styles.icon} />
                  <span className={styles.navLinkText}>Search</span>
                </span>
              </button>
            </li>
          </ul>
          <ul className={styles.bottomLinks}>
            <li className={styles.listItem}>
              <Link href={"#"} className={styles.navLink}>
                <span className={styles.navLinkContent}>
                  <LuSettings className={styles.icon} />
                  <span className={styles.navLinkText}>Settings</span>
                </span>
              </Link>
            </li>
            <li className={styles.listItem}>
              <button
                disabled
                className={clsx(styles.navLink, styles.notImplemented)}
              >
                <span className={styles.navLinkContent}>
                  <LuCircleHelp className={styles.icon} />
                  <span className={styles.navLinkText}>Help & Support</span>
                </span>
              </button>
            </li>
            <li className={styles.listItem}>
              <Link href={"#"} className={styles.navLink}>
                <span className={styles.navLinkContent}>
                  <LuLogOut className={styles.icon} />
                  <span className={styles.navLinkText}>Logout</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
