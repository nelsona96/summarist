"use client";

import { usePathname } from "next/navigation";
import styles from "./AudioPlayer.module.css";

export default function AudioPlayer() {
  const pathname = usePathname();
  const isPlayerPage = pathname.startsWith("/player");

  return isPlayerPage ? (
    <div className={styles.audioPlayerWrapper}></div>
  ) : null;
}
