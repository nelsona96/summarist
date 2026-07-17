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
import AddToLibraryButton from "@/components/book-details/AddToLibraryButton";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const book = await getBookById(bookId);

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles.bookDetailsImgWrapper}>
          <Image
            src={book.imageLink}
            alt={book.title}
            width={300}
            height={300}
            priority
            className={styles.bookDetailsImg}
          />
        </div>
        <div className={styles.bookDetails}>
          <div>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.subTitle}>{book.subTitle}</p>
          </div>

          <div className={styles.metadataListWrapper}>
            <ul className={styles.metadataList}>
              <li className={styles.metadataItem}>
                <LuStar aria-hidden className={styles.metadataIcon} />{" "}
                {book.averageRating} ({book.totalRating} ratings)
              </li>
              <li className={styles.metadataItem}>
                {/* placeholder until future phase when real audio duration will be implemented: */}
                <LuClock aria-hidden className={styles.metadataIcon} /> 01:23
              </li>
              <li className={styles.metadataItem}>
                <LuAudioLines aria-hidden className={styles.metadataIcon} />{" "}
                {book.type}
              </li>
              <li className={styles.metadataItem}>
                <LuLightbulb aria-hidden className={styles.metadataIcon} />{" "}
                {book.keyIdeas} Key Ideas
              </li>
            </ul>
          </div>

          <div className={styles.contentButtons}>
            <BookDetailsButton
              label={
                <>
                  <LuBookOpenText
                    aria-hidden
                    className={styles.contentButtonIcon}
                  />
                  Read
                </>
              }
              className={styles.contentButton}
            />

            {book.audioLink && (
              <BookDetailsButton
                label={
                  <>
                    <LuAudioLines
                      aria-hidden
                      className={styles.contentButtonIcon}
                    />
                    Listen
                  </>
                }
                className={styles.contentButton}
              />
            )}
          </div>

          <AddToLibraryButton />

          <section
            id="book-description"
            aria-labelledby="book-description-heading"
            className={styles.descriptionSection}
          >
            <h2 id="book-description-heading" className={styles.sectionTitle}>
              What&apos;s it about?
            </h2>
            <ul className={styles.tagList}>
              {book.tags.map((tag, index) => (
                <li key={index} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <p className={styles.descriptionPara}>{book.bookDescription}</p>
          </section>

          <section
            id="author-description"
            aria-labelledby="author-description-heading"
            className={styles.descriptionSection}
          >
            <h2 id="author-description-heading" className={styles.sectionTitle}>
              About the author
            </h2>
            <p className={styles.descriptionPara}>{book.authorDescription}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
