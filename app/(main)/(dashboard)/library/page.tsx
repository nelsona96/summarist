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

export default function Page() {
  const { user } = useAppSelector((state) => state.auth);
  const bookIds = useAppSelector((state) => state.library);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (bookIds.length === 0) {
      setBooks([]);
      setIsLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const results = await Promise.all(bookIds.map((id) => getBookById(id)));
        setBooks(results);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [bookIds]);

  return (
    <>
      <h1 className="srOnly">My Library</h1>

      {!user ? (
        <LoggedOutUi />
      ) : (
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Saved Books</h2>
            {!isLoading ? (
              <p className={styles.sectionSubtitle}>
                {`${books.length} ${books.length === 1 ? "item" : "items"}`}
              </p>
            ) : (
              <Skeleton className={styles.subtitleSkeleton} />
            )}
            {books && !isLoading ? (
              <BookCarousel books={books} />
            ) : (
              <BookCarouselSkeleton ariaLabel="Loading saved books" />
            )}
          </div>
        </section>
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
