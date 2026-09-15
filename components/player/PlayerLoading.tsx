import styles from "./PlayerLoading.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function PlayerLoading() {
  return (
    <div className={styles.spinner}>
      <LoadingSpinner size="xxl" />
    </div>
  );
}
