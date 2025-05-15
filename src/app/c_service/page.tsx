"use client"

import { useEffect, useState } from "react";

import Bar2 from "@/adminComponents/Bar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Admin(){
    const [isOpen, setIsOpen] = useState(true)
    const { data, status } = useSession();
    const session: Session | null = status === "authenticated" ? data : null;
   
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }
   
   
    
    useEffect(() => {
      if (status !== 'loading' && !session) {
        redirect('/auth/login');
      
      }
      
    }, [session, status]);


    if (session && session.user.role !== "customer_service") {
        return <p className="font-serif">Permission Denied</p>;
      }
    
    return(
        <div className="flex h-screen transition-all ">
            <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
                <Bar2/>
            </div>
            <div className={`h-full transition-all relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
                <div className="w-full px-6 py-3 flex items-center justify-between">
                    <div className="flex gap-3 items-center justify-center">
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
                        <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
                    </div>
                    <div className="bg-main w-[50px] h-[50px] rounded-full">
                    </div>
                </div>
                <div className="h-full">
                <div className="w-fit mx-auto h-full flex justify-center items-center relative top-[-50px]  ">
                    <p className="text-text text-2xl bg-white p-6 rounded-lg shadow-lg font-serif mt-5" >Welcome To Customer Service Dashboard</p>
                </div>
                </div>
                
            </div>
        </div>
    )
}