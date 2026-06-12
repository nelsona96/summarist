"use client";

import type { Book } from "@/types/book";
import { useAppSelector } from "@/hooks/redux";
import styles from "./BookCard.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { LuClock, LuStar } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../ui/Skeleton";

interface BookCardProps {
  variant: "large" | "compact";
  book: Book;
  priority?: boolean;
}

export default function BookCard({ variant, book, priority }: BookCardProps) {
  const user = useAppSelector((state) => state.auth);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const large = variant === "large";
  const compact = variant === "compact";

  const showPremiumBadge =
    variant === "compact" &&
    book.subscriptionRequired &&
    user?.subscriptionStatus !== "premium-plus";

  console.log(priority);

  useEffect(() => {
    if (imgRef.current?.complete) setImageLoaded(true);
  }, []);

  return (
    <Link
      href={`/book/${book.id}`}
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
          <div
            className={clsx({
              [styles.imgWrapperLg]: large,
              [styles.imgWrapperSm]: compact,
            })}
          >
            <Image
              src={book.imageLink}
              alt={book.title}
              priority={priority}
              ref={imgRef}
              width={180}
              height={180}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              className={clsx({
                [styles.imgLg]: large,
                [styles.imgSm]: compact,
              })}
            />

            {!imageLoaded && <Skeleton className={styles.imgSkeleton} />}
          </div>

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
