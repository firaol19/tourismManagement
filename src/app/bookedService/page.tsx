"use client";

import { useEffect, useState } from "react";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

interface Destination {
  name: string;
}

interface Transportation {
  type: string;
}

interface Accommodation {
  type: string;
}

interface TourGuide {
  name: string;
}

interface User {
  name: string;
}

interface BookedService {
  id: number;
  destination: Destination;
  accommodation: Accommodation;
  transportation: Transportation;
  tourGuide: TourGuide;
  date: string;
  coupon: string;
  user: User;
}

export default function Booking() {
  const [bookedServices, setBookedServices] = useState<BookedService[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(true)
   
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }

  useEffect(() => {
    const fetchBookedServices = async () => {
      try {
        const response = await fetch("/api/getAllBooked-service");
        if (!response.ok) {
          throw new Error("Failed to fetch booked services");
        }
        const data: BookedService[] = await response.json();
        setBookedServices(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
     <div className="flex h-screen transition-all ">
            <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
                <Bar/>
            </div>
            <div className={`h-screen transition-all mb-5 relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
                <div className="w-full px-6 py-3 flex items-center justify-between">
                                    <div className="flex gap-3 items-center justify-center">
                                        <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
                                        <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
                                    </div>
                                    <div className="bg-main w-[50px] h-[50px] rounded-full">
                                    </div>
                                </div>
    <div className="font-roboto mb-5 bg-white mt-10 mx-8 px-8 pt-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
      <h1 className="text-primary text-xl">Booked Services</h1>
      <table className="mt-3  min-w-[1000px]  mb-5">
        <thead>
          <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
            <th className="text-start font-normal text-text font-serif py-4 pl-4 w-[180px] overflow-hidden">
              User
            </th>
            <th className="text-start font-normal text-text font-serif">
              Coupon
            </th>
            <th className="text-start font-normal text-text font-serif w-[120px]">
              Destination
            </th>
            <th className="text-start font-normal text-text font-serif w-[120px]">
              Date
            </th>
            <th className="text-start font-normal text-text font-serif">
              Transportation
            </th>
            <th className="text-start font-normal text-text font-serif">
              Accommodation
            </th>
            <th className="text-start font-normal text-text font-serif">
              Tour Guide
            </th>
            
          </tr>
        </thead>
        <tbody>
          {bookedServices.map((item) => (
            <tr className="border-b-accent border" key={item.id}>
              <td className="py-3 pl-4">{item.user.name}</td>
              <td>{item.coupon}</td>
              <td>{item.destination.name}</td>
              <td>{item.date.split("T")[0]}</td>
              <td>{item.transportation.type}</td>
              <td>{item.accommodation.type}</td>
              <td>{item.tourGuide.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </div>
    </div>
  );
}
