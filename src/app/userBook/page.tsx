"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface Booking {
  id: number;
  destination?: { name: string; image: string };
  accommodation?: { provider: string; image: string };
  transportation?: { provider: string; image: string };
  tourGuide?: { name: string; language: string; image: string };
  date: string;
  time: string;
  totalPrice: number;
  numberPerson: number;
}

interface CancelBook {
  canceledserviceId?: number;
  canceledpackageid?: number;
}

export default function Bookings() {
  const [bookedServices, setBookedServices] = useState<Booking[]>([]);
  const [bookedPackages, setBookedPackages] = useState<Booking[]>([]);
  const [canceledServices, setCanceledServices] = useState<Set<number>>(new Set()); // Canceled Services Set
  const [canceledPackages, setCanceledPackages] = useState<Set<number>>(new Set()); // Canceled Packages Set
  const [loading, setLoading] = useState(true);


  const { data, status } = useSession();
  const session: Session | null = status === "authenticated" ? data : null;
  useEffect(() => {
    if (status !== 'loading' && !session) {
      redirect('/auth/login');
    }
  }, [session, status]);

  
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        if (res.ok) {
          setBookedServices(data.bookedServices);
          setBookedPackages(data.bookedPackages);

          // Initialize canceledBookings as Sets for services and packages
          const canceledServiceIds = data.canceledBookings
            .map((c: CancelBook) => c.canceledserviceId)
            .filter((id : number): id is number => id !== undefined);

          const canceledPackageIds = data.canceledBookings
            .map((c: CancelBook) => c.canceledpackageid)
            .filter((id : number): id is number => id !== undefined && id !== null);

          setCanceledServices(new Set(canceledServiceIds)); // Set for canceled services
          setCanceledPackages(new Set(canceledPackageIds)); // Set for canceled packages
        }
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Handle cancel for service
  const handleCancelService = async (serviceId: number) => {
    if (!confirm("Are you sure you want to cancel this service?")) return;
  
    try {
      const res = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: serviceId,
          type: "service",
          amount: 20,
          customerId: 123,
          reference: "djhfkf",
          ref: "cLjgEdnnr" // use the real reference here
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setCanceledServices((prev) => new Set(prev.add(serviceId)));
        alert("Service has been canceled and refunded via Chapa.");
      } else {
        alert("Refund failed: " + JSON.stringify(data.details));
      }
    } catch (error) {
      alert("Error canceling service: " + error);
    }
  };
  

  // Handle cancel for package
  const handleCancelPackage = async (packageId: number) => {
    if (!confirm("Are you sure you want to cancel this package?")) return;

    try {
      const res = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: packageId, type: "package" }),
      });

      if (res.ok) {
        setCanceledPackages((prev) => new Set(prev.add(packageId))); // Add the package id to the canceled packages set
        alert("Package has been canceled.");
      } else {
        const data = await res.json();
        alert("Failed to cancel: " + data.error);
      }
    } catch (error) {
      alert("Error canceling package." + error);
    }
  };

  

  if (loading) return <p>Loading...</p>;

  return (
    
    <div className="container mx-auto p-4 font-serif">
      <h2 className="text-2xl font-bold mb-10 text-primary2">Booked Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookedServices.map((service) => (
          <div key={service.id} className="border p-4 rounded-lg shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-text dark:text-main pl-5">{service.destination?.name || "No Destination"}</h3>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Image
              src={service.destination?.image || ""}
              width={100}
              height={100}
              alt="Destination"
              className="w-full sm:w-[50%]  object-cover rounded-lg mt-2"
            />
            <div>
            <p className="text-text dark:text-primary2 font-bold text-lg">Price: <span className="text-main dark:text-text2 text-sm font-normal">${service.totalPrice}</span></p>
            <p className="text-text dark:text-primary2 font-bold text-lg">Accommodation: <span className="text-main dark:text-text2 text-sm font-normal">{service.accommodation?.provider || "Not Included"}</span></p>
            <p className="text-text dark:text-primary2 font-bold text-lg">Transportation: <span className="text-main dark:text-text2 text-sm font-normal">{service.transportation?.provider || "Not Included"}</span></p>
            <p className="text-text dark:text-primary2 font-bold text-lg">Tour Guide: <span className="text-main dark:text-text2 text-sm font-normal">{service.tourGuide?.name || "Not Included"} ({service.tourGuide?.language || ""})</span></p>
            <p className="text-text dark:text-primary2 font-bold text-lg">Date: <span className="text-main dark:text-text2 text-sm font-normal">{service.date ? new Date(service.date).toLocaleDateString("en-GB") : "N/A"}</span></p>
            <p className="text-text dark:text-primary2 font-bold text-lg">Time: <span className="text-main dark:text-text2 text-sm font-normal">{service.time ? new Date(service.time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : "N/A"}</span></p>
            <p className="text-text dark:text-primary2 font-bold text-lg">Number of People: <span className="text-main dark:text-text2 text-sm font-normal">{service.numberPerson}</span></p>
            {canceledServices.has(service.id) ? (
              <button disabled className="btn-disabled text-primary2 mt-7">Cancel Under Review</button>
            ) : (
              <button
                onClick={() => handleCancelService(service.id)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              >
                Cancel
              </button>
            )}
            </div>
            </div>
            
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6 text-primary2 mb-10">Booked Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookedPackages.map((pkg) => (
          <div key={pkg.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-text pl-5">{pkg.destination?.name || "No Package"}</h3>
            <div className="flex gap-3 items-center justify-center">
            <Image
              width={100}
              height={100}
              src={pkg.destination?.image || ""}
              alt="Package"
              className="w-[50%] rounded-lg object-cover mt-2"
            />
            <div>
            <p className="text-text font-bold text-lg">Price: <span className="text-main text-sm font-normal">${pkg.totalPrice}</span></p>
            <p className="text-text font-bold text-lg">Date: <span className="text-main text-sm font-normal">{pkg.date ? new Date(pkg.date).toLocaleDateString("en-CA") : "N/A"}</span></p>
            <p className="text-text font-bold text-lg">Time: <span className="text-main text-sm font-normal">{pkg.time ? new Date(`1970-01-01T${pkg.time}Z`).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "N/A"}</span></p>
            <p className="text-text font-bold text-lg">Number of People: <span className="text-main text-sm font-normal">{pkg.numberPerson}</span></p>
            {canceledPackages.has(pkg.id) ? (
              <button disabled className="btn-disabled text-primary2 mt-7">Cancel Under Review</button>
            ) : (
              <button
                onClick={() => handleCancelPackage(pkg.id)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              >
                Cancel
              </button>
            )}
            </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}
