import Image from "next/image";
import Button from "../ui/Button";
import landingImg from "@/public/assets/landing.png";
import styles from "./Landing.module.css";

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
          <Button variant="homeCta" type="button" label="Login" />
        </div>
        <div className={styles.imgWrapper}>
          <Image
            className={styles.img}
            src={landingImg}
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