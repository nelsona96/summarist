import Button from "../ui/Button";
import type { ButtonProps } from "@/types/button";

export type BookDetailsButtonProps = Pick<
  ButtonProps,
  "label" | "className" | "disabled" | "onClick"
>;

export default function BookDetailsButton({
  label,
  className,
  disabled,
  onClick,
}: BookDetailsButtonProps) {
  return (
    <Button
      type="button"
      variant="login"
      label={label}
      disabled={disabled}
      onClick={onClick}
      className={className}
    />
  );
}
