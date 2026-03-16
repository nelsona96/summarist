import styles from "../styles/not-found.module.css";
import ErrorButton from "@/components/errors/ErrorButton";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.errorWrapper}>
        <div className={styles.error}>
          <h1 className={styles.errorStatus}>404</h1>
          <span className={styles.errorDivider} aria-hidden="true"></span>
          <p className={styles.errorMessage}>This page does not exist.</p>
        </div>
        <ErrorButton href="/" />
      </div>
    </main>
  );
}
