"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { openModal } from "@/store/authModalSlice";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.user !== null);

  return (
    <Button
      variant="login"
      type="button"
      label="Login"
      maxWidth="300px"
      onClick={() =>
        isLoggedIn ? router.push("/for-you") : dispatch(openModal())
      }
    />
  );
}
