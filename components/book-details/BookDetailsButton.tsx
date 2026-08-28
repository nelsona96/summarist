"use client";

import type { ButtonProps } from "@/types/button";
import useRequireAuth from "@/hooks/useRequireAuth";
import Button from "../ui/Button";

type BookDetailsButtonProps = Pick<
  ButtonProps,
  "label" | "className" | "disabled" | "onClick"
>;

interface ButtonOnClick extends BookDetailsButtonProps {
  onClick: () => void;
  bookId?: never;
}

interface ButtonRedirect extends BookDetailsButtonProps {
  bookId: string;
  onClick?: never;
}

export default function BookDetailsButton({
  bookId,
  label,
  className,
  disabled,
  onClick,
}: ButtonOnClick | ButtonRedirect) {
  const requireAuth = useRequireAuth();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (bookId) {
      requireAuth({ intent: "ACCESS_BOOK", payload: bookId });
    }
  };

  return (
    <Button
      type="button"
      variant="login"
      label={label}
      disabled={disabled}
      onClick={handleClick}
      className={className}
    />
  );
}
