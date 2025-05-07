"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();

  // function getCookie(name: string): string | undefined {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop()?.split(";").shift();
  // }

  useEffect(() => {
    const token = localStorage.getItem("userId");

    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);
  return <div>{children}</div>;
};

export default ProtectedRoute;
