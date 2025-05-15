"use client";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

export default function ThemeToggle() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 bg-gray-200 dark:bg-gray-800 rounded-md  ${pathname === "/admin" || pathname === "/about" || pathname === "/message" || pathname.startsWith("/list/") || pathname.startsWith("/register/") || pathname.startsWith("/Message2/") || pathname === "/bookedService" || pathname === "/BookedPackages" || pathname === "/reviewAdmin" || pathname === "/payments" || pathname === "/canceledBookings" || pathname.startsWith("/guide/") || pathname.startsWith("/acco_provider/") || pathname.startsWith("/tra_provider/") || pathname.startsWith("/destination_provider/") || pathname === "/c_service" ? "hidden" : "" }`}
    >
      <div className={`${theme === "light" ? "inline" : "hidden"} flex gap-2 justify-center items-center`}>
      <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-[#a3a3a3] "/>
      <span>Dark Mode</span>
      </div>
      <div className={`${theme === "light" ? "hidden" : "inline"} flex gap-2 justify-center items-center`}>
      <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-[#facc15] "/>
      <span>Light Mode</span>
      </div>
    </button>
  );
}
