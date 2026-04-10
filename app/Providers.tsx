"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useAppSelector } from "@/hooks/redux";
import AuthModal from "@/components/auth/AuthModal";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <ModalToggle />
    </Provider>
  );
}

function ModalToggle() {
  const isOpen = useAppSelector((state) => state.auth.isOpen);
  return isOpen ? <AuthModal /> : null;
}
