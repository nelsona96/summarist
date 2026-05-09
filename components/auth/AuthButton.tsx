import { ButtonProps, ButtonVariants } from "@/types/button";
import Button from "../ui/Button";
import { useAppSelector } from "@/hooks/redux";
import LoadingSpinner from "../ui/LoadingSpinner";

interface AuthButtonProps extends ButtonProps {
  label: string;
  loadingButton?: ButtonVariants | null;
}

const ariaLabel = "Loading, please wait";

export default function AuthButton({
  variant,
  type,
  label,
  onClick,
  disabled,
  maxWidth,
  height,
  loadingButton,
}: AuthButtonProps) {
  const { isAuthLoading } = useAppSelector((state) => state.auth);

  return (
    <Button
      ariaLabel={loadingButton === variant && isAuthLoading ? ariaLabel : label}
      ariaBusy={loadingButton === variant && isAuthLoading}
      variant={variant}
      type={type}
      label={
        loadingButton === variant && isAuthLoading ? (
          <LoadingSpinner size="md" />
        ) : (
          label
        )
      }
      onClick={onClick}
      disabled={disabled}
      maxWidth={maxWidth}
      height={height}
    />
  );
}
