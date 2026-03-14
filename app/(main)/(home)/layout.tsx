import { ReactNode } from "react";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
