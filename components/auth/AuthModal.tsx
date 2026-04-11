import styles from "./AuthModal.module.css";
import clsx from "clsx";
import Button from "../ui/Button";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { startClose, finalizeClose, openModal } from "@/store/authSlice";

export default function AuthModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isClosing } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  useEffect(() => {
    if (!isClosing) {
      timerRef.current && clearTimeout(timerRef.current);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true)),
      );
    }

    if (isClosing) {
      setIsVisible(false);
      timerRef.current = setTimeout(() => {
        dispatch(finalizeClose());
      }, 200);
    }
  }, [isClosing]);

  const toggleModal = () => {
    !isClosing && dispatch(startClose());
    isClosing && dispatch(openModal());
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && toggleModal()}
      className={clsx(styles.wrapper, isVisible && styles.visibleWrapper)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(styles.modal, isVisible && styles.visibleModal)}
      >
        <div className={styles.modalContent}>
          <button
            onClick={() => dispatch(startClose())}
            aria-label="Close login modal"
            className={styles.close}
          >
            <IoCloseOutline />
          </button>
          <h2 id="modal-title" className={styles.title}>
            Log in to Summarist
          </h2>
          <form className={styles.form}>
            <label htmlFor="email" className={styles.srOnly}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className={styles.input}
            />
            <label htmlFor="password" className={styles.srOnly}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              className={styles.input}
            />
            <Button variant="homeCta" type="button" label="Login" />
          </form>
        </div>
        <div className={styles.modalBottom}>
          <button className={styles.forgotPassword}>
            Forgot your password?
          </button>
          <button className={styles.signUp}>Don&apos;t have an account?</button>
        </div>
      </div>
    </div>
  );
}
