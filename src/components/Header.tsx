"use client";

import { logo } from "@/assets";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Cookies from "js-cookie";


const Header = () => {
  const pathName = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const toggleMenu = () => setShowMenu((prev) => !prev);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, [pathName]);
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <header className="flex md:items-center flex-col md:flex-row md:justify-between py-1 px-3 md:px-8 sticky top-0 z-50 bg-[#0e101b] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-white  ">
          <Image src={logo} alt="Logo" height={50} width={50} />
          <h2 className=" text-sm md:text-lg font-bold">SPIDER ACADEMY</h2>
        </div>
        <div className="block md:hidden">
          {showMenu ? (
            <IoMdClose
              size={28}
              onClick={toggleMenu}
              color="white"
              className="text-white cursor-pointer"
            />
          ) : (
            <HiOutlineMenuAlt3
              size={28}
              onClick={toggleMenu}
              color="white"
              className="text-white cursor-pointer"
            />
          )}
        </div>
      </div>
      <nav
        className={`md:w-1/4 flex  transition-all duration-500 ease-in-out ${
          showMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } md:max-h-full md:opacity-100`}
      >
        <ul className="flex flex-col md:flex-row max-md:m-4 md:items-center gap-4 md:gap-8 p-4 md:p-0 ">
          <li
            className={clsx(
              " transition-all duration-300 text-white font-semibold",
              {
                "border-b-white border-b-2 ": pathName.includes("paths"),
              }
            )}
          >
            <Link href="/paths">Paths</Link>
          </li>
          <li
            className={clsx(
              " transition-all duration-300 text-white font-semibold",
              {
                "border-b-white border-b-2": pathName.includes("modules"),
              }
            )}
          >
            <Link href="/modules">Modules</Link>
          </li>

          <li className="block md:hidden text-white">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="hidden md:block">
        {isAuthenticated && (
          <button onClick={handleLogout}>
            <FiLogOut color="white" size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
