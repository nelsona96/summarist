"use client";

import clsx from "clsx";
import { toast } from "sonner";
import styles from "./Button.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { openModal } from "@/store/authSlice";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

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
  const dispatch = useAppDispatch();

  // Temporary onClick function:
  const handleClick = (variant: ButtonProps["variant"]) => {
    if (variant === "login") {
      dispatch(openModal());
    } else {
      toast.info("Hi there!", {
        description: "This functionality has not yet been implemented.",
      });
    }
  };

  return (
    <button
      type={type}
      onClick={() => handleClick(variant)}
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
