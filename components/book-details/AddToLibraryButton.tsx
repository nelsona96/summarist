"use client";

import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import BookDetailsButton from "./BookDetailsButton";
import styles from "./AddToLibraryButton.module.css";
import { useState } from "react";

export default function AddToLibraryButton() {
  const [isInLibrary, setIsInLibrary] = useState(false);

  const toggleLibrary = () => {
    setIsInLibrary((prev) => !prev);
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
