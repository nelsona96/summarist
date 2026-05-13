"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { auth } from "@/lib/firebase";
import { openModal } from "@/store/authModalSlice";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Page() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  return (
    // Temporary/placeholder for soft gate testing
    <div>
      <br />
      <Link href={"/for-you"}>Go Back</Link>
      <br />
      <br />
      <h2>This is a protected route/feature!</h2>
      <p>Only subscribed users can see the following:</p>
      <br />
      {user ? (
        <>
          <p>Hello {user.email}, thank you for being a subscribed user!</p>
          <br />
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      ) : (
        <>
          <p>Please login to see content.</p>
          <br />
          <button onClick={() => dispatch(openModal())}>Login</button>
        </>
      )}
    </div>
  );
}
