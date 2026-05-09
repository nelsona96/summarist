import Image from "next/image";
import styles from "./SplashScreen.module.css";
import clsx from "clsx";

export default function SplashScreen({
  splashPhase,
}: {
  splashPhase: "animating" | "loading" | "ready";
}) {
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
