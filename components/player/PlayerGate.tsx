"use client";

import type { Book } from "@/types/book";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { getBookById } from "@/lib/api";
import BookSummary from "./BookSummary";
import PlayerLoading from "./PlayerLoading";

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
  const [bookTitle, setBookTitle] = useState<string | null>(null);
  const [bookSummary, setBookSummary] = useState<string | null>(null);

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
  }, [bookId, subscriptionRequired, user, isPremiumPlus]);

  if (!user) {
    return <NotLoggedIn />;
  } else if (subscriptionRequired && !isPremiumPlus) {
    return <UpgradePlan />;
  } else if (loading) {
    return <PlayerLoading />;
  } else if (error) {
    return <div>Oops! There was an error loading this book.</div>; // placeholder error state, will use ErrorFallback in the future
  } else if (bookTitle && bookSummary) {
    return <BookSummary title={bookTitle} summary={bookSummary} />;
  }
}

function NotLoggedIn() {
  return (
    <div>
      <p>Please login to see the content.</p>
    </div>
  );
}

function UpgradePlan() {
  return (
    <div>
      <p>Please upgrade your plan to see the content.</p>
    </div>
  );
}
