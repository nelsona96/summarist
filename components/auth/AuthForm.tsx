import type { ButtonVariants } from "@/types/button";
import styles from "./AuthForm.module.css";
import clsx from "clsx";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setInput } from "@/store/authModalSlice";
import useDebounceValue from "@/hooks/useDebounceValue";
import useValidateInput from "@/hooks/useValidateInput";
import {
  BiSolidShow,
  BiSolidHide,
  BiCheckCircle,
  BiErrorCircle,
} from "react-icons/bi";
import { VariantData } from "./AuthModal";
import AuthButton from "./AuthButton";

interface AuthFormProps {
  data: VariantData;
  emailRef: React.RefObject<HTMLInputElement | null>;
  loadingButton: ButtonVariants | null;
  handleLogin: () => void;
  handleRegister: () => void;
  handleResetPassword: (onSuccess: () => void) => void;
}

export default function AuthForm({
  data,
  emailRef,
  loadingButton,
  handleLogin,
  handleRegister,
  handleResetPassword,
}: AuthFormProps) {
  const dispatch = useAppDispatch();
  const { isAuthLoading } = useAppSelector((state) => state.auth);
  const { currentVariant, input } = useAppSelector((state) => state.authModal);

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const passwordRef = useRef<HTMLInputElement | null>(null);

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
    if (currentVariant === "forgotPassword")
      return handleResetPassword(() =>
        setSuccessMessage(data.successMessage || ""),
      );
  };

  return (
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
                passwordInput.isValid === false ? "password-error" : undefined
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
                aria-label={showPassword ? "Hide password" : "Show password"}
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
  );
}
