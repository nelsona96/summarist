"use client";

import clsx from "clsx";
import styles from "./Button.module.css";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { ButtonProps } from "@/types/button";

export default function Button({
  variant,
  type,
  label,
  onClick,
  disabled,
  maxWidth,
  height,
  ariaBusy,
  ariaLabel,
  className,
}: ButtonProps) {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <button
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx("button", styles[variant], className)}
      style={{ maxWidth, height: height ?? "40px" }}
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
