import { openModal } from "@/store/authModalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { useRouter } from "next/navigation";

export default function useRequireAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.user !== null);

  const requireAuth = (redirectPath: string) => {
    if (isLoggedIn) {
      router.push(redirectPath);
    } else {
      dispatch(openModal(redirectPath));
    }
  };

  return requireAuth;
}
