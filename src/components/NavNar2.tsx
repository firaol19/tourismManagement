"use client"

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./Logout_button";
import MobileNav from "./MobileNav";
import SearchComponent from "./SearchComponent";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

//import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";



//import ThemeToggle from "./themeToggle";


export default function NavBar(){
   // const [isUser, setUser] = useState<boolean | null>(null)
   // useEffect(()=>{
   //     if(pathname.startsWith("/Message2/7")){
   //         setUser(true)
   //     }
    //}, []);
    
    const { data, status } = useSession();
    const session: Session | null = status === "authenticated" ? data : null;
    const pathname = usePathname();
    console.log(pathname)
    return(
        <div className="bg-secondary  z-50 text-main dark:text-main2 w-full h-16 flex items-center px-2 sm:px-10 lg:px-20 justify-between overflow-hidden " >
            <h1 className="font-extrabold font-serif">TOUR APP</h1>
            <SearchComponent/>
            <div className=" justify-between w-[540px] hidden md:flex">
                <Link className={`font-bold font-sans ${pathname === "/" ? "text-main" : "text-main2 " }`} href="/">Home</Link>
                <Link className={`font-bold font-sans ${pathname === "/about" ? "text-main" : "text-main2 " }`} href="/about">About</Link>
                <Link className={`font-bold font-sans ${pathname === "/package" ? "text-main" : "text-main2 " }`} href="/package">Packages</Link>
                <Link className={`font-bold font-sans ${pathname === "/destination" ? "text-main" : "text-main2 " }`} href="/destination">Destinations</Link>
                <Link className={`font-bold font-sans ${pathname === "/help" ? "text-main" : "text-main2 " }`} href="/Message2/7">Help</Link>
                <Link className={`font-bold font-sans ${pathname === "/userBooking" ? "text-main " : "text-main2 " }`} href="/userBooking">Cart</Link>
                <LogoutButton/>
            </div>
            <div className={session ? "hidden" : ""}> 
                <Link href="/auth/login" className="bg-main dark:bg-main2 font-sans rounded-lg text-text py-2 px-4 hidden sm:block md:hidden lg:block">Register Now</Link>
            </div>
            <div className={session  ? "" : "hidden"}>
                <Image src={session?.user.image  || "/default.jpg"} height={35} width={35} alt="logo" className="rounded-full hidden sm:block md:hidden lg:block"/>
            </div>
            <MobileNav/>
            
        </div>
    )
}