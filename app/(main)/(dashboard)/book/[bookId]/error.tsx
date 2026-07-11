"use client";

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
    <div>
      <div>Oops! Failed to load book details.</div>
      <br />
      <button onClick={reset}>Try Again</button>
    </div>
  );
}
