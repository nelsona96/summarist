import styles from "./BookCardSkeleton.module.css";
import Skeleton from "../ui/Skeleton";

type BookCardSkeletonProps =
  | {
      roleStatus: true;
      ariaLabel: string;
    }
  | { roleStatus?: false; ariaLabel?: never };

export default function BookCardSkeleton({
  roleStatus,
  ariaLabel,
}: BookCardSkeletonProps) {
  return (
    <div
      role={roleStatus ? "status" : undefined}
      aria-label={roleStatus ? ariaLabel : undefined}
      className={styles.card}
    >
      <Skeleton className={styles.img} />
      <Skeleton className={styles.title} />
      <Skeleton className={styles.author} />
      <Skeleton className={styles.subtitleOne} />
      <Skeleton className={styles.subtitleTwo} />
      <Skeleton className={styles.details} />
    </div>
  );
}
