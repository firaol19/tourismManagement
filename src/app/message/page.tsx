import Bar2 from "@/adminComponents/Bar2";
import LeftSide from "@/messageComponents/LeftSide";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Message = async () => {

 const session = await getServerSession(authOptions)

    if (!session) {
        
        redirect("/auth/login");
      
      }

    
  return (
    <div className="flex border-t-2 border-gray-500 h-screen overflow-hidden bg-[#E8DFC8]">
      <div className="w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[25%] hidden sm:block">
        <Bar2/>
      </div>
      <div className="w-full md:w-[40%] lg:w-[25%]">
        <LeftSide />
      </div>
      <div className="hidden md:block w-[60%] lg:w-[50%] bg-[#fafaf9]">
        <div className="flex justify-center items-center h-full">
          <span className="bg-green-400 text-white px-4 py-2 rounded-full">
            Select a chat to start messaging
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
