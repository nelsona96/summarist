import styles from "./SelectedSkeleton.module.css";
import Skeleton from "../ui/Skeleton";

export default function SelectedSkeleton() {
  return <Skeleton className={styles.fallback} />;
}
