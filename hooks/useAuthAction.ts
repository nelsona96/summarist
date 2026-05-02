import { clearError, setError, setIsLoading } from "@/store/authSlice";
import { clearInput, startClose } from "@/store/authModalSlice";
import { useAppDispatch } from "./redux";
import { FirebaseError } from "firebase/app";

export function useAuthAction() {
  const dispatch = useAppDispatch();

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

      onSuccess && onSuccess();
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
