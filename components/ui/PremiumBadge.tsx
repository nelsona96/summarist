"use client";

import clsx from "clsx";
import styles from "./PremiumBadge.module.css";
import { useAppSelector } from "@/hooks/redux";

interface PremiumBadgeProps {
  requiresSubscription: boolean;
  className?: string | undefined;
}

export default function PremiumBadge({
  requiresSubscription,
  className,
}: PremiumBadgeProps) {
  const { subscriptionStatus } = useAppSelector((state) => state.auth);

  const showPremiumBadge =
    requiresSubscription && subscriptionStatus !== "premium-plus";

  return showPremiumBadge ? (
    <span className={clsx(styles.premiumBadge, className)}>
      Premium
      <span className="srOnly">— subscription required</span>
    </span>
  ) : null;
}
