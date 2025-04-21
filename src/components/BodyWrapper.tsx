"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BodyWrapper({ children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <main className="antialiased relative">
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </main>
  );
}
