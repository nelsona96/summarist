import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./LoadingSpinner.module.css";
import clsx from "clsx";

export default function LoadingSpinner({
  size,
}: {
  size: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <AiOutlineLoading3Quarters
      aria-hidden="true"
      className={clsx(styles.loading, styles[size])}
    />
  );
}
