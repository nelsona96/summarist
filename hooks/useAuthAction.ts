import { clearError, setError, setIsLoading } from "@/store/authSlice";
import { clearInput, startClose } from "@/store/authModalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

export function useAuthAction() {
  const { currentVariant } = useAppSelector((state) => state.authModal);
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

      if (currentVariant !== "forgotPassword") {
        dispatch(startClose());
        dispatch(clearInput());

        if (pendingRedirect) router.push(pendingRedirect);
      }

      if (onSuccess) onSuccess();
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
