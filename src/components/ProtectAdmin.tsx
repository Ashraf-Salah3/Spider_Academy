"use client";

import Loading from "@/app/loading";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

interface CustomJwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  [key: string]: unknown;
}

const ProtectAdmin = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      if (role !== "Admin") {
        router.push("/");
        return;
      }

      setLoading(false);
    } catch {
      router.push("/");
    }
  }, [router]);

  if (loading) return <Loading />;

  return <>{children}</>;
};

export default ProtectAdmin;
