"use client";

import React, { useCallback, useEffect, useState } from "react";

interface Accommodation {
  id: number;
  provider: string;
  type: string;
  description: string;
  image: string;
  price: number;
  city: string;
}

const AccommodationCard = ({ providerId }: { providerId: string }) => {
  const [accommodation, setAccommodation] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
  try {
    const response = await fetch("/api/accommodationByProvider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch accommodation data");
    }

    const data = await response.json();
    setAccommodation(data.accommodations);
  } catch (error) {
    console.error("Error fetching accommodation data:", error);
  } finally {
    setLoading(false);
  }
}, [providerId]);

useEffect(() => {
  if (providerId) {
    fetchData();
  }
}, [fetchData, providerId]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this accommodation?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/deleteAccommodation`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete accommodation");

      // Remove deleted item from UI
      setAccommodation((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-[95%] font-sans mt-5 p-10 overflow-x-auto">
      <h1 className="text-primary text-xl mb-3">Registered Accommodation Services</h1>

      {loading ? (
        <p className="text-gray-500">Loading accommodations...</p>
      ) : (
        <table className="w-full min-w-[800px] mb-5">
          <thead>
            <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
              <th className="text-start font-normal text-text font-serif py-4 pl-4">Provider Name</th>
              <th className="text-start font-normal text-text font-serif">Type</th>
              <th className="text-start font-normal text-text font-serif">Price</th>
              <th className="text-start font-normal text-text font-serif">City</th>
              <th className="text-start font-normal text-text font-serif">Description</th>
              <th className="text-start font-normal text-text font-serif">Action</th>
            </tr>
          </thead>
          <tbody>
            {accommodation.map((item) => (
              <tr className="border-b-accent border" key={item.id}>
                <td className="py-3 pl-4">{item.provider}</td>
                <td>{item.type}</td>
                <td>{item.price}</td>
                <td>{item.city}</td>
                <td>{item.description}</td>
                <td>
                  <button
                    className="text-red-600 mr-5"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccommodationCard;
