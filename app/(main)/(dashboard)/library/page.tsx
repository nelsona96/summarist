"use client";

import type { Book } from "@/types/book";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getBookById } from "@/lib/api";
import styles from "./page.module.css";
import BookCarousel from "@/components/book/BookCarousel";
import Skeleton from "@/components/ui/Skeleton";
import BookCarouselSkeleton from "@/components/book/BookCarouselSkeleton";
import Button from "@/components/ui/Button";
import { openModal } from "@/store/authModalSlice";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const { user } = useAppSelector((state) => state.auth);
  const savedBookIds = useAppSelector((state) => state.library);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]); // will add real finished books feature in a later phase
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (savedBookIds.length === 0) {
      setSavedBooks([]);
      setIsLoading(false);
      return;
    }

    const fetchBooks = async (bookIds: string[]) => {
      try {
        setIsLoading(true);
        const results = await Promise.all(bookIds.map((id) => getBookById(id)));
        setSavedBooks(results);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks(savedBookIds);
  }, [savedBookIds]);

  return (
    <>
      <h1 className="srOnly">My Library</h1>

      {!user ? (
        <LoggedOutUi />
      ) : (
        <>
          <section className={styles.section}>
            <div className="container">
              <h2 className={styles.sectionTitle}>Saved Books</h2>

              {isLoading ? (
                <Skeleton className={styles.subtitleSkeleton} />
              ) : (
                <p className={styles.sectionSubtitle}>
                  {`${savedBooks.length} ${savedBooks.length === 1 ? "item" : "items"}`}
                </p>
              )}

              {isLoading ? (
                <BookCarouselSkeleton ariaLabel="Loading saved books" />
              ) : savedBooks.length === 0 ? (
                <NoSavedBooksUi />
              ) : (
                <BookCarousel books={savedBooks} />
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <h2 className={styles.sectionTitle}>Finished Books</h2>

              {
                // will wire in with real data when feature is fully implemented
                false ? (
                  <Skeleton className={styles.subtitleSkeleton} />
                ) : (
                  <p className={styles.sectionSubtitle}>
                    {`${finishedBooks.length} ${finishedBooks.length === 1 ? "item" : "items"}`}
                  </p>
                )
              }

              {false ? (
                <BookCarouselSkeleton ariaLabel="Loading finished books" />
              ) : finishedBooks.length === 0 ? (
                <NoFinishedBooksUi />
              ) : (
                <BookCarousel books={finishedBooks} />
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}

function LoggedOutUi() {
  const dispatch = useAppDispatch();

  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.loginContainer)}>
        <Image
          src="/assets/login.png"
          alt="Login image"
          width={460}
          height={317}
          className={styles.loginImg}
        />

        <p className={styles.loginPara}>
          Log in to your account to see your library.
        </p>

        <Button
          onClick={() => dispatch(openModal())}
          variant="login"
          type="button"
          label="Login"
          className={styles.button}
        />
      </div>
    </section>
  );
}

function NoSavedBooksUi() {
  return (
    <div className={styles.noBooksCard}>
      <p className={styles.noBooksCta}>Save your favorite books!</p>
      <p className={styles.noBooksPara}>
        When you save a book, it will appear here.
      </p>

      <Link href="/for-you" className={clsx("button", styles.noBooksCtaLink)}>
        Browse Books
      </Link>
    </div>
  );
}

function NoFinishedBooksUi() {
  return (
    <div className={styles.noBooksCard}>
      <p className={styles.noBooksCta}>Done and dusted!</p>
      <p className={styles.noBooksPara}>
        When you finish a book, you can find it here later.
      </p>

      <Link href="/for-you" className={clsx("button", styles.noBooksCtaLink)}>
        Browse Books
      </Link>
    </div>
  );
}
