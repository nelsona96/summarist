import type { ModalVariants } from "@/store/authModalSlice";
import type { ButtonVariants } from "@/types/button";
import styles from "./AuthModal.module.css";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useAuthAction } from "@/hooks/useAuthAction";
import {
  startClose,
  finalizeClose,
  setCurrentVariant,
} from "@/store/authModalSlice";
import { clearError } from "@/store/authSlice";
import { IoCloseOutline } from "react-icons/io5";
import AuthButton from "./AuthButton";
import AuthForm from "./AuthForm";

export interface VariantData {
  title: string;
  btnLabel: string;
  googleLabel?: string;
  variantToggle: string;
  autoPassword?: string;
  successMessage?: string;
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
    successMessage: "Reset password email has been sent!",
  },
};

const focusable =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { isAuthLoading, error } = useAppSelector((state) => state.auth);
  const { isClosing, input, currentVariant } = useAppSelector(
    (state) => state.authModal,
  );

  const [isVisible, setIsVisible] = useState(false);
  const [loadingButton, setLoadingButton] = useState<ButtonVariants | null>(
    null,
  );

  const triggerRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTouchDeviceRef = useRef(false);

  const data = variantData[currentVariant];

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;

    isTouchDeviceRef.current = window.matchMedia("(pointer: coarse)").matches;

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setIsVisible(true);

        controllerRef.current = new AbortController();

        !isTouchDeviceRef.current && emailRef.current?.focus();

        document.body.style.overflowY = "hidden";

        document.addEventListener(
          "keydown",
          (e) => {
            e.key === "Escape" && closeModal();
          },
          { signal: controllerRef.current.signal },
        );
      }),
    );

    return () => {
      triggerRef.current?.focus();

      controllerRef.current?.abort();

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
        dispatch(clearError());
      }, 200);
    }
  }, [isClosing]);

  const closeModal = () => {
    if (!isClosing) dispatch(startClose());
  };

  const toggleVariant = (goToVariant: ModalVariants): void => {
    dispatch(clearError());
    dispatch(setCurrentVariant(goToVariant));

    setTimeout(() => !isTouchDeviceRef.current && emailRef.current?.focus(), 0);
  };

  const handleFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const focusElements = modalRef.current?.querySelectorAll(focusable);
    const active = document.activeElement;
    const first = focusElements?.[0] as HTMLElement;
    const last = focusElements?.[focusElements?.length - 1] as HTMLElement;

    if (!e.shiftKey && active === last) {
      e.preventDefault();
      first?.focus();
    } else if (e.shiftKey && active === first) {
      e.preventDefault();
      last?.focus();
    }
  };

  // Firebase Authentication Methods
  const execute = useAuthAction();
  const provider = new GoogleAuthProvider();

  const handleRegister = async () => {
    setLoadingButton("login");

    await execute(() =>
      createUserWithEmailAndPassword(auth, input.email, input.password),
    );

    setLoadingButton(null);
  };

  const handleLogin = async () => {
    setLoadingButton("login");

    await execute(() =>
      signInWithEmailAndPassword(auth, input.email, input.password),
    );

    setLoadingButton(null);
  };

  const handleLoginGoogle = async () => {
    setLoadingButton("google");

    await execute(() => signInWithPopup(auth, provider));

    setLoadingButton(null);
  };

  const handleLoginGuest = async () => {
    setLoadingButton("guest");
    const guestEmail = "guest@email.com";
    const guestPassword = "guestpassword";

    await execute(() =>
      signInWithEmailAndPassword(auth, guestEmail, guestPassword),
    );

    setLoadingButton(null);
  };

  const handleResetPassword = async (onSuccess: () => void) => {
    setLoadingButton("login");

    await execute(() => sendPasswordResetEmail(auth, input.email), onSuccess);

    setLoadingButton(null);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && closeModal()}
      className={clsx(styles.wrapper, isVisible && styles.visibleWrapper)}
    >
      <div
        onKeyDown={(e) => e.key === "Tab" && handleFocus(e)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        className={clsx(styles.modal, isVisible && styles.visibleModal)}
      >
        <div className={styles.modalContent}>
          <button
            onClick={() => dispatch(startClose())}
            aria-label="Close modal"
            className={styles.close}
          >
            <IoCloseOutline />
          </button>

          <h2 id="modal-title" className={styles.title}>
            {data.title}
          </h2>

          <p aria-live="polite" className={styles.errorMessage}>
            {error}
          </p>

          {currentVariant === "login" && (
            <>
              <AuthButton
                variant="guest"
                type="button"
                label="Login as a Guest"
                onClick={handleLoginGuest}
                loadingButton={loadingButton}
                disabled={isAuthLoading}
              />
              <Separator />
            </>
          )}

          {currentVariant === "login" || currentVariant === "register" ? (
            <>
              <AuthButton
                variant="google"
                type="button"
                label={data.googleLabel!}
                onClick={handleLoginGoogle}
                loadingButton={loadingButton}
                disabled={isAuthLoading}
              />

              <Separator />
            </>
          ) : null}

          <AuthForm
            data={data}
            emailRef={emailRef}
            loadingButton={loadingButton}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleResetPassword={handleResetPassword}
          />
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
