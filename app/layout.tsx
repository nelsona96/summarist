import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "./Providers";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Key ideas from the world's best nonfiction books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
