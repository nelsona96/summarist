import { type PendingIntent, setPendingIntent } from "@/store/authSlice";
import { openModal } from "@/store/authModalSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export default function useRequireAuth() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.user !== null);

  const requireAuth = ({ intent, payload }: PendingIntent) => {
    dispatch(
      setPendingIntent({ pendingIntent: { intent: intent, payload: payload } }),
    );

    if (!isLoggedIn) dispatch(openModal());
  };

  return requireAuth;
}
