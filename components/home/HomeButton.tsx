"use client";

import { useAppDispatch } from "@/hooks/redux";
import { openModal } from "@/store/authSlice";
import Button from "../ui/Button";

export default function HomeButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="login"
      type="button"
      label="Login"
      maxWidth="300px"
      onClick={() => dispatch(openModal())}
    />
  );
}
