import clsx from "clsx";
import styles from "./NotFoundFallback.module.css";
import ErrorButton from "@/components/errors/ErrorButton";

interface NotFoundFallbackProps {
  message: string;
  redirect: string;
  buttonLabel: string;
  statusCode?: number | undefined;
  className?: string | undefined;
}

export default function NotFoundFallback({
  statusCode,
  message,
  redirect,
  buttonLabel,
  className,
}: NotFoundFallbackProps) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.errorWrapper}>
        <div className={styles.error}>
          {statusCode && (
            <>
              <h1 className={styles.errorStatus}>{statusCode}</h1>
              <span className={styles.errorDivider} aria-hidden="true"></span>
            </>
          )}

          <p className={styles.errorMessage}>{message}</p>
        </div>
        <ErrorButton href={redirect} label={buttonLabel} />
      </div>
    </div>
  );
}
