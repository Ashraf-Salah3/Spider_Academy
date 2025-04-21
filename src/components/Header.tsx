"use client";

import { logo } from "@/assets";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathName = usePathname();
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
            <Link href="modules">Modules</Link>
          </li>
        </ul>
      </nav>
      <div className="text-white">
        <a >Contact Us</a>
      </div>
    </header>
  );
};

export default Header;
