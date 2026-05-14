export type ButtonVariants = "login" | "guest" | "google";

export interface ButtonProps {
  variant: ButtonVariants;
  type: "submit" | "reset" | "button";
  label: string | React.ReactElement;
  onClick?: () => void;
  disabled?: boolean;
  maxWidth?: string;
  height?: string;
  ariaBusy?: boolean;
  ariaLabel?: string;
}
