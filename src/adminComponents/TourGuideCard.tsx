"use client";

import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import React, { useCallback, useEffect, useState } from "react";

import Image from "next/image";

type TourGuide = {
  id: number;
  name: string;
  language: string;
  price: string;
  image: string;
  providerId: string;
  refundDate: string;
};

const TourGuideCard = ({ providerId }: { providerId: string }) => {
  const [tourGuide, setTourGuide] = useState<TourGuide | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ language: "", price: "", refundDate: "", image: "" });

  const fetchTourGuide = useCallback(async () => {
    try {
      const res = await fetch(`/api/tourguide?providerId=${providerId}`);
      const data = await res.json();
      if (res.ok) {
        setTourGuide(data);
        setFormData({
          language: data.language,
          price: data.price,
          refundDate: data.refundDate,
          image: data.image,
        });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Failed to fetch tour guide" + err);
    }
  }, [providerId]);
  
  useEffect(() => {
    fetchTourGuide();
  }, [fetchTourGuide]);
  

  const handleUpdate = async () => {
    const res = await fetch("/api/tourguide", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ providerId, ...formData }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Updated successfully");
      setEditing(false);
      fetchTourGuide(); // Refresh info
    } else {
      alert(data.error || "Update failed");
    }
  };

  if (!tourGuide) return <p>Loading tour guide info...</p>;

  return (
    <div className="w-fit mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl font-sans mt-5 p-10">
      <div className="md:flex">
        <div className="md:shrink-0 flex flex-col justify-center items-center">
          <Image
            className="h-48 w-full object-cover md:w-48 rounded-lg"
            src={formData.image}
            alt={tourGuide.name}
            width={100}
            height={100}
          />
          <CldUploadWidget
  uploadPreset="social"
  onSuccess={(result: CloudinaryUploadWidgetResults, {widget}) => {
    if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
      setFormData(prev => ({
        ...prev,
        image: (result.info as { secure_url: string }).secure_url,
      }));
    }
    widget.close();
    
  }}
>
  {({ open }) => (
    <button
      onClick={() => open()}
      className="mt-2 px-3 py-1 bg-text text-white rounded"
    >
      Upload New Image
    </button>
  )}
</CldUploadWidget>

        </div>
        <div className="pl-6 w-full">
          <div className="uppercase tracking-wide text-sm text-text font-semibold">
            Tour Guide
          </div>
          <p className="mt-1 text-lg font-medium text-black">{tourGuide.name}</p>

          {editing ? (
            <div className="space-y-2 mt-2">
              <input
                type="text"
                value={formData.language}
                onChange={e => setFormData({ ...formData, language: e.target.value })}
                placeholder="Language"
                className="border px-2 py-1 w-full"
              />
              <input
                type="text"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="Price"
                className="border px-2 py-1 w-full"
              />
              <input
                type="text"
                value={formData.refundDate}
                onChange={e => setFormData({ ...formData, refundDate: e.target.value })}
                placeholder="Refund Date"
                className="border px-2 py-1 w-full"
              />
              <button onClick={handleUpdate} className="bg-green-600 text-white px-3 py-1 rounded mt-2">
                Save Changes
              </button>
              <button onClick={() => setEditing(false)} className="ml-2 text-red-500 underline">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <p className="mt-2 text-gray-500">Speaks: {tourGuide.language}</p>
              <p className="mt-2 text-gray-700">Price: {tourGuide.price}</p>
              <p className="mt-2 text-gray-700">Refund Time: {tourGuide.refundDate} days</p>
              <button onClick={() => setEditing(true)} className="mt-3 bg-text text-white px-3 py-1 rounded">
                Edit Info
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourGuideCard;
