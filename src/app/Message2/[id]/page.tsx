"use client"

import Bar2 from "@/adminComponents/Bar2";
import LeftSide from "@/messageComponents/LeftSide";
import Main from "@/messageComponents/Main";
import NavNar2 from "@/components/NavNar2";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Messages =  () => {
  const { data: session, status } = useSession();
  
  
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

      useEffect(() => {
        if (status !== "loading" && !session) {
          router.push("/auth/login");
          
        }
      }, [session, status, router])

  const senderId = session?.user.id;
  const receiverId = id;

  return (
    <>
    {Number(senderId) !== 7 && (
        <div>
          <NavNar2/>
        </div>
      )}
      <div className="flex border-t-2 border-gray-500 h-full  bg-[#E8DFC8]">
      
      {Number(senderId) === 7 && (
        <div className="w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[25%] hidden sm:block">
                <Bar2/>
              </div>
      )}
      <div className={`hidden md:block md:w-[40%] lg:w-[25%]  ${Number(senderId) !== 7 ? "invisible" : ""} `}>
        <LeftSide />
      </div>
      <div className="w-full md:w-[60%] lg:w-[50%]  bg-[#fafaf9]">
        <Main senderId={senderId!} receiverId={receiverId} />
      </div>
    </div>
    </>
    
  );
};
export default Messages;
