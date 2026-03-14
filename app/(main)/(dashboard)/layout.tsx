import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <aside>Sidebar Placeholder</aside>
      <main>
        <div>Searchbar Placeholder</div>
        {children}
      </main>
    </div>
  );
}
