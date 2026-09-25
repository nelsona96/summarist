import NotFoundFallback from "@/components/errors/NotFoundFallback";
import styles from "./not-found.module.css";

export default function PlayerNotFound() {
  return (
    <NotFoundFallback
      statusCode={404}
      message="Oops! This book is not in our catalog."
      buttonLabel="Search for Another Book"
      redirect="/for-you"
      className={styles.playerNotFoundContainer}
    />
  );
}
