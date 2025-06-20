"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (
      !token &&
      pathname !== "/" &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/reset-password" &&
      pathname !== "/forget-password"
    ) {
      router.push("/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
