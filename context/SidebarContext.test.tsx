import { act, ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { makeStore } from "@/test/utils";
import { Provider } from "react-redux";
import { SidebarContextProvider, useSidebarContext } from "./SidebarContext";

function providers({ children }: { children: ReactNode }) {
  const store = makeStore();

  return (
    <Provider store={store}>
      <SidebarContextProvider>{children}</SidebarContextProvider>
    </Provider>
  );
}

vi.mock("@/lib/firebase", () => ({
  auth: {},
}));

describe("SidebarContext", () => {
  it("toggleSidebar changes isOpen state", () => {
    const { result } = renderHook(() => useSidebarContext(), {
      wrapper: providers,
    });

    act(() => result.current.toggleSidebar());

    expect(result.current.isOpen).toBeTruthy(); // isOpen is false by default
  });
});
