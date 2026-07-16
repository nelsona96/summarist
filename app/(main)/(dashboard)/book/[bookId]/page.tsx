import { getBookById } from "@/lib/api";
import Image from "next/image";
import styles from "./page.module.css";
import BookDetailsButton from "@/components/book-details/BookDetailsButton";
import {
  LuBookOpenText,
  LuAudioLines,
  LuBookmark,
  LuStar,
  LuClock,
  LuLightbulb,
} from "react-icons/lu";

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
        <Image
          src={book.imageLink}
          alt={book.title}
          width={300}
          height={300}
          priority
        />
      </div>
      <div className={styles.bookDetails}>
        <div>
          <h1>{book.title}</h1>
          <p>{book.author}</p>
          <p>{book.subTitle}</p>
        </div>

        <ul>
          <li>
            <LuStar /> {book.averageRating} ({book.totalRating} ratings)
          </li>
          <li>
            {/* placeholder until future phase when real audio duration will be implemented: */}
            <LuClock /> 01:23
          </li>
          <li>
            <LuAudioLines /> {book.type}
          </li>
          <li>
            <LuLightbulb /> {book.keyIdeas} Key Ideas
          </li>
        </ul>

        <div>
          <BookDetailsButton
            label={
              <>
                <LuBookOpenText aria-hidden />
                Read
              </>
            }
            className={styles.contentButton}
          />

          {book.audioLink && (
            <BookDetailsButton
              label={
                <>
                  <LuAudioLines aria-hidden />
                  Listen
                </>
              }
              className={styles.contentButton}
            />
          )}
        </div>

        <BookDetailsButton
          label={
            <>
              <LuBookmark aria-hidden /> Add title to my library
            </>
          }
          className={styles.libraryButton}
        />

        <section aria-labelledby="book-description-heading">
          <h2 id="book-description-heading">What&apos;s it about?</h2>
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
