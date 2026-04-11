"use client";

import clsx from "clsx";
import styles from "./Button.module.css";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { notImplemented } from "@/lib/utils";

interface ButtonProps {
  variant: "login" | "guest" | "google";
  type: "submit" | "reset" | "button";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  maxWidth?: string;
}

export default function Button({
  variant,
  type,
  label,
  onClick,
  disabled,
  maxWidth,
}: ButtonProps) {
  const handleClick = () => {
    onClick ? onClick() : notImplemented();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(styles.button, styles[variant])}
      style={{ maxWidth }}
    >
      {variant === "guest" && (
        <IoPerson className={clsx(styles.icon, styles.guestIcon)} />
      )}

      {variant === "google" && (
        <FcGoogle className={clsx(styles.icon, styles.googleIcon)} />
      )}

      {label}
    </button>
  );
}
