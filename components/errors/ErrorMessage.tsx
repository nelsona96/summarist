import styles from "./ErrorMessage.module.css";
import { BiErrorCircle } from "react-icons/bi";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <span className={styles.wrapper}>
      <BiErrorCircle aria-hidden="true" className={styles.icon} />
      <p className={styles.message}>{message}</p>
    </span>
  );
}
