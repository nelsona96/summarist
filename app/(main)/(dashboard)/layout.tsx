import { SidebarContextProvider } from "@/context/SidebarContext";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarContextProvider>
      <aside>Sidebar Placeholder</aside>
      <main>
        <div>Searchbar Placeholder</div>
        {children}
      </main>
    </SidebarContextProvider>
  );
}
