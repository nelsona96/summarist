import Image from "next/image";
import styles from "./Landing.module.css";
import HomeButton from "./HomeButton";

export default function Landing() {
  return (
    <section id="landing" aria-label="Landing" className={`section`}>
      <div className={`container ${styles.landingContainer}`}>
        <div className={styles.landingContent}>
          <h1 className={styles.landingTitle}>
            Gain more knowledge in less time
          </h1>
          <p className={styles.landingPara}>
            Great summaries for busy people, individuals who barely have time to
            read, and even people who don&apos;t like to read.
          </p>
          <HomeButton />
        </div>
        <div className={styles.imgWrapper}>
          <Image
            className={styles.img}
            src="/assets/landing.png"
            width={400}
            height={380}
            priority
            alt="Person reading a digital book summary"
          />
        </div>
      </div>
    </section>
  );
}
