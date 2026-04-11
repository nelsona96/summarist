"use client";

import Link from "next/link";
import styles from "./ErrorButton.module.css";
import clsx from "clsx";
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
        onClick={onClick}
        type="button"
        className={clsx("button", styles.button)}
      >
        Try Again
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={clsx("button", styles.button)}>
        Go Home
      </Link>
    );
  }

  return null;
}
