import ReviewServer from "@/reviewComponents/ReviewServer";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ReviewPage = async () => {

    const session = await getServerSession(authOptions)

    if (!session) {
        console.log("test");
        redirect("/auth/login");
      }
      
    
  return (
    <div>
      <ReviewServer />
    </div>
  );
};

export default ReviewPage