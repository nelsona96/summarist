import { PendingIntent } from "@/store/authSlice";
import { AppUser, SubscriptionStatus } from "@/types/user";
import { toast } from "sonner";

// Temporary function for making sure Vitest is setup and running correctly
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesString = String(minutes).padStart(2, "0");
  const secondsString = String(remainingSeconds).padStart(2, "0");

  const time = `${minutesString}:${secondsString}`;

  return time;
}

export function notImplemented() {
  toast.info("Hi there!", {
    description: "This functionality has not yet been implemented.",
  });
}

// Subscription gate - pure function for decision logic
type GatingAction =
  | { type: "CLEAR" }
  | { type: "REDIRECT"; to: string }
  | { type: "WAIT" };

interface GatingActionProps {
  user: AppUser | null;
  subscriptionStatus: SubscriptionStatus;
  pathname: string;
  pendingIntent: PendingIntent | null;
}

export function getGatingAction({
  user,
  subscriptionStatus,
  pathname,
  pendingIntent,
}: GatingActionProps): GatingAction {
  // Access book content / player:
  if (pendingIntent?.intent === "ACCESS_BOOK") {
    if (!pathname.startsWith("/book")) return { type: "CLEAR" };

    if (user && subscriptionStatus) {
      if (subscriptionStatus === "premium-plus") {
        return { type: "REDIRECT", to: `/player/${pendingIntent.payload}` };
      } else {
        return { type: "REDIRECT", to: "/choose-plan" };
      }
    }
  }

  return { type: "WAIT" };
}
