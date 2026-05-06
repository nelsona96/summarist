import { useEffect, useRef, useState } from "react";

type InputTypes = "email" | "password";

type ValidationTypes = true | string;

interface StateTypes {
  isValid: boolean | null;
  errorMessage: string;
}

interface InputErrors {
  invalid: string;
  empty: string;
}

interface ErrorMessages {
  email: InputErrors;
  password: InputErrors;
}

const errorMessages: ErrorMessages = {
  email: {
    invalid: "Please enter a valid email address",
    empty: "Email address is required",
  },
  password: {
    invalid: "Password must be 8 or more characters",
    empty: "Password is required",
  },
};

const validateEmail = (value: string): ValidationTypes => {
  if (/.+@.+\..+/.test(value)) {
    return true;
  } else {
    return errorMessages.email.invalid;
  }
};

const validatePassword = (value: string): ValidationTypes => {
  if (value.length >= 8) {
    return true;
  } else {
    return errorMessages.password.invalid;
  }
};

export default function useValidateInput(
  liveValue: string,
  debouncedValue: string,
  type: InputTypes,
  touched: boolean,
): StateTypes {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasHadValue = useRef(false);

  useEffect(() => {
    if (debouncedValue.length > 0) hasHadValue.current = true;

    const isPending =
      (!touched && debouncedValue.length === 0) ||
      (!hasHadValue.current &&
        liveValue.length > 0 &&
        debouncedValue.length === 0);

    // Handle validation result
    const handleResult = (result: ValidationTypes) => {
      if (result === true) {
        setIsValid(true);
        setErrorMessage("");
      } else {
        setIsValid(false);
        setErrorMessage(result);
      }
    };

    // Check if input has been touched
    if (isPending) {
      setIsValid(null);
      setErrorMessage("");
      return;
    }

    // Validate empty input after touched = true
    if (debouncedValue.length === 0 && touched) {
      setIsValid(false);
      setErrorMessage(errorMessages[type].empty);
      return;
    }

    // Validate input
    if (type === "email") {
      const result = validateEmail(debouncedValue);
      handleResult(result);
    }

    if (type === "password") {
      const result = validatePassword(debouncedValue);
      handleResult(result);
    }
  }, [liveValue, debouncedValue, type, touched]);

  return { isValid, errorMessage };
}
