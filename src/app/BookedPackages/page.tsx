"use client";

import { useEffect, useState } from "react";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

interface BookedPackage {
  id: number;
  destination: string;
  date: string;
  time: string;
  totalPrice: number;
  numberPerson: number;
  user: string;
  coupon: string;
}

export default function Booking() {
  const [bookedPackages, setBookedPackages] = useState<BookedPackage[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(true)
   
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }

  useEffect(() => {
    const fetchBookedPackages = async () => {
      try {
        const response = await fetch("/api/getBooked-packages");
        if (!response.ok) {
          throw new Error("Failed to fetch booked packages");
        }
        const data: BookedPackage[] = await response.json();

        // Format the time
        const formattedData = data.map((item) => ({
          ...item,
          time: new Date(item.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }), // Converts time to "3:30" format
        }));

        setBookedPackages(formattedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedPackages();
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
      <h1 className="text-primary text-xl">Booked Packages</h1>
      <table className="mt-3 w-full min-w-[870px] mb-5">
        <thead>
          <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
            <th className="text-start font-normal text-text font-serif py-4 pl-4">User</th>
            <th className="text-start font-normal text-text font-serif">Coupon</th>
            <th className="text-start font-normal text-text font-serif">Package</th>
            <th className="text-start font-normal text-text font-serif">Date</th>
            <th className="text-start font-normal text-text font-serif">Time</th>
            <th className="text-start font-normal text-text font-serif">Total Price</th>
            <th className="text-start font-normal text-text font-serif">Persons</th>
          </tr>
        </thead>
        <tbody>
  {bookedPackages.length > 0 ? (
    bookedPackages.map((item) => (
      <tr className="border-b-accent border" key={item.id}>
        <td className="py-3 pl-4">{item.user}</td>
        <td>{item.coupon}</td>
        <td>{item.destination}</td>
        <td>{item.date}</td>
        <td>{item.time}</td>
        <td>{item.totalPrice.toFixed(2)}</td>
        <td>{item.numberPerson}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center py-3 text-gray-500">
        No booked packages found
      </td>
    </tr>
  )}
</tbody>

      </table>
      
    </div>
    </div>
    </div>
  );
}
