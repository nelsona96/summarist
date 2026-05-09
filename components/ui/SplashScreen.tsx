import Image from "next/image";
import styles from "./SplashScreen.module.css";
import clsx from "clsx";
import { useEffect } from "react";

export default function SplashScreen({
  splashPhase,
}: {
  splashPhase: "animating" | "loading" | "ready";
}) {
  useEffect(() => {
    // Removes inline style overflow-y: hidden set on body in layout.tsx - restores scroll on mount
    return () => {
      document.body.style.removeProperty("overflow-y");
    };
  }, []);

  return (
    <div
      className={clsx(
        styles.splashWrapper,
        splashPhase === "ready" && styles.hidden,
      )}
    >
      <Image
        priority
        src="/assets/logo.png"
        alt="Summarist logo"
        width={200}
        height={46.5}
        className={styles.logo}
      />
    </div>
  );
}
