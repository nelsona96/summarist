"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AuthModal from "@/components/auth/AuthModal";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser, setIsLoading } from "@/store/authSlice";
import { usePathname } from "next/navigation";
import { setProtectedRoute } from "@/store/authModalSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener />
      <ModalToggle />
      {children}
    </Provider>
  );
}

function ModalToggle() {
  const isOpen = useAppSelector((state) => state.authModal.isOpen);
  return isOpen ? <AuthModal /> : null;
}

function AuthListener() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch(
        setUser(
          firebaseUser
            ? {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
              }
            : null,
        ),
      );

      dispatch(setIsLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProtectedRoute(pathname !== "/"));
  }, [pathname, dispatch]);

  return null;
}
