import styles from "./layout.module.css";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarContextProvider } from "@/context/SidebarContext";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarContextProvider>
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <div>Searchbar Placeholder</div>
          {children}
        </main>
      </div>
    </SidebarContextProvider>
  );
}
