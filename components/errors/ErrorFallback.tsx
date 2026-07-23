import clsx from "clsx";
import ErrorButton from "./ErrorButton";
import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  onReset: () => void;
  message: string;
  className?: string | undefined;
}

export default function ErrorFallback({
  onReset,
  message,
  className,
}: ErrorFallbackProps) {
  return (
    <main>
      <div className={clsx(styles.container, className)}>
        <div role="alert" className={styles.errorWrapper}>
          <h1 className={styles.errorMessage}>{message}</h1>
          <ErrorButton onClick={onReset} />
        </div>
      </div>
    </main>
  );
}
