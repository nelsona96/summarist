"use client";

import Link from "next/link";
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
      type="button"
      aria-label="Try again"
      onClick={onClick}
      className={`button`}
      >
        Try Again
      </button>
    );
  }

  if (href) {
    return (
      <Link
      aria-label="Return to home page"
      href={href}
      className={`button`}
      >
        Go Home
      </Link>
    );
  }

  return null;
}