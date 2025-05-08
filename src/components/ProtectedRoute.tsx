"use client";
import { redirect, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("userId");

    if (
      !token &&
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/reset-password" &&
      pathname !== "/forget-password"
    ) {
      redirect("/login");
    }
  }, [pathname]);


  return <>{children}</>;
};

export default ProtectedRoute;
