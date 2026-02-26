"use client";

import Link from "next/link";
import styles from "@/styles/ErrorButton.module.css";

interface ErrorButtonOnClick {
  onClick: () => void;
  href?: never;
}

interface ErrorButtonHREF {
  href: string;
  onClick?: never;
}

export default function ErrorButton({
  onClick,
  href,
}: ErrorButtonOnClick | ErrorButtonHREF) {
  if (onClick) {
    return (
      <button
        className={styles.button}
        onClick={onClick}
        aria-label="Try again"
      >
        Try Again
      </button>
    );
  }

  if (href) {
    return (
      <Link
        className={styles.button}
        href={href}
        aria-label="Return to home page"
      >
        Go Home
      </Link>
    );
  }

  return null;
}
