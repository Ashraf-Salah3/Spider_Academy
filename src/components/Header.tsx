"use client";

import { logo } from "@/assets";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
//import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  const pathName = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userId");
    setToken(storedToken);
  }, []);
  //  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  // useEffect(() => {
  //   const token = document.cookie
  //     .split("; ")
  //     .find((row) => row.startsWith("academyToken="))
  //     ?.split("=")[1];

  //   setIsAuthenticated(!!token);
  // }, []);

  const handleLogout = () => {
    // document.cookie = "academyToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // document.cookie = "nameIdentifier=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between py-1  px-8 sticky top-0 z-50 bg-[#0e101b]">
      <div className="flex items-center text-white  ">
        <Image src={logo} alt="Logo" height={50} width={50} />
        <h2 className="ml-3 text-lg font-bold">SPIDER ACADEMY</h2>
      </div>
      <nav className="w-1/5">
        <ul className="flex items-center gap-4 text-white w-1/2">
          <li
            className={clsx(" transition-all duration-300", {
              "border-b-white border-b-2 text-white font-semibold":
                pathName.includes("paths"),
            })}
          >
            <Link href="/paths">Paths</Link>
          </li>
          <li
            className={clsx(" transition-all duration-300", {
              "border-b-white border-b-2 text-white font-semibold":
                pathName.includes("modules"),
            })}
          >
            <Link href="/modules">Modules</Link>
          </li>
        </ul>
      </nav>
      <div>
        {token && (
          <button onClick={handleLogout}>
            <FiLogOut color="white" size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
