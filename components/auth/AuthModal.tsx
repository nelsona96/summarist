import type { ModalVariants } from "@/store/authModalSlice";
import type { ButtonVariants } from "@/types/button";
import styles from "./AuthModal.module.css";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import {
  BiSolidShow,
  BiSolidHide,
  BiCheckCircle,
  BiErrorCircle,
} from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  startClose,
  finalizeClose,
  setInput,
  setCurrentVariant,
} from "@/store/authModalSlice";
import useDebounceValue from "@/hooks/useDebounceValue";
import useValidateInput from "@/hooks/useValidateInput";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthAction } from "@/hooks/useAuthAction";
import { usePathname, useRouter } from "next/navigation";
import { clearError } from "@/store/authSlice";
import AuthButton from "./AuthButton";

interface VariantData {
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
  const { isClosing, input, currentVariant } = useAppSelector(
    (state) => state.authModal,
  );
  const { isAuthLoading } = useAppSelector((state) => state.auth);
  const { error } = useAppSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState<ButtonVariants | null>(
    null,
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isTouchDeviceRef = useRef(false);

  // Debounced Input Validation:
  const debouncedEmail = useDebounceValue<string>(input.email, 350);
  const debouncedPassword = useDebounceValue<string>(input.password, 350);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const emailInput = useValidateInput(
    input.email,
    debouncedEmail,
    "email",
    emailTouched,
  );
  const passwordInput = useValidateInput(
    input.password,
    debouncedPassword,
    "password",
    passwordTouched,
  );

  const router = useRouter();
  const pathname = usePathname();

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

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (currentVariant !== "forgotPassword") {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const handleInputOnChange = (
    e: React.ChangeEvent,
    type: "email" | "password",
  ) => {
    if (type === "email" && !emailTouched) setEmailTouched(true);
    if (type === "password" && !passwordTouched) setPasswordTouched(true);

    if (e.target instanceof HTMLInputElement) {
      dispatch(setInput({ field: type, value: e.target.value }));
    }
  };

  // Firebase Authentication Methods
  const execute = useAuthAction();
  const provider = new GoogleAuthProvider();
  const routeToDashboard =
    pathname === "/" ? () => router.push("/for-you") : undefined;

  const handleRegister = async () => {
    setLoadingButton("login");

    await execute(
      () => createUserWithEmailAndPassword(auth, input.email, input.password),
      routeToDashboard,
    );

    setLoadingButton(null);
  };

  const handleLogin = async () => {
    setLoadingButton("login");

    await execute(
      () => signInWithEmailAndPassword(auth, input.email, input.password),
      routeToDashboard,
    );

    setLoadingButton(null);
  };

  const handleLoginGoogle = async () => {
    setLoadingButton("google");

    await execute(() => signInWithPopup(auth, provider), routeToDashboard);

    setLoadingButton(null);
  };

  const handleLoginGuest = async () => {
    setLoadingButton("guest");
    const guestEmail = "guest@email.com";
    const guestPassword = "guestpassword";

    await execute(
      () => signInWithEmailAndPassword(auth, guestEmail, guestPassword),
      routeToDashboard,
    );

    setLoadingButton(null);
  };

  const handleResetPassword = async () => {
    setLoadingButton("login");

    await execute(
      () => sendPasswordResetEmail(auth, input.email),
      () => setSuccessMessage(data.successMessage || ""),
    );

    setLoadingButton(null);
  };

  // Email & password form submission
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const invalidEmail = debouncedEmail.length === 0 || emailInput.errorMessage;
    const invalidPassword =
      debouncedPassword.length === 0 || passwordInput.errorMessage;

    setEmailTouched(true);
    setPasswordTouched(true);

    if (currentVariant === "forgotPassword") {
      if (invalidEmail) return;
    } else {
      if (invalidEmail || invalidPassword) return;
    }

    if (currentVariant === "login") return handleLogin();
    if (currentVariant === "register") return handleRegister();
    if (currentVariant === "forgotPassword") return handleResetPassword();
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

          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email" className={styles.srOnly}>
              Email Address
            </label>

            <div className={styles.emailInput}>
              <div className={styles.emailWrapper}>
                <input
                  ref={emailRef}
                  onChange={(e) => handleInputOnChange(e, "email")}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailKeyDown(e)}
                  value={input.email}
                  id="email"
                  aria-invalid={emailInput.isValid === false}
                  aria-describedby={
                    emailInput.isValid === false ? "email-error" : undefined
                  }
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  className={clsx(
                    styles.input,
                    emailInput.isValid === true && styles.validInput,
                    emailInput.isValid === false && styles.invalidInput,
                  )}
                />

                {emailInput.isValid === true && (
                  <BiCheckCircle
                    aria-hidden="true"
                    className={clsx(styles.validIcon, styles.emailIcon)}
                  />
                )}

                {emailInput.isValid === false && (
                  <BiErrorCircle
                    aria-hidden="true"
                    className={clsx(styles.invalidIcon, styles.emailIcon)}
                  />
                )}
              </div>

              <p
                id="email-error"
                aria-live="polite"
                className={styles.invalidInputMessage}
              >
                {emailInput.errorMessage}
              </p>
            </div>

            {currentVariant === "login" || currentVariant === "register" ? (
              <>
                <label htmlFor="password" className={styles.srOnly}>
                  Password
                </label>
                <div className={styles.passwordInput}>
                  <input
                    ref={passwordRef}
                    onChange={(e) => handleInputOnChange(e, "password")}
                    value={input.password}
                    id="password"
                    aria-invalid={passwordInput.isValid === false}
                    aria-describedby={
                      passwordInput.isValid === false
                        ? "password-error"
                        : undefined
                    }
                    type={showPassword ? "text" : "password"}
                    autoComplete={data.autoPassword}
                    placeholder="Password"
                    className={clsx(
                      styles.input,
                      passwordInput.isValid === true && styles.validInput,
                      passwordInput.isValid === false && styles.invalidInput,
                    )}
                  />

                  <p
                    id="password-error"
                    aria-live="polite"
                    className={styles.invalidInputMessage}
                  >
                    {passwordInput.errorMessage}
                  </p>

                  <div className={styles.passwordIcons}>
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

                    {passwordInput.isValid === true && (
                      <BiCheckCircle
                        aria-hidden="true"
                        className={styles.validIcon}
                      />
                    )}

                    {passwordInput.isValid === false && (
                      <BiErrorCircle
                        aria-hidden="true"
                        className={styles.invalidIcon}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : null}

            <AuthButton
              variant="login"
              type="submit"
              label={data.btnLabel}
              loadingButton={loadingButton}
              disabled={
                isAuthLoading ||
                (currentVariant === "forgotPassword" && successMessage)
                  ? true
                  : false
              }
            />

            {currentVariant === "forgotPassword" && (
              <p aria-live="polite" className={styles.successMessage}>
                {successMessage}
              </p>
            )}
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
