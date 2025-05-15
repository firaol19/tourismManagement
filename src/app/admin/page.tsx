"use client"

import Bar from "@/adminComponents/Bar";
import Booking from "@/adminComponents/Booking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Review from "@/adminComponents/Review";
import { Session } from "next-auth";
import Status from "@/adminComponents/Status";
import TaskPerformance from "@/adminComponents/TaskPerformance";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Admin(){


    const { data, status } = useSession();
    const session: Session | null = status === "authenticated" ? data : null;
    const [isOpen, setIsOpen] = useState(true)
   
    
    useEffect(() => {
      if (status !== 'loading' && !session) {
        redirect('/auth/login');
      
      }
      
    }, [session, status]);


    if (session && session.user.role !== "admin") {
        return <p className="font-serif">Permission Denied</p>;
      }


    
    
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }
    
    return(
        <div className="flex h-screen transition-all ">
            <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
                <Bar/>
            </div>
            <div className={`h-screen transition-all relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
                <div className="w-full px-6 py-3 flex items-center justify-between">
                    <div className="flex gap-3 items-center justify-center">
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
                        <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
                    </div>
                    <div className="bg-main w-[50px] h-[50px] rounded-full">
                    </div>
                </div>
                <Status/>
                <Booking/>
                <div className="flex flex-col md:flex-row px-8 py-10 gap-8">
                    <TaskPerformance/>
                    <Review/>
                </div>
            </div>
        </div>
    )
}