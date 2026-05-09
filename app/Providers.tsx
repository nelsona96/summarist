"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AuthModal from "@/components/auth/AuthModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser, setIsLoading } from "@/store/authSlice";
import { usePathname } from "next/navigation";
import { startClose } from "@/store/authModalSlice";
import SplashScreen from "@/components/ui/SplashScreen";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener />
      <RouteListener />
      <SplashScreenToggle />
      <ModalToggle />
      {children}
    </Provider>
  );
}

function AuthListener() {
  const dispatch = useAppDispatch();

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

  return null;
}

function RouteListener() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") dispatch(startClose());
  }, [pathname, dispatch]);

  return null;
}

function SplashScreenToggle() {
  const { isAuthLoading } = useAppSelector((state) => state.auth);
  const isLoading = useRef(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [splashPhase, setSplashPhase] = useState<
    "animating" | "loading" | "ready"
  >("animating");

  const animateOut = useCallback(() => {
    setTimeout(() => {
      setShowSplashScreen(isLoading.current);
    }, 200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSplashPhase(isLoading.current ? "loading" : "ready");
      animateOut();
    }, 2500);
  }, [animateOut]);

  useEffect(() => {
    if (!showSplashScreen) return;

    isLoading.current = isAuthLoading;

    if (!isAuthLoading && splashPhase === "loading") {
      setSplashPhase("ready");
      animateOut();
    }
  }, [showSplashScreen, isAuthLoading, splashPhase]);

  return showSplashScreen ? <SplashScreen splashPhase={splashPhase} /> : null;
}

function ModalToggle() {
  const isOpen = useAppSelector((state) => state.authModal.isOpen);
  return isOpen ? <AuthModal /> : null;
}
