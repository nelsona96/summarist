import styles from "./AuthModal.module.css";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  startClose,
  finalizeClose,
  openModal,
  setInput,
} from "@/store/authSlice";
import Button from "../ui/Button";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isClosing, input } = useAppSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
              onChange={(e) =>
                dispatch(setInput({ field: "email", value: e.target.value }))
              }
              value={input.email}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              className={styles.input}
            />
            <label htmlFor="password" className={styles.srOnly}>
              Password
            </label>
            <div className={styles.passwordInput}>
              <input
                onChange={(e) =>
                  dispatch(
                    setInput({ field: "password", value: e.target.value }),
                  )
                }
                value={input.password}
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={styles.passwordVisible}
              >
                {showPassword ? (
                  <BiSolidHide aria-hidden="true" />
                ) : (
                  <BiSolidShow aria-hidden="true" />
                )}
              </button>
            </div>
            <Button variant="login" type="button" label="Login" />
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
