"use client";

import { useRouter } from "next/navigation";
import ErrorMessage from "../errors/ErrorMessage";
import Button from "../ui/Button";
import styles from "./BookCarouselError.module.css";
import BookCarouselSkeleton from "./BookCarouselSkeleton";

export default function BookCarouselError({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div role="alert" className={styles.wrapper}>
      <div aria-hidden="true" inert>
        <BookCarouselSkeleton ariaLabel="" />
      </div>
      <div className={styles.overlay}>
        <ErrorMessage message={message} />
        <Button
          onClick={() => router.refresh()}
          variant="login"
          type="button"
          label={"Try Again"}
          maxWidth="120px"
        />
      </div>
    </div>
  );
}
