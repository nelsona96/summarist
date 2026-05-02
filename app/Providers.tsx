"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AuthModal from "@/components/auth/AuthModal";
import { useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setUser, setIsLoading, setError } from "@/store/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { setProtectedRoute, startClose } from "@/store/authModalSlice";

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
  const router = useRouter();

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
    if (pathname === "/") dispatch(startClose());
    dispatch(setProtectedRoute(pathname !== "/"));
  }, [pathname, dispatch]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          router.push("/for-you");
          console.log("user present");
        } else {
          console.log("user not present");
        }
        console.log(result);
      })
      .catch((error) => {
        dispatch(setError(error.message));
        console.error(error);
      });
  }, []);

  return null;
}
