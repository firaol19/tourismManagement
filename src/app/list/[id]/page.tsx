"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useSession } from "next-auth/react";

interface Destination {
    id: number;
    name: string;
    region: string;
    city: string;
    farFromAdiss: string;
    image: string;
    category: string;
    interance: number;
  }
  interface Transportation {
    id: number;
    provider: string;
    type: string;
    description: string;
    image: string;
    price: number;
    noperson: number;
  }
  interface Accommodation {
    id  :        number ;   
    provider  :  string;
    type    :    string;
    description: string;
    image      : string;
    price   :    number;
    city     :   string;
  }
  type TourGuide = {
    id: number;
    name: string;
    language: string;
    price: string;
    image: string;
  };

  const List = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
  
    const [destination, setDestination] = useState<Destination[]>([]);
    const [transportation, setTransportation] = useState<Transportation[]>([]);
    const [accommodation, setAccommodation] = useState<Accommodation[]>([]);
    const [tourGuide, setTourGuide] = useState<TourGuide[]>([]);
  
    useEffect(() => {
      if (status !== "loading" && !session) {
        router.push("/auth/login");
      }
    }, [session, status, router]);

    const [isOpen, setIsOpen] = useState(true)
   
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }
  
    useEffect(() => {
      const fetchDestinationData = async () => {
        try {
          const response = await fetch("/api/allDestination");
          if (!response.ok) {
            throw new Error("Failed to fetch accommodation data");
          }
          const data = await response.json();
          setDestination(data.destinations); // Corrected state update
        } catch (error) {
          console.error("Error fetching accommodation data:", error);
        }
      };
      
      const fetchTransportationData = async () => {
        try {
          const response = await fetch("/api/allTransportation");
          if (!response.ok) {
            throw new Error("Failed to fetch transportation data");
          }
          const data = await response.json();
          setTransportation(data.transportation); // Corrected state update
        } catch (error) {
          console.error("Error fetching transportation data:", error);
        }
      };
      const fetchAccommodationData = async () => {
        try {
          const response = await fetch("/api/allAccommodation");
          if (!response.ok) {
            throw new Error("Failed to fetch accommodation data");
          }
          const data = await response.json();
          setAccommodation(data.accommodation); // Corrected state update
        } catch (error) {
          console.error("Error fetching accommodation data:", error);
        }
      };
      const fetchGuideData = async () => {
        try {
          const response = await fetch("/api/allGuide");
          if (!response.ok) {
            throw new Error("Failed to fetch tourGuide data");
          }
          const data = await response.json();
          setTourGuide(data.tourGuide); // Corrected state update
        } catch (error) {
          console.error("Error fetching tourGuide data:", error);
        }
      };
  
      // If ID is required, use it properly
      if (Number(id) === 1) {
        fetchDestinationData();
      }
      if (Number(id) === 2) {
        fetchTransportationData();
      }
      if (Number(id) === 3) {
        fetchAccommodationData();
      }
      if (Number(id) === 4) {
        fetchGuideData();
      }
    }, [id]);
    
        

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
    {Number(id) === 1 && (
            <div className="font-roboto bg-white mt-10 mx-8 px-8 pt-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
            <h1 className="text-primary text-xl">Registered Destination</h1>
            <table className=" mt-3 w-full min-w-[600px] mb-5">
                <thead className="">
                    <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border ">
                        <th className="text-start font-normal text-text font-serif py-4 pl-4  overflow-hidden">Name</th>
                        <th className="text-start font-normal text-text font-serif ">Region</th>
                        <th className="text-start font-normal text-text font-serif">City</th>
                        <th className="text-start font-normal text-text font-serif">Far from Addis</th>
                        <th className="text-start font-normal text-text font-serif">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {destination.map((item) => (
                        <tr className="border-b-accent border " key={item.id}>
                            <td className="py-3 pl-4">{item.name}</td>
                            <td>{item.region}</td>
                            <td>{item.city}</td>
                            <td>{item.farFromAdiss}</td>
                            <td>{item.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        {Number(id) === 2 && (
            <div className="font-roboto bg-white mt-10 mx-8 px-8 pt-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
            <h1 className="text-primary text-xl">Registered Transport Providers</h1>
            <table className=" mt-3 w-full min-w-[600px] mb-5">
                <thead className="">
                    <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border ">
                        <th className="text-start font-normal text-text font-serif py-4 pl-4  overflow-hidden">Provider Name</th>
                        <th className="text-start font-normal text-text font-serif ">Tranportation Type</th>
                        <th className="text-start font-normal text-text font-serif">Tranportation Price</th>
                        <th className="text-start font-normal text-text font-serif">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transportation.map((item) => (
                        <tr className="border-b-accent border " key={item.id}>
                            <td className="py-3 pl-4">{item.provider}</td>
                            <td>{item.type}</td>
                            <td>{item.price}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        {Number(id) === 3 && (
            <div className="font-roboto bg-white mt-10 mx-8 px-8 pt-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
            <h1 className="text-primary text-xl">Registered Accommodation Providers</h1>
            <table className=" mt-3 w-full min-w-[600px] mb-5">
                <thead className="">
                    <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border ">
                        <th className="text-start font-normal text-text font-serif py-4 pl-4  overflow-hidden">Provider Name</th>
                        <th className="text-start font-normal text-text font-serif ">Accommodation Type</th>
                        <th className="text-start font-normal text-text font-serif">Accommodation Price</th>
                        <th className="text-start font-normal text-text font-serif">City</th>
                        <th className="text-start font-normal text-text font-serif">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {accommodation.map((item) => (
                        <tr className="border-b-accent border " key={item.id}>
                            <td className="py-3 pl-4">{item.provider}</td>
                            <td>{item.type}</td>
                            <td>{item.price}</td>
                            <td>{item.city}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        {Number(id) === 4 && (
            <div className="font-roboto bg-white mt-10 mx-8 px-8 pt-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
            <h1 className="text-primary text-xl">Registered Tour Guides</h1>
            <table className=" mt-3 w-full min-w-[600px] mb-5">
                <thead className="">
                    <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border ">
                        <th className="text-start font-normal text-text font-serif py-4 pl-4  overflow-hidden">Name</th>
                        <th className="text-start font-normal text-text font-serif ">Language</th>
                        <th className="text-start font-normal text-text font-serif">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tourGuide.map((item) => (
                        <tr className="border-b-accent border " key={item.id}>
                            <td className="py-3 pl-4">{item.name}</td>
                            <td>{item.language}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )}
        
    </div>
</div>
  
    
)
}
export default List