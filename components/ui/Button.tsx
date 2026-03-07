"use client";

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
    alert("Hi there! This functionality has not yet been implemented.");
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`button ${styles.homeCta}`}
    >
      {label}
    </button>
  );
}
