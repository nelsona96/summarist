import styles from "./page.module.css";

export default function Page() {
  return (
    <>
      <h1 className="srOnly">For You</h1>
      <section
        id="Selected"
        aria-labelledby="selected-heading"
        className="section"
      >
        <div className="container">
          <h2 id="selected-heading" className={styles.sectionTitle}>
            Selected Just For You
          </h2>
          <p>Placeholder</p>
        </div>
      </section>
      <section
        id="Recommended"
        aria-labelledby="recommended-heading"
        className="section"
      >
        <div className="container">
          <h2 id="recommended-heading" className={styles.sectionTitle}>
            Recommended For You
          </h2>
          <h3 className={styles.sectionSubtitle}>
            We think you&apos;ll like these
          </h3>
          <p>Placeholder</p>
        </div>
      </section>
      <section
        id="Suggested"
        aria-labelledby="suggested-heading"
        className="section"
      >
        <div className="container">
          <h2 id="suggested-heading" className={styles.sectionTitle}>
            Suggested Books
          </h2>
          <h3 className={styles.sectionSubtitle}>Browse these books</h3>
          <p>Placeholder</p>
        </div>
      </section>
    </>
  );
}
