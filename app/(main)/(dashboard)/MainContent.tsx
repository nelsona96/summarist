"use client";

import React, { ReactNode } from "react";
import Searchbar from "@/components/layout/Searchbar";
import { useSidebarContext } from "@/context/SidebarContext";
import styles from "./layout.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import AudioPlayer from "@/components/player/AudioPlayer";

export default function MainContent({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebarContext();
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");

  return (
    <div
      inert={isOpen || undefined}
      className={clsx({
        [styles.content]: true,
        [styles.playerContent]: isPlayerPage,
      })}
    >
      <header className={styles.header}>
        <Searchbar />
      </header>
      <main className={styles.main}>
        {children}
        <AudioPlayer />
      </main>
    </div>
  );
}
