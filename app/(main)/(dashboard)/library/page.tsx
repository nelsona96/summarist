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

    const fetchSavedBooks = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(
          savedBookIds.map((id) => getBookById(id)),
        );
        setSavedBooks(results);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedBooks();
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
              {!isLoading ? (
                <p className={styles.sectionSubtitle}>
                  {`${savedBooks.length} ${savedBooks.length === 1 ? "item" : "items"}`}
                </p>
              ) : (
                <Skeleton className={styles.subtitleSkeleton} />
              )}
              {!isLoading ? (
                savedBooks.length === 0 ? (
                  <NoSavedBooksUi />
                ) : (
                  <BookCarousel books={savedBooks} />
                )
              ) : (
                <BookCarouselSkeleton ariaLabel="Loading saved books" />
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <h2 className={styles.sectionTitle}>Finished Books</h2>
              {!isLoading ? (
                <p className={styles.sectionSubtitle}>
                  {`${savedBooks.length} ${savedBooks.length === 1 ? "item" : "items"}`}
                </p>
              ) : (
                <Skeleton className={styles.subtitleSkeleton} />
              )}
              {!isLoading ? (
                finishedBooks.length === 0 ? (
                  <NoFinishedBooksUi />
                ) : (
                  <BookCarousel books={savedBooks} />
                )
              ) : (
                <BookCarouselSkeleton ariaLabel="Loading finished books" />
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
  const router = useRouter();

  return (
    <div className={styles.noBooksCard}>
      <p className={styles.noBooksCta}>Save your favorite books!</p>
      <p className={styles.noBooksPara}>
        When you save a book, it will appear here.
      </p>
      <Button
        onClick={() => router.push("/for-you")}
        variant="login"
        type="button"
        label="Browse Books"
        className={styles.noBooksCtaBtn}
      />
    </div>
  );
}

function NoFinishedBooksUi() {
  const router = useRouter();

  return (
    <div className={styles.noBooksCard}>
      <p className={styles.noBooksCta}>Done and dusted!</p>
      <p className={styles.noBooksPara}>
        When you finish a book, you can find it here later.
      </p>
      <Button
        onClick={() => router.push("/for-you")}
        variant="login"
        type="button"
        label="Browse Books"
        className={styles.noBooksCtaBtn}
      />
    </div>
  );
}
