import { renderWithProviders as render } from "@/test/utils";
import { describe, it, expect } from "vitest";
import PremiumBadge from "./PremiumBadge";
import { screen } from "@testing-library/react";

describe("Premium badge", () => {
  const baseAuthState = {
    user: null,
    subscriptionStatus: null,
    isAuthLoading: false,
    error: null,
  };

  it("shows: subscriptionRequired | not logged in", () => {
    // user login status is implicit — subscription status is null unless a user is logged in
    render(<PremiumBadge requiresSubscription={true} />, {
      preloadedState: {
        auth: { ...baseAuthState, subscriptionStatus: null },
      },
    });

    expect(screen.queryByText("Premium")).toBeInTheDocument();
  });

  it("shows: subscriptionRequired | logged in | not premium-plus", () => {
    render(<PremiumBadge requiresSubscription={true} />, {
      preloadedState: {
        auth: { ...baseAuthState, subscriptionStatus: "basic" },
      },
    });

    expect(screen.queryByText("Premium")).toBeInTheDocument();
  });

  it("hides: subscriptionRequired | logged in | premium-plus", () => {
    render(<PremiumBadge requiresSubscription={true} />, {
      preloadedState: {
        auth: {
          ...baseAuthState,
          subscriptionStatus: "premium-plus",
        },
      },
    });

    expect(screen.queryByText("Premium")).toBeNull();
  });

  it("hides: not subscriptionRequired | logged in | not premium-plus", () => {
    render(<PremiumBadge requiresSubscription={false} />, {
      preloadedState: {
        auth: { ...baseAuthState, subscriptionStatus: "premium" },
      },
    });

    expect(screen.queryByText("Premium")).toBeNull();
  });
});
