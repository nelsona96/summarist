import type { ReviewData } from "@/types/review";
import styles from "./Review.module.css";
import StarRating from "./StarRating";

export default function Review({ name, message, rating }: ReviewData) {
  return (
    <article className={styles.review}>
      <div className={styles.reviewHeader}>
        <h3 className={styles.name}>{name}</h3>
        <StarRating rating={rating} />
      </div>
      <p className={styles.message}>{message}</p>
    </article>
  );
}
