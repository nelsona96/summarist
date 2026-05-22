"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SidebarContextInterface {
  isOpen: boolean;
  isVisible: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextInterface | undefined>(
  undefined,
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error(
      "useSidebarContext must be used within a SidebarContextProvider",
    );
  }

  return context;
};

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toggleSidebar = () => {
    clearTimeout(timerRef.current);

    if (!isOpen) {
      setIsOpen(true);
      setIsVisible(true);
    } else if (isOpen && isVisible) {
      setIsOpen(false);
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 350);
    }
  };

  return (
    <SidebarContext value={{ isOpen, isVisible, toggleSidebar }}>
      {children}
    </SidebarContext>
  );
};
