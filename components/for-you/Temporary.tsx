"use client";

import { useAppSelector } from "@/hooks/redux";
import useRequireAuth from "@/hooks/useRequireAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Temporary() {
  const { user, subscriptionStatus } = useAppSelector((state) => state.auth);
  const userEmail = user?.email;
  const requireAuth = useRequireAuth();

  return (
    <div>
      <br />
      <p>Current User: {userEmail ? userEmail : "none"}</p>
      <p>Subscription Status: {subscriptionStatus} </p>
      <br />
      <button onClick={() => requireAuth("/library")}>Test Soft Gate</button>
      <br />
      {userEmail && (
        <>
          <br />
          <button onClick={() => signOut(auth)}>Log Out</button>
        </>
      )}
    </div>
  );
}
