"use client";

import React, { useEffect, useState } from "react";

type DestinationType = {
  id: number;
  name: string;
  region: string;
  city: string;
  farFromAdiss: string;
  image: string;
  category: string;
  interance: string;
  description: string;
  providerId: string;
  refundDate: string;
};

const DestinationCard = ({ providerId }: { providerId: string }) => {
  const [destination, setDestination] = useState<DestinationType[]>([]);

 
 const handleDelete = async (id: number) => {
  const confirmDelete = confirm("Are you sure you want to delete this destination?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/deletedestination`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete destination");
    }
    setDestination((prev) => prev.filter((item) => item.id !== id));

    // Successfully deleted, update the state or UI accordingly
    console.log(data.message);
  } catch (error) {
    console.error("Error deleting destination:", error);
  }
};


   useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/destinationByProvider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch destination data");
      }

      const data = await response.json();
      setDestination(data.destination);
    } catch (error) {
      console.error("Error fetching destination data:", error);
    }
  };

  if (providerId) {
    fetchData();
  }
}, [providerId]);


  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-[95%] font-sans mt-5 p-10 overflow-x-auto">
      <h1 className="text-primary text-xl">Registered Destination Services</h1>
      <table className=" mt-3 w-full min-w-[1000px] mb-5 ">
        <thead>
          <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
            <th className="text-start font-normal text-text font-serif py-4 pl-4">Name</th>
            <th className="text-start font-normal text-text font-serif">City</th>
            <th className="text-start font-normal text-text font-serif">Region</th>
            <th className="text-start font-normal text-text font-serif">Entrance Fee</th>
            <th className="text-start font-normal text-text font-serif">Description</th>
            <th className="text-start font-normal text-text font-serif">Action</th>
          </tr>
        </thead>
        <tbody>
          {destination.map((item) => (
            <tr className="border-b-accent border" key={item.id}>
              <td className="py-3 pl-4">{item.name}</td>
              <td>{item.city}</td>
              <td>{item.region}</td>
              <td>{item.interance}</td>
              <td>{item.description}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800 font-semibold mr-5"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DestinationCard;
