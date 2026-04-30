import { openModal } from "@/store/authModalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useEffect } from "react";

export default function useRequireAuth() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      dispatch(openModal());
    }
  }, [isLoggedIn, isLoading]);
}
