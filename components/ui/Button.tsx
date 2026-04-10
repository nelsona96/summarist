"use client";

import clsx from "clsx";
import { toast } from "sonner";
import styles from "./Button.module.css";
import { useAppDispatch } from "@/hooks/redux";
import { handleModalToggle } from "@/store/authSlice";
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
  const dispatch = useAppDispatch();

  // Temporary onClick function:
  const handleClick = (variant: ButtonProps["variant"]) => {
    if (variant === "homeCta") {
      dispatch(handleModalToggle());
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
      className={clsx("button", styles[variant])}
    >
      {label}
    </button>
  );
}
