export type ButtonVariants = "login" | "guest" | "google";

export interface ButtonProps {
  variant: ButtonVariants;
  type: "submit" | "reset" | "button";
  label: string | React.ReactElement; // TODO: label doubles as icon+text slot; consider children/icon instead if reused further
  onClick?: () => void;
  disabled?: boolean;
  maxWidth?: string;
  height?: string;
  ariaBusy?: boolean;
  ariaLabel?: string;
  className?: string;
}
