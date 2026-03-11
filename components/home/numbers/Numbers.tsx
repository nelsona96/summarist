import styles from "./Numbers.module.css";
import NumberCard from "./NumberCard";

export default function Numbers() {
  return (
    <section id="numbers" aria-label="Numbers" className={`homeSection`}>
      <div className={`container`}>
        <h2 className={`sectionTitle`}>Start growing with Summarist now</h2>
        <div className={styles.numbersWrapper}>
          <NumberCard variant="downloads" />
          <NumberCard variant="ratings" />
          <NumberCard variant="results" />
        </div>
      </div>
    </section>
  );
}
