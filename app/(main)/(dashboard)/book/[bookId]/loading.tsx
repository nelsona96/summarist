import styles from "./loading.module.css";
import mainStyles from "./page.module.css";
import Skeleton from "@/components/ui/Skeleton";

export default function BookDetailsLoading() {
  return (
    <div className={mainStyles.row}>
      <div className={mainStyles.container}>
        <div className={mainStyles.bookDetailsHeader}>
          <Skeleton className={styles.img} />
          <div className={mainStyles.bookDetailsHeaderContent}>
            <Skeleton className={styles.title} />
            <Skeleton className={styles.author} />
            <Skeleton className={styles.subtitle} />
            <Skeleton className={styles.metadata} />
            <Skeleton className={styles.buttons} />
          </div>
        </div>
        <div className={mainStyles.descriptionSection}>
          <Skeleton className={styles.sectionTitle} />
          <Skeleton className={styles.tags} />
          <Skeleton className={styles.description} />
        </div>
        <div className={mainStyles.descriptionSection}>
          <Skeleton className={styles.sectionTitle} />
          <Skeleton className={styles.description} />
        </div>
      </div>
    </div>
  );
}
