"use client";

import React, { ReactNode } from "react";
import Searchbar from "@/components/layout/Searchbar";
import { useSidebarContext } from "@/context/SidebarContext";
import styles from "./layout.module.css";

export default function MainContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebarContext();

  return (
    <div inert={isOpen || undefined} className={styles.content}>
      <header className={styles.header}>
        <Searchbar />
      </header>
      <main className={styles.main}></main>
    </div>
  );
}
