import { ReactNode } from "react";
import Footer from "@/components/layout/Footer/Footer";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
