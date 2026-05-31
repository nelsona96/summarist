import Searchbar from "@/components/layout/Searchbar";
import styles from "./layout.module.css";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarContextProvider } from "@/context/SidebarContext";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarContextProvider>
      <div className={styles.grid}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <header className={styles.header}>
            <Searchbar />
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </SidebarContextProvider>
  );
}
