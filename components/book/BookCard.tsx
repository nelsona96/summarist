"use client";

import type { Book } from "@/types/book";
import { useAppSelector } from "@/hooks/redux";
import styles from "./BookCard.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { LuClock, LuStar } from "react-icons/lu";

interface BookCardProps {
  variant: "large" | "compact";
  book: Book;
}

export default function BookCard({ variant, book }: BookCardProps) {
  const user = useAppSelector((state) => state.auth);
  const large = variant === "large";
  const compact = variant === "compact";
  const bookImage = (
    <Image
      src={book.imageLink}
      alt={book.title}
      width={180}
      height={180}
      className={clsx({
        [styles.imgLg]: large,
        [styles.imgSm]: compact,
      })}
    />
  );
  const showPremiumBadge =
    variant === "compact" &&
    book.subscriptionRequired &&
    user?.subscriptionStatus !== "premium-plus";

  return (
    // will implement dynamic route with Link in future commit
    <Link
      href={"#"}
      className={clsx({
        [styles.linkLg]: variant === "large",
        [styles.linkSm]: variant === "compact",
      })}
    >
      <article
        className={clsx({
          [styles.cardLg]: large,
          [styles.cardSm]: compact,
        })}
      >
        {large && (
          <>
            <p className={styles.subtitleLg}>{book.subTitle}</p>
            <div className={styles.divider}></div>
          </>
        )}

        {showPremiumBadge && <div className={styles.premiumBadge}>Premium</div>}

        <div
          className={clsx({
            [styles.contentLg]: large,
            [styles.contentSm]: compact,
          })}
        >
          {compact ? (
            <div className={styles.imageWrapperSm}>{bookImage}</div>
          ) : (
            bookImage
          )}

          <div
            className={clsx({
              [styles.textLg]: large,
              [styles.textSm]: compact,
            })}
          >
            <h3
              className={clsx({
                [styles.titleLg]: large,
                [styles.titleSm]: compact,
              })}
            >
              {book.title}
            </h3>
            <p
              className={clsx({
                [styles.authorLg]: large,
                [styles.authorSm]: compact,
              })}
            >
              {book.author}
            </p>

            {large && (
              <div className={styles.durationWrapper}>Duration Placeholder</div>
            )}

            {compact && (
              <>
                <p className={styles.subtitleSm}>{book.subTitle}</p>
                <div className={styles.details}>
                  <span className={styles.detail}>
                    <LuClock aria-hidden="true" className={styles.iconSm} />{" "}
                    <span>01:23</span>
                  </span>
                  <span className={styles.detail}>
                    <LuStar aria-hidden="true" className={styles.iconSm} />
                    <span>{book.averageRating}</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
