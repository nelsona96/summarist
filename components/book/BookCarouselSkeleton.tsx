import styles from "./BookCarousel.module.css";
import BookCardSkeleton from "./BookCardSkeleton";

export default function BookCarouselSkeleton({
  ariaLabel,
}: {
  ariaLabel: string;
}) {
  return (
    <div role="status" aria-label={ariaLabel} className={styles.wrapper}>
      {new Array(6).fill(0).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
}
