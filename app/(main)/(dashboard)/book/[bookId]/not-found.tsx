import NotFoundFallback from "@/components/errors/NotFoundFallback";
import styles from "./not-found.module.css";

export default function BookDetailsNotFound() {
  return (
    // TODO redirect to /search page in future when implemented, this is a temp config
    <NotFoundFallback
      statusCode={404}
      message="Oops! This book is not in our catalog."
      buttonLabel="Search for Another Book"
      redirect="/for-you"
      className={styles.bookDetailsNotFoundContainer}
    />
  );
}
