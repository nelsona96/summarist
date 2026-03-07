import type { RatingValue } from "@/types/review";
import { AiFillStar } from "react-icons/ai";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  rating: RatingValue;
}

export default function StarRating({ rating }: StarRatingProps) {
  const stars = Array.from({ length: rating }, (_, i) => i + 1);

  return (
    <span
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={styles.starsWrapper}
    >
      {stars.map((_, index) => (
        <AiFillStar key={index} />
      ))}
    </span>
  );
}
