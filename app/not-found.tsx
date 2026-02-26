import styles from "../styles/not-found.module.css";
import ErrorButton from "@/components/errors/ErrorButton";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.error}>
        <p className={styles.errorStatus}>404</p>
        <span className={styles.errorDivider} aria-hidden="true"></span>
        <h1 className={styles.errorMessage}>This page does not exist.</h1>
      </div>
      <ErrorButton href="/"/>
    </main>
  );
}
