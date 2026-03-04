import Feature from "./Feature";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section id="features" aria-label="Features" className={`homeSection`}>
      <div className={`container`}>
        <h2 className={`sectionTitle`}>Understand books in a few minutes</h2>
        <div className={styles.featuresWrapper}>
          <Feature variant="readListen" />
          <Feature variant="find" />
          <Feature variant="briefcasts" />
        </div>
      </div>
    </section>
  );
}
