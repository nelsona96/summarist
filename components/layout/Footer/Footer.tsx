import styles from "./Footer.module.css";
import FooterBlock from "./FooterBlock";

export default function Footer() {
  return (
    <footer className={`section ${styles.footerSection}`}>
      <div className={`container`}>
        <div className={styles.top}>
          <FooterBlock variant="actions" />
          <FooterBlock variant="usefulLinks" />
          <FooterBlock variant="company" />
          <FooterBlock variant="other" />
        </div>
        <hr aria-hidden="true" className={styles.divider} />
        <p className={styles.copyright}>Copyright &copy; 2026 Summarist</p>
      </div>
    </footer>
  );
}
