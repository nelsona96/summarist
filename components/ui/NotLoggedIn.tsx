import { useAppDispatch } from "@/hooks/redux";
import { openModal } from "@/store/authModalSlice";
import Button from "./Button";
import styles from "./NotLoggedIn.module.css";
import Image from "next/image";
import clsx from "clsx";

interface NotLoggedInProps {
  message: string;
  className?: string;
}

export default function NotLoggedIn({ message, className }: NotLoggedInProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.card}>
        <Image
          src="/assets/login.png"
          alt="Not logged in image"
          width={460}
          height={317}
          className={styles.image}
        />
        <h1 className={styles.message}>{message}</h1>
        <Button
          variant="login"
          type="button"
          label="Login"
          onClick={() => dispatch(openModal())}
          className={styles.button}
        />
      </div>
    </div>
  );
}
