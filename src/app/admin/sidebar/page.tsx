"use client";
import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const AdminSidebar = () => {
  const pathName = usePathname();

  return (
    <div className="h-full w-full p-6 text-white">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <Image src={logo} alt="Logo" height={50} width={50} />
        <h2 className="ml-3 text-lg font-bold">SPIDER</h2>
      </div>

      {/* Navigation Links */}
      <ul>
        <li
          className={clsx("mt-4 p-3 rounded-lg transition-all duration-300", {
            "bg-[#ececec] text-black font-semibold":
              pathName.includes("/admin/paths"),
          })}
        >
          <Link href="/admin/paths">Paths</Link>
        </li>
        <li
          className={clsx("mt-4 p-3 rounded-lg transition-all duration-300", {
            "bg-[#ececec] text-black font-semibold":
              pathName.includes("/admin/modules"),
          })}
        >
          <Link href="/admin/modules">Modules</Link>
        </li>
        <li
          className={clsx("mt-4 p-3 rounded-lg transition-all duration-300", {
            "bg-[#ececec] text-black font-semibold":
              pathName.includes("/admin/moduleSection"),
          })}
        >
          <Link href="/admin/moduleSection">Module Section</Link>
        </li>
        <li
          className={clsx("mt-4 p-3 rounded-lg transition-all duration-300", {
            "bg-[#ececec] text-black font-semibold":
              pathName.includes("/admin/questions"),
          })}
        >
          <Link href="/admin/questions">Questions</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
