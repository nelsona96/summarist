import type { ModalVariants } from "@/store/authSlice";
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
  setCurrentVariant,
} from "@/store/authSlice";
import Button from "../ui/Button";

interface VariantData {
  title: string;
  btnLabel: string;
  googleLabel?: string;
  variantToggle: string;
  autoPassword?: string;
}

const variantData: Record<ModalVariants, VariantData> = {
  login: {
    title: "Log in to Summarist",
    btnLabel: "Login",
    googleLabel: "Login with Google",
    variantToggle: "Don't have an account?",
    autoPassword: "current-password",
  },
  register: {
    title: "Sign up to Summarist",
    btnLabel: "Sign Up",
    googleLabel: "Sign up with Google",
    variantToggle: "Already have an account?",
    autoPassword: "new-password",
  },
  forgotPassword: {
    title: "Reset Your Password",
    btnLabel: "Send Reset Password Link",
    variantToggle: "Go to Login",
  },
};

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isClosing, input, currentVariant } = useAppSelector(
    (state) => state.auth,
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const data = variantData[currentVariant];

  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setIsVisible(true);
        document.body.style.overflowY = "hidden";
      }),
    );

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  useEffect(() => {
    if (!isClosing) {
      setIsVisible(true);
      timerRef.current && clearTimeout(timerRef.current);
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

  const toggleVariant = (goToVariant: ModalVariants): void => {
    dispatch(setInput({ field: "email", value: "" }));
    dispatch(setInput({ field: "password", value: "" }));

    dispatch(setCurrentVariant(goToVariant));
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
            {data?.title}
          </h2>

          {currentVariant === "login" && (
            <>
              <Button variant="guest" type="button" label="Login as a Guest" />
              <Separator />
            </>
          )}

          {currentVariant === "login" || currentVariant === "register" ? (
            <>
              <Button
                variant="google"
                type="button"
                label={data.googleLabel!}
              />

              <Separator />
            </>
          ) : null}

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

            {currentVariant === "login" || currentVariant === "register" ? (
              <>
                <label htmlFor="password" className={styles.srOnly}>
                  Password
                </label>
                <div className={styles.passwordInput}>
                  <input
                    onChange={(e) =>
                      dispatch(
                        setInput({
                          field: "password",
                          value: e.target.value,
                        }),
                      )
                    }
                    value={input.password}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={data.autoPassword}
                    placeholder="Password"
                    className={styles.input}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className={styles.passwordVisible}
                  >
                    {showPassword ? (
                      <BiSolidHide aria-hidden="true" />
                    ) : (
                      <BiSolidShow aria-hidden="true" />
                    )}
                  </button>
                </div>
              </>
            ) : null}

            <Button variant="login" type="button" label={data.btnLabel} />
          </form>
        </div>

        <div className={styles.modalBottom}>
          {currentVariant === "login" && (
            <button
              onClick={() => toggleVariant("forgotPassword")}
              className={styles.forgotPassword}
            >
              Forgot your password?
            </button>
          )}
          <button
            onClick={() =>
              toggleVariant(currentVariant === "login" ? "register" : "login")
            }
            className={styles.signUp}
          >
            {data.variantToggle}
          </button>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className={styles.separator}>
      <span className={styles.separatorText}>or</span>
    </div>
  );
}
