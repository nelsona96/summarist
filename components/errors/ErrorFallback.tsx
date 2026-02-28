import ErrorButton from "./ErrorButton";
import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  onReset: () => void;
}

export default function ErrorFallback({ onReset }: ErrorFallbackProps) {
  return (
    <main className={styles.container}>
      <h1 className={styles.errorMessage}>Oops! Something went wrong.</h1>
      <ErrorButton onClick={onReset} />
    </main>
  );
}
