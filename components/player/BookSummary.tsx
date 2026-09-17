import styles from "./BookSummary.module.css";

export default function BookSummary({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p className={styles.summary}>{summary}</p>
    </>
  );
}
