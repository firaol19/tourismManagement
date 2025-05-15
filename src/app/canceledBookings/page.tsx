"use client"

import { useEffect, useState } from "react";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

// Define the types
interface BookedService {
  id: number;
  destination: { name: string; image: string };
  accommodation?: { provider: string; image: string };
  transportation?: { provider: string; image: string };
  tourGuide?: { name: string; language: string; image: string };
  date: string;
  time: string;
  totalPrice: number;
  numberPerson: number;
}

interface BookedPackage {
  id: number;
  destination: { name: string; image: string };
  date: string;
  time: string;
  totalPrice: number;
  numberPerson: number;
}

interface CancelBook {
  id: number;
  canceledserviceId?: number;
  canceledpackageid?: number;
  BookedService?: BookedService;
  BookedPackage?: BookedPackage;
}

export default function Bookings() {
  const [canceledServices, setCanceledServices] = useState<CancelBook[]>([]);
  const [canceledPackages, setCanceledPackages] = useState<CancelBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCanceledBookings() {
      try {
        const res = await fetch("/api/canceled-bookings");
        const data = await res.json();
        if (res.ok) {
          setCanceledServices(data.canceledServices);
          setCanceledPackages(data.canceledPackages);
        }
      } catch (error) {
        console.error("Failed to fetch canceled bookings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCanceledBookings();
  }, []);

  const handleApproveService = async (serviceId: number) => {
    if (!confirm("Are you sure you want to approve this service cancellation?")) return;
  
    try {
      const res = await fetch(`/api/delete-booking`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: serviceId, type: "service" }), // Send the service id and type
      });
  
      if (res.ok) {
        alert("Service booking has been deleted.");
        setCanceledServices((prev) =>
          prev.filter((service) => service.canceledserviceId !== serviceId)
        );
      } else {
        const data = await res.json();
        alert("Failed to approve service: " + data.error);
      }
    } catch (error) {
      alert("Error approving service: " + error);
    }
  };
  
  const handleApprovePackage = async (packageId: number) => {
    if (!confirm("Are you sure you want to approve this package cancellation?")) return;
  
    try {
      const res = await fetch(`/api/delete-booking`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: packageId, type: "package" }), // Send the package id and type
      });
  
      if (res.ok) {
        alert("Package booking has been deleted.");
        setCanceledPackages((prev) =>
          prev.filter((pkg) => pkg.canceledpackageid !== packageId)
        );
      } else {
        const data = await res.json();
        alert("Failed to approve package: " + data.error);
      }
    } catch (error) {
      alert("Error approving package: " + error);
    }
  };

  const [isOpen, setIsOpen] = useState(true)
   
  const handleClick = () => {
      setIsOpen((prev) => !prev)
  }
  

  if (loading) return <p>Loading...</p>;
  console.log(canceledServices )
  return (
    <div className="flex h-screen transition-all ">
                <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
                    <Bar/>
                </div>
                <div className={`h-screen transition-all pb-5 relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
                    <div className="w-full px-6 py-3 flex items-center justify-between">
         <div className="flex gap-3 items-center justify-center">
            <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
            <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
          </div>
          <div className="bg-main w-[50px] h-[50px] rounded-full">
          </div>
      </div>
    <div className="container mx-auto p-4 font-serif">
      <h2 className="text-2xl font-bold mb-4">Canceled Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {canceledServices.map((service) => (
          <div key={service.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">
              {service.BookedService?.destination?.name || "No Destination"}
            </h3>
            <p>Date: {service.BookedService?.date ? new Date(service.BookedService.date).toLocaleDateString("en-CA") : "N/A"}</p>
            <p>Time: {service.BookedService?.date ? new Date(service.BookedService.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "N/A"}</p>
            <p>Total Price: ${service.BookedService?.totalPrice}</p>
            <p>Number of People: {service.BookedService?.numberPerson}</p>
            <button
              onClick={() => handleApproveService(service.canceledserviceId!)}  // Handle service approval
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6">Canceled Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {canceledPackages.map((pkg) => (
          <div key={pkg.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">
              {pkg.BookedPackage?.destination?.name || "No Package"}
            </h3>
            <p>Date: {pkg.BookedPackage?.date ? new Date(pkg.BookedPackage.date).toLocaleDateString("en-CA") : "N/A"}</p>
            <p>Time: {pkg.BookedPackage?.date ? new Date(pkg.BookedPackage.date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "N/A"}</p>
            <p>Total Price: ${pkg.BookedPackage?.totalPrice}</p>
            <p>Number of People: {pkg.BookedPackage?.numberPerson}</p>
            <button
              onClick={() => handleApprovePackage(pkg.canceledpackageid!)}  // Handle package approval
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}
