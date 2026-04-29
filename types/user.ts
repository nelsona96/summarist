export interface AppUser {
  uid: string;
  email: string | null;
}

export type SubscriptionStatus = "basic" | "premium" | "premium-plus" | null;
