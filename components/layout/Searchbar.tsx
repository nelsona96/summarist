"use client";

import { useSidebarContext } from "@/context/SidebarContext";
import styles from "./Searchbar.module.css";
import { LuMenu } from "react-icons/lu";

export default function Searchbar() {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <div className={styles.wrapper}>
      <h3>Searchbar Placeholder</h3>
      <button
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        className={styles.menu}
      >
        <LuMenu />
      </button>
    </div>
  );
}
