import Image from "next/image";
import styles from "./page.module.css";
import { getBookById } from "@/lib/api";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const book = await getBookById(bookId);

  return (
    <div className={styles.container}>
      <div className={styles.bookDetailsImgWrapper}>
        <Image src={book.imageLink} alt={book.title} width={300} height={300} />
      </div>
      <div className={styles.bookDetails}>
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <p>{book.subTitle}</p>
        </div>

        <ul>
          <li>
            {book.averageRating} ({book.totalRating} ratings)
          </li>
          <li>
            {/* placeholder until future phase when real audio duration will be implemented: */}
            01:23
          </li>
          <li>{book.type}</li>
          <li>{book.keyIdeas} Key Ideas</li>
        </ul>

        <div>{/* buttons will go here */}</div>

        {/* Add to library button goes here */}

        <section aria-labelledby="book-description-heading">
          <h2 id="book-description-heading">What's it about?</h2>
          <ul>
            {book.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <p>{book.bookDescription}</p>
        </section>

        <section aria-labelledby="author-description-heading">
          <h2 id="author-description-heading">About the author</h2>
          <p>{book.authorDescription}</p>
        </section>
      </div>
    </div>
  );
}
