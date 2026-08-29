"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AuthModal from "@/components/auth/AuthModal";
import { useCallback, useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  setUser,
  setIsAuthLoading,
  setSubscriptionStatus,
  clearPendingIntent,
} from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { startClose } from "@/store/authModalSlice";
import SplashScreen from "@/components/ui/SplashScreen";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { SubscriptionStatus } from "@/types/user";
import { getGatingAction } from "@/lib/utils";
import { setLibrary } from "@/store/librarySlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthListener />
      <RouteListener />
      <LibraryListener />
      <SplashScreenToggle />
      <ModalToggle />
      {children}
    </Provider>
  );
}

function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          }),
        );

        const docRef = doc(db, `users/${firebaseUser.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(
            setSubscriptionStatus(
              docSnap.data().subscriptionStatus as SubscriptionStatus,
            ),
          );
        } else {
          await setDoc(docRef, { subscriptionStatus: "basic" });
          dispatch(setSubscriptionStatus("basic"));
        }
      } else {
        dispatch(setUser(null));
        dispatch(setSubscriptionStatus(null));
      }

      dispatch(setIsAuthLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
}

function RouteListener() {
  const dispatch = useAppDispatch();
  const { user, subscriptionStatus, isAuthLoading, pendingIntent } =
    useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (prevPath.current !== pathname) dispatch(startClose());
    prevPath.current = pathname;
  }, [pathname, dispatch]);

  // Auto route from landing to dashboard if user is logged in
  useEffect(() => {
    if (!isAuthLoading && user && pathname === "/") {
      router.replace("/for-you");
    }
  }, [user, isAuthLoading, pathname, router]);

  // Subscription gating (decision logic held in pure function)
  useEffect(() => {
    const action = getGatingAction({
      user,
      subscriptionStatus,
      pathname,
      pendingIntent,
    });

    if (action.type === "CLEAR") dispatch(clearPendingIntent());

    if (action.type === "REDIRECT") {
      router.push(action.to);
      dispatch(clearPendingIntent());
    }
  }, [user, subscriptionStatus, pathname, pendingIntent, dispatch, router]);

  return null;
}

function LibraryListener() {
  const dispatch = useAppDispatch();
  const { user, pendingIntent, subscriptionStatus } = useAppSelector(
    (state) => state.auth,
  );
  const pathname = usePathname();

  // listen to firebase, update redux
  useEffect(() => {
    if (user) {
      const libraryRef = collection(db, `users/${user.uid}/library`);

      const unsubscribe = onSnapshot(libraryRef, (librarySnap) => {
        const libraryArray: string[] = librarySnap.docs.map(
          (id) => id.data()["bookId"],
        );

        dispatch(setLibrary(libraryArray));
      });

      return unsubscribe;
    } else {
      dispatch(setLibrary([]));
    }
  }, [user, dispatch]);

  // add/remove book from library based on returned gating action
  useEffect(() => {
    const action = getGatingAction({
      user,
      pendingIntent,
    });

    const updateLibrary = async () => {
      if (action.type === "SAVE") {
        const bookRef = doc(
          db,
          `users/${action.userId}/library/${action.bookId}`,
        );

        await setDoc(bookRef, { bookId: action.bookId });

        dispatch(clearPendingIntent());
      }

      if (action.type === "REMOVE") {
        const bookRef = doc(
          db,
          `users/${action.userId}/library/${action.bookId}`,
        );

        await deleteDoc(bookRef);

        dispatch(clearPendingIntent());
      }
    };

    updateLibrary();
  }, [user, pendingIntent, dispatch]);

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
    window.scrollTo(0, 0);
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
