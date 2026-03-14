"use client";

import clsx from "clsx";
import { toast } from "sonner";
import styles from "./Button.module.css";
interface ButtonProps {
  variant: "homeCta" | "guest" | "google";
  type: "submit" | "reset" | "button";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  variant,
  type,
  label,
  onClick,
  disabled,
}: ButtonProps) {
  // Temporary onClick function:
  const handleClick = () => {
    onClick
      ? onClick()
      : toast.info("Hi there!", {
          description: "This functionality has not yet been implemented.",
        });
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={clsx("button", styles[variant])}
    >
      {label}
    </button>
  );
}
