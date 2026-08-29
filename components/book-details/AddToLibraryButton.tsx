"use client";

import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import BookDetailsButton from "./BookDetailsButton";
import styles from "./AddToLibraryButton.module.css";
import { useAppSelector } from "@/hooks/redux";
import useRequireAuth from "@/hooks/useRequireAuth";

export default function AddToLibraryButton({ bookId }: { bookId: string }) {
  const requireAuth = useRequireAuth();
  const isInLibrary = useAppSelector((state) => state.library.includes(bookId));

  const toggleLibrary = () => {
    if (isInLibrary) {
      requireAuth({ intent: "REMOVE_FROM_LIBRARY", payload: bookId });
    } else {
      requireAuth({ intent: "SAVE_TO_LIBRARY", payload: bookId });
    }
  };

  return (
    <BookDetailsButton
      label={
        <>
          {isInLibrary ? (
            <>
              <RiBookmarkFill aria-hidden className={styles.icon} />
              Saved in My Library
            </>
          ) : (
            <>
              <RiBookmarkLine aria-hidden className={styles.icon} />
              Add Title to My Library
            </>
          )}
        </>
      }
      onClick={() => toggleLibrary()}
      className={styles.button}
    />
  );
}
