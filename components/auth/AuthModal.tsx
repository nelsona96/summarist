import styles from "./AuthModal.module.css";
import clsx from "clsx";
import Button from "../ui/Button";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { handleModalToggle } from "@/store/authSlice";

export default function AuthModal() {
  const isOpen = useAppSelector((state) => state.auth.isOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.target === e.currentTarget && dispatch(handleModalToggle());
  };

  return (
    <div
      onClick={closeModal}
      className={clsx(styles.wrapper, isOpen && styles.visibleWrapper)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={clsx(styles.modal, isOpen && styles.visibleModal)}
      >
        <div className={styles.modalContent}>
          <button
            onClick={closeModal}
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
