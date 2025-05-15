
"use client";

import Link from "next/link";
import LogoutButton from "./Logout_button";
import ThemeToggle from "./themeToggle";
import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden overflow-hidden font-serif">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={handleToggle}
      >
        <div
          className={`w-6 h-1 bg-main dark:bg-main2 rounded-sm ease-in-out duration-500 ${
            isOpen ? "rotate-45" : ""
          } origin-left`}
        ></div>
        <div
          className={`w-6 h-1 bg-main dark:bg-main2 rounded-sm ease-in-out duration-500 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></div>
        <div
          className={`w-6 h-1 bg-main dark:bg-main2 rounded-sm ease-in-out duration-500 ${
            isOpen ? "-rotate-45" : ""
          } origin-left`}
        ></div>
      </div>
      {isOpen && (
      <div
        className={`absolute z-50 text-main dark:text-main2 rounded-lg top-14 py-10 ease-in-out duration-[0.5s] w-[200px] h-auto bg-text flex flex-col items-center justify-center gap-6 font-medium text-xl ${
          isOpen ? "-right-4" : "-right-64"
        }`}
      >
        <ThemeToggle/>
        <Link href="/" onClick={handleClose}>
          Home
        </Link>
        <Link href="/about" onClick={handleClose}>
          About
        </Link>
        <Link href="/package" onClick={handleClose}>
          Packages
        </Link>
        <Link href="/Message2/1" onClick={handleClose}>
          Help
        </Link>
        <Link href="/destination" onClick={handleClose}>
          Destinations
        </Link>
        <Link href="/userBooking" onClick={handleClose}>
          Cart
        </Link>
        <div onClick={handleClose}>
            <LogoutButton/>
        </div>
        
      </div>
      )}
    </div>
  );
}