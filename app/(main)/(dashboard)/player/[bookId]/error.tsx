"use client";

import styles from "./error.module.css";
import ErrorFallback from "@/components/errors/ErrorFallback";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function PlayerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <ErrorFallback
      onReset={handleRetry}
      message="Oops! Failed to load book summary."
      buttonLabel="Try Again"
      className={styles.errorContainer}
    />
  );
}
