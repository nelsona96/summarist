import { clearError, setError, setIsLoading } from "@/store/authSlice";
import { clearInput, startClose } from "@/store/authModalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

export function useAuthAction() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pendingRedirect = useAppSelector(
    (state) => state.authModal.pendingRedirect,
  );

  const execute = async (
    firebaseAction: () => Promise<unknown>,
    onSuccess?: () => void,
  ) => {
    try {
      dispatch(clearError());
      dispatch(setIsLoading(true));

      await firebaseAction();

      dispatch(startClose());
      dispatch(clearInput());

      if (onSuccess) onSuccess();

      if (pendingRedirect) router.push(pendingRedirect);
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return execute;
}
