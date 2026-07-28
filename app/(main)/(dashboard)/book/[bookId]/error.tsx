"use client";

import styles from "./error.module.css";
import ErrorFallback from "@/components/errors/ErrorFallback";
import { useEffect } from "react";

export default function BookDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorFallback
      onReset={reset}
      message="Oops! Failed to load book details."
      buttonLabel="Try Again"
      className={styles.bookDetailsErrorContainer}
    />
  );
}
