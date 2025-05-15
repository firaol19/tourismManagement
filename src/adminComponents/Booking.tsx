"use client"

import { useEffect, useState } from "react";

import Link from "next/link";

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
  interface User {
    id: number;
    email: string;
    name: string;
    phone?: string;
    role: string;
    password?: string;
    image?: string;
  }
interface BookedService {
    id: number;
    destination: Destination; // Destination details
    accommodation: Accommodation; // Accommodation details
    transportation: Transportation; // Transportation details
    tourGuide: TourGuide; // Tour guide details
    date: string;
    time: string;
    totalPrice: number;
    numberPerson: number;
    user: User; // User who made the booking
  }// Adjust the import path as needed

  export default function Booking() {
    const [bookedServices, setBookedServices] = useState<BookedService[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBookedServices = async () => {
        try {
          const response = await fetch("/api/getBooked-services");
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
      <div className="font-roboto bg-white mt-10 mx-8 px-8 pt-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
        <h1 className="text-primary text-xl">Booked Services</h1>
        <table className="mt-3 w-full min-w-[870px]">
          <thead>
            <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
              <th className="text-start font-normal text-text font-serif py-4 pl-4 w-[180px] overflow-hidden">User</th>
              <th className="text-start font-normal text-text font-serif w-[120px]">Destination</th>
              <th className="text-start font-normal text-text font-serif w-[120px]">Date</th>
              <th className="text-start font-normal text-text font-serif">Transportation</th>
              <th className="text-start font-normal text-text font-serif">Accommodation</th>
              <th className="text-start font-normal text-text font-serif">Tour Guide</th>
            </tr>
          </thead>
          <tbody>
  {bookedServices.map((item) => (
    <tr className="border-b-accent border" key={item.id}>
      <td className="py-3 pl-4">{item.user?.name || "N/A"}</td>
      <td>{item.destination?.name || "N/A"}</td>
      <td>{item.date || "N/A"}</td>
      <td>{item.transportation?.type || "N/A"}</td>
      <td>{item.accommodation?.type || "N/A"}</td>
      <td>{item.tourGuide?.name || "N/A"}</td>
    </tr>
  ))}
</tbody>

        </table>
        <div className="flex justify-center items-center w-full py-3">
          <Link href="/bookedService" className="text-xl font-serif text-primary">View All</Link>
        </div>
      </div>
    );
  }
  