"use client"

import { useState } from "react";

type Data = {
    link: string;
    name: string;
  };
  
  type Props = {
    data: Data[];
    title: string;
  };
     
export default function Dropdown({ data, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex justify-between font-roboto text-lg w-[150px] rounded-md py-2 text-main2 hover:text-main2 transition-all items-center"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
         {title}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className=""
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="" role="none">
            {data.map((item) => (
                <a
                key={item.name}
                href={item.link}
                className=" block px-4 py-2  text-sm text-text hover:text-primary2 transition-all font-roboto"
                role="menuitem"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}