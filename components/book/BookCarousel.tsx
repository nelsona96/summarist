import type { Book } from "@/types/book";
import styles from "./BookCarousel.module.css";
import BookCard from "./BookCard";

export default function BookCarousel({ books }: { books: Book[] }) {
  return (
    <div className={styles.wrapper}>
      {books.map((book) => (
        <BookCard key={book.id} variant="compact" book={book} />
      ))}
    </div>
  );
}
