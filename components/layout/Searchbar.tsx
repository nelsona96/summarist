"use client";

import styles from "./Searchbar.module.css";
import { useSidebarContext } from "@/context/SidebarContext";
import { notImplemented } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { LuSearch, LuX, LuMenu } from "react-icons/lu";

export default function Searchbar() {
  const { isOpen, toggleSidebar } = useSidebarContext();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    notImplemented();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className={styles.inputWrapper}
      >
        <label htmlFor="search" className="srOnly">
          Search for books
        </label>
        <input
          onChange={handleInput}
          value={input}
          ref={inputRef}
          id="search"
          type="search"
          placeholder="Search for books"
          className={styles.input}
        />
        <div className={styles.searchIcons}>
          {input && (
            <button
              onClick={clearInput}
              type="button"
              aria-label="Clear search input"
              className={styles.clearButton}
            >
              <LuX aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            aria-label="Search"
            className={styles.searchButton}
          >
            <LuSearch aria-hidden="true" />
          </button>
        </div>
      </form>
      <button
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        className={styles.menu}
      >
        <LuMenu aria-hidden="true" />
      </button>
    </div>
  );
}
