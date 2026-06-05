"use client";

import React, { ReactNode } from "react";
import Searchbar from "@/components/layout/Searchbar";
import { useSidebarContext } from "@/context/SidebarContext";
import styles from "./layout.module.css";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const { isOpen } = useSidebarContext();

  return (
    <div inert={isOpen || undefined} className={styles.content}>
      <header className={styles.header}>
        <Searchbar />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
