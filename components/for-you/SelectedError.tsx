"use client";

import styles from "./SelectedError.module.css";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import ErrorMessage from "../errors/ErrorMessage";
import { useRouter } from "next/navigation";

export default function SelectedError({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div role="alert" className={styles.wrapper}>
      <Skeleton className={styles.fallback} />
      <div className={styles.content}>
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
