import { ReactNode } from "react";
import Footer from "@/components/layout/Footer/Footer";

export default function CheckoutLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
