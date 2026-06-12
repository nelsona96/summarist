import styles from "./SelectedSkeleton.module.css";
import Skeleton from "../ui/Skeleton";

export default function SelectedSkeleton() {
  return (
    <div role="status" aria-label="Loading selected book">
      <Skeleton className={styles.fallback} />
    </div>
  );
}
