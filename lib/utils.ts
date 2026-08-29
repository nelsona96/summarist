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
  // intent = "ACCESS_BOOK":
  | { type: "REDIRECT"; to: string }
  // intent = "SAVE_TO_LIBRARY" | "REMOVE_FROM_LIBRARY"
  | { type: "SAVE"; userId: string; bookId: string }
  | { type: "REMOVE"; userId: string; bookId: string }
  // clear intent:
  | { type: "CLEAR" }
  // do nothing:
  | { type: "WAIT" };

interface GatingActionProps {
  user: AppUser | null;
  pendingIntent: PendingIntent | null;
  subscriptionStatus?: SubscriptionStatus;
  pathname?: string;
}

export function getGatingAction({
  user,
  pendingIntent,
  subscriptionStatus,
  pathname,
}: GatingActionProps): GatingAction {
  // Access book content / player:
  if (pendingIntent?.intent === "ACCESS_BOOK") {
    if (!pathname?.startsWith("/book")) return { type: "CLEAR" };

    if (user && subscriptionStatus) {
      if (subscriptionStatus === "premium-plus") {
        return { type: "REDIRECT", to: `/player/${pendingIntent.payload}` };
      } else {
        return { type: "REDIRECT", to: "/choose-plan" };
      }
    }
  }

  // Toggle book saved to library:
  if (pendingIntent?.intent === "SAVE_TO_LIBRARY") {
    if (!pathname?.startsWith("/book")) return { type: "CLEAR" };

    if (user && pendingIntent) {
      return { type: "SAVE", userId: user.uid, bookId: pendingIntent.payload };
    }
  }

  if (pendingIntent?.intent === "REMOVE_FROM_LIBRARY") {
    if (!pathname?.startsWith("/book")) return { type: "CLEAR" };

    if (user && pendingIntent) {
      return {
        type: "REMOVE",
        userId: user.uid,
        bookId: pendingIntent.payload,
      };
    }
  }

  return { type: "WAIT" };
}
