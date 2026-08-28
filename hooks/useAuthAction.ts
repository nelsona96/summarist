import { clearError, setError, setIsAuthLoading } from "@/store/authSlice";
import { startClose } from "@/store/authModalSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import { FirebaseError } from "firebase/app";

export function useAuthAction() {
  const { currentVariant } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();

  const execute = async (
    firebaseAction: () => Promise<unknown>,
    onSuccess?: () => void,
  ) => {
    try {
      dispatch(clearError());
      dispatch(setIsAuthLoading(true));

      await firebaseAction();

      if (currentVariant !== "forgotPassword") dispatch(startClose());

      if (onSuccess) onSuccess();
    } catch (error) {
      if (error instanceof FirebaseError) {
        dispatch(setError(error.message));
      }
    } finally {
      dispatch(setIsAuthLoading(false));
    }
  };

  return execute;
}
