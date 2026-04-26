import { useEffect, useState } from "react";

type InputTypes = "email" | "password";

interface StateTypes {
  isValid: boolean | null;
  errorMessage: string;
}

type ValidationTypes = true | string;

const errorMessages = {
  email: {
    invalid: "Please enter a valid email address",
  },
  password: {
    invalid: "Password must be 8 or more characters",
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
  value: string,
  type: InputTypes,
): StateTypes {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const handleResult = (result: ValidationTypes) => {
      if (result === true) {
        setIsValid(true);
        setErrorMessage("");
      } else {
        setIsValid(false);
        setErrorMessage(result);
      }
    };

    if (value.length === 0) {
      setIsValid(null);
      setErrorMessage("");
      return;
    }

    if (type === "email") {
      const result = validateEmail(value);
      handleResult(result);
    }

    if (type === "password") {
      const result = validatePassword(value);
      handleResult(result);
    }
  }, [value, type]);

  return { isValid, errorMessage };
}
