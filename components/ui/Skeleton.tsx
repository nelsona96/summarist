import clsx from "clsx";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={clsx(styles.skeleton, className)}
    ></div>
  );
}
