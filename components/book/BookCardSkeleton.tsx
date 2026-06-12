import styles from "./BookCardSkeleton.module.css";
import Skeleton from "../ui/Skeleton";

export default function BookCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.img} />
      <Skeleton className={styles.title} />
      <Skeleton className={styles.author} />
      <Skeleton className={styles.subtitleOne} />
      <Skeleton className={styles.subtitleTwo} />
      <Skeleton className={styles.details} />
    </div>
  );
}
