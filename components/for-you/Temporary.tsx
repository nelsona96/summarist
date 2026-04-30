"use client";

import { useAppSelector } from "@/hooks/redux";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Temporary() {
  const userEmail = useAppSelector((state) => state.auth.user?.email);

  return (
    <>
      <br />
      <p>Current User: {userEmail}</p>
      <br />
      <button onClick={() => signOut(auth)}>Log Out</button>
      <br />
    </>
  );
}
