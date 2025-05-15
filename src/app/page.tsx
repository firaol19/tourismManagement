//import Image from "next/image";

import Activity from "@/components/Activity";
import Destination from "@/components/TopDestination";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Review from "@/components/Review";
import Subscribe from "@/components/Subscribe";
import Transportation from "@/components/Transportation";

//import Test from "@/components/Test";

//import LogoutButton from "@/components/Logout_button";
export default function Home() {
  return (
    <div className="font-serif">
      {/*   hero section  */}
      <div>
        <Hero/>
        <Destination/>
        <Transportation/>
        <Review/>
        <Activity/>
        <Subscribe/>
        <Footer/>
      </div>
      
    </div>
  )
    
    
    
}
