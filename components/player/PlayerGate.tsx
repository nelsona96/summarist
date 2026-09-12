"use client";

import { ReactNode } from "react";
import { useAppSelector } from "@/hooks/redux";

export default function PlayerGate({
  subscriptionRequired,
  children,
}: {
  subscriptionRequired: boolean;
  children: ReactNode;
}) {
  const { user, subscriptionStatus } = useAppSelector((state) => state.auth);
  const isPremiumPlus = subscriptionStatus === "premium-plus";

  if (!user) {
    return <NotLoggedIn />;
  } else if (subscriptionRequired && !isPremiumPlus) {
    return <UpgradePlan />;
  } else return children;
}

function NotLoggedIn() {
  return (
    <div>
      <p>Please login to see the content.</p>
    </div>
  );
}

function UpgradePlan() {
  return (
    <div>
      <p>Please upgrade your plan to see the content.</p>
    </div>
  );
}
