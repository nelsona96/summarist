import styles from "./BookCarousel.module.css";
import BookCardSkeleton from "./BookCardSkeleton";

export default function BookCarouselSkeleton() {
  return (
    <div className={styles.wrapper}>
      {new Array(6).fill(0).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
}
