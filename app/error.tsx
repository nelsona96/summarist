"use client";

import ErrorFallback from "@/components/errors/ErrorFallback";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  console.error(error.message);

  return <ErrorFallback onReset={reset} />;
}
