"use client";

import type { Book } from "@/types/book";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { getBookById } from "@/lib/api";
import BookSummary from "./BookSummary";
import PlayerLoading from "./PlayerLoading";
import ErrorFallback from "../errors/ErrorFallback";
import styles from "./PlayerGate.module.css";
import NotLoggedIn from "../ui/NotLoggedIn";
import UpgradePlan from "../ui/UpgradePlan";

interface PlayerGateProps {
  bookId: string;
  subscriptionRequired: boolean;
}

export default function PlayerGate({
  bookId,
  subscriptionRequired,
}: PlayerGateProps) {
  const { user, subscriptionStatus } = useAppSelector((state) => state.auth);
  const isPremiumPlus = subscriptionStatus === "premium-plus";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const [bookSummary, setBookSummary] = useState<string | null>(null);

  const retry = () => {
    setError(null);
    setRetryKey((key) => key + 1);
  };

  useEffect(() => {
    if (!user || (bookTitle && bookSummary)) return;

    const fetchBook = async () => {
      try {
        setLoading(true);
        const { title, summary }: Book = await getBookById(bookId);
        setBookTitle(title);
        setBookSummary(summary);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error : new Error("Failed to load book"),
        );
      } finally {
        setLoading(false);
      }
    };

    if (subscriptionRequired) {
      if (isPremiumPlus) fetchBook();
    } else {
      fetchBook();
    }
  }, [bookId, subscriptionRequired, user, isPremiumPlus, retryKey]);

  if (!user) {
    return (
      <NotLoggedIn
        message="Log in to your account to see this book's content."
        className={styles.playerNotLoggedIn}
      />
    );
  } else if (loading || subscriptionStatus === null) {
    return <PlayerLoading />;
  } else if (error) {
    return (
      <ErrorFallback
        onReset={retry}
        message="Oops! Failed to load book summary."
        buttonLabel="Try Again"
        className={styles.errorContainer}
      />
    );
  } else if (subscriptionRequired && !isPremiumPlus) {
    return (
      <UpgradePlan
        message="Please upgrade your plan to see this book's content."
        className={styles.playerUpgradePlan}
      />
    );
  } else if (bookTitle && bookSummary) {
    return <BookSummary title={bookTitle} summary={bookSummary} />;
  }
}
