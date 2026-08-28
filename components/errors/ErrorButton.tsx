"use client";

import Link from "next/link";
import styles from "./ErrorButton.module.css";
import clsx from "clsx";

interface ErrorButtonProps {
  label: string;
}

interface ErrorButtonOnClick extends ErrorButtonProps {
  onClick: () => void;
  href?: never;
}

interface ErrorButtonHREF extends ErrorButtonProps {
  href: string;
  onClick?: never;
}

export default function ErrorButton({
  onClick,
  href,
  label,
}: ErrorButtonOnClick | ErrorButtonHREF) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={clsx("button", styles.button)}
      >
        {label}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={clsx("button", styles.button)}>
        {label}
      </Link>
    );
  }

  return null;
}
