"use client";

import { useAppSelector } from "@/hooks/redux";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Temporary() {
  const userEmail = useAppSelector((state) => state.auth.user?.email);

  return (
    <div>
      <br />
      <p>Current User: {userEmail ? userEmail : "none"}</p>
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
