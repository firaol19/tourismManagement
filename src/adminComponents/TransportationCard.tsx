"use client";

import React, { useEffect, useState } from "react";

interface Transportation {
  id: number;
  provider: string;
  type: string;
  description: string;
  image: string;
  price: string;
  noperson: string;
  providerId: string;
  refundDate: string;
  totalcar: string;
}

const TransportationCard = ({ providerId }: { providerId: string }) => {
  const [transportation, setTransportation] = useState<Transportation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/TransportationByProvider", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ providerId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch transportation data");
        }

        const data = await response.json();
        setTransportation(data.transportation);
      } catch (error) {
        console.error("Error fetching transportation data:", error);
      }
    };

    if (providerId) {
      fetchData();
    }
  }, [providerId]);

 const handleDelete = async (id: number) => {
  const confirmDelete = confirm("Are you sure you want to delete this transportation?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/deletetransportation`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });


    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete transportation");
    }

    setTransportation((prev) => prev.filter((item) => item.id !== id));

    // Handle successful deletion (e.g., update UI)
    console.log(data.message);
  } catch (error) {
    console.error("Error deleting transportation:", error);
  }
};


  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-[95%] font-sans mt-5 p-10 overflow-x-auto">
      <h1 className="text-primary text-xl">Registered Transportation Services</h1>
      <table className="mt-3 w-full min-w-[1000px] mb-5">
        <thead>
          <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
            <th className="text-start font-normal text-text font-serif py-4 pl-4">Provider Name</th>
            <th className="text-start font-normal text-text font-serif">Type</th>
            <th className="text-start font-normal text-text font-serif">Price</th>
            <th className="text-start font-normal text-text font-serif">Description</th>
            <th className="text-start font-normal text-text font-serif">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transportation.map((item) => (
            <tr className="border-b-accent border" key={item.id}>
              <td className="py-3 pl-4">{item.provider}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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

export default TransportationCard;
