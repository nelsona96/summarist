"use client";

import { useAppSelector } from "@/hooks/redux";
import useRequireAuth from "@/hooks/useRequireAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Temporary() {
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const requireAuth = useRequireAuth();

  return (
    <div>
      <br />
      <p>Current User: {userEmail ? userEmail : "none"}</p>
      <br />
      <button onClick={() => requireAuth("/library")}>Test Soft Gate</button>
      <br />
      {userEmail && (
        <>
          <br />
          <Link href={"/"}>Go back home</Link>
          <br />
          <br />
          <button onClick={() => signOut(auth)}>Log Out</button>
        </>
      )}
    </div>
  );
}
