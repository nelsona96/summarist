import clsx from "clsx";
import ErrorButton from "./ErrorButton";
import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  message: string;
  buttonLabel: string;
  onReset: () => void;
  className?: string | undefined;
}

export default function ErrorFallback({
  onReset,
  message,
  className,
  buttonLabel,
}: ErrorFallbackProps) {
  return (
    <div className={clsx(styles.container, className)}>
      <div role="alert" className={styles.errorWrapper}>
        <h1 className={styles.errorMessage}>{message}</h1>
        <ErrorButton onClick={onReset} label={buttonLabel} />
      </div>
    </div>
  );
}
