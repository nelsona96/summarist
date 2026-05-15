"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextInterface {
  isOpen: boolean;
  isClosing: boolean;
  openSidebar: () => void;
  startClose: () => void;
  finalizeClose: () => void;
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
  const [isClosing, setIsClosing] = useState(false);

  const openSidebar = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const startClose = () => {
    setIsClosing(true);
  };

  const finalizeClose = () => {
    setIsClosing(false);
    setIsOpen(false);
  };

  return (
    <SidebarContext
      value={{ isOpen, isClosing, openSidebar, startClose, finalizeClose }}
    >
      {children}
    </SidebarContext>
  );
};
