import styles from "./UpgradePlan.module.css";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

interface UpgradePlanProps {
  message: string;
  className?: string;
}

export default function UpgradePlan({ message, className }: UpgradePlanProps) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.card}>
        <Image
          src="/assets/login.png"
          alt="Not logged in image"
          width={460}
          height={317}
          className={styles.image}
        />
        <h1 className={styles.message}>{message}</h1>
        {/* Using Link for now, but in the future most likely will need to tie
        this into the pending intent system when the choose-plan page actually
        exists */}
        <Link href="/choose-plan" className={clsx("button", styles.link)}>
          Choose Plan
        </Link>
      </div>
    </div>
  );
}
