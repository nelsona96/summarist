import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return <button type="button" aria-label="Login" className={`button ${styles.homeCta}`}>{text}</button>;
}
