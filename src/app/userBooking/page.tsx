"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface BookingService {
  id: number;
  destination?: { name: string; image: string };
  accommodationId?: number | null;
  accommodation?: { provider: string; image: string; refundDate: string };
  transportationId?: number | null;
  transportation?: { provider: string; image: string; refundDate: string };
  tourGuideId?: number | null;
  tourGuide?: { name: string; image: string; refundDate: string; language : string };
  date: string;
  time: string;
  totalPrice: number;
  numberPerson: number;
  status: string;
  userId:string;
}

interface BookingPackage {
  id: number;
  destination?: { name: string; image: string };
  date: string;
  time: string;
  totalPrice: number;
  numberPerson: number;
  packageId: number;
  userId:string;
}

interface CancelChoices {
  accommodation: boolean;
  transportation: boolean;
  tourGuide: boolean;
  all: boolean;
}

function CancelModal({
  isOpen,
  onClose,
  onConfirm,
  accomo,
  transport,
  guide,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (choices: CancelChoices) => void;
  accomo: number;
  transport : number;
  guide :number;
}) {
  const [choices, setChoices] = useState<CancelChoices>({
    accommodation: false,
    transportation: false,
    tourGuide: false,
    all: false,
  });

  useEffect(() => {
    if (choices.all) {
      setChoices({ accommodation: true, transportation: true, tourGuide: true, all: true });
    }
  }, [choices.all]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-serif">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">Cancel Which Service?</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={choices.all}
              onChange={() => setChoices(c => ({ ...c, all: !c.all }))}
              className="mr-2"
            />
            All
          </label>
          {accomo !== 0 && (
            <label className="flex items-center">
            <input
              type="checkbox"
              checked={choices.accommodation}
              disabled={choices.all}
              onChange={() => setChoices(c => ({ ...c, accommodation: !c.accommodation }))}
              className="mr-2"
            />
            Accommodation
          </label>
          )}
          {transport !== 0 && (
            <label className="flex items-center">
            <input
              type="checkbox"
              checked={choices.transportation}
              disabled={choices.all}
              onChange={() => setChoices(c => ({ ...c, transportation: !c.transportation }))}
              className="mr-2"
            />
            Transportation
          </label>
          )}
          {guide !== 0 &&(
            <label className="flex items-center">
            <input
              type="checkbox"
              checked={choices.tourGuide}
              disabled={choices.all}
              onChange={() => setChoices(c => ({ ...c, tourGuide: !c.tourGuide }))}
              className="mr-2"
            />
            Tour Guide
          </label>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Back
          </button>
          <button
            onClick={() => onConfirm(choices)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Bookings() {
  const { data: session, status } = useSession();
  const [services, setServices] = useState<BookingService[]>([]);
  const [packages, setPackages] = useState<BookingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [accomo, setAccomo] = useState<number | null | undefined>(null)
  const [transport, setTransport] = useState<number | null| undefined>(null)
  const [guide, setGuide] = useState<number | null| undefined>(null)

  useEffect(() => {
    if (status !== "loading" && !session) redirect("/auth/login");
  }, [session, status]);

  useEffect(() => {
    if (!session?.user?.id) return;
    async function load() {
      try {
        const res = await fetch("/api/bookings");
        const json = await res.json();
  
        const userId = session?.user.id; 

      
  
        const filteredServices = (json.bookedServices as BookingService[]).filter(
          (service) => Number(service.userId) === Number(userId)
        );
  
        const filteredPackages = (json.bookedPackages as BookingPackage[]).filter(
          (pkg) => Number(pkg.userId) === Number(userId)
        );
  
        setServices(filteredServices);
        setPackages(filteredPackages);
        console.log(filteredPackages)
        
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  
    load();
  }, [session]);

 
  
  

  const handleConfirm = async (choices: CancelChoices) => {
    if (cancellingId === null) return;
    const id = cancellingId;
    setCancellingId(null);
    try {
      const res = await fetch("/api/cancel-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, choices }),
      });
      const { booking, error } = await res.json();
      if (error) {
        alert(error);
      } else {
        setServices(sv => sv.map(s => (s.id === id ? booking : s)));
        alert("Cancellation successful Refund will takes 3 - 5 working Days");
      }
    } catch (e) {
      alert("Error cancelling: " + e);
    }
  };

  const handleCancel = async (packageId: number) => {
    try {
      const res = await fetch('/api/cancel-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId }),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        alert(result.error || 'Something went wrong.');
        return;
      }
  
      alert('Package cancelled successfully! Refund will take 3 - 5 working Days');
      // Optionally refresh bookings list or navigate away
    } catch (error) {
      console.error('Cancel error:', error);
      alert('Failed to cancel the package.');
    }
  };
  

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto p-4 font-serif">
      <h1 className="text-2xl font-bold mb-6">Booked Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(s => (
          <div key={s.id}>
            {s.status !== "allRefund" &&(
                <div  className="border p-4 rounded flex flex-col">
                <h2 className="font-semibold text-lg">{s.destination?.name || "Service"}</h2>
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                            <Image
                              src={s.destination?.image || ""}
                              width={100}
                              height={100}
                              alt="Destination"
                              className="w-full sm:w-[50%]  object-cover rounded-lg mt-2"
                            />
                            <div>
                            <p className="text-text dark:text-primary2 font-bold text-lg">Price: <span className="text-main dark:text-text2 text-sm font-normal">${s.totalPrice}</span></p>
                            <p className="text-text dark:text-primary2 font-bold text-lg">Accommodation: <span className="text-main dark:text-text2 text-sm font-normal">{s.accommodation?.provider || "Not Included"}</span></p>
                            <p className="text-text dark:text-primary2 font-bold text-lg">Transportation: <span className="text-main dark:text-text2 text-sm font-normal">{s.transportation?.provider || "Not Included"}</span></p>
                            <p className="text-text dark:text-primary2 font-bold text-lg">Tour Guide: <span className="text-main dark:text-text2 text-sm font-normal">{s.tourGuide?.name || "Not Included"} {s.tourGuide?.language || ""}</span></p>
                            <p className="text-text dark:text-primary2 font-bold text-lg">Date: <span className="text-main dark:text-text2 text-sm font-normal">{s.date ? new Date(s.date).toLocaleDateString("en-GB") : "N/A"}</span></p>
                            <p className="text-text dark:text-primary2 font-bold text-lg">Number of People: <span className="text-main dark:text-text2 text-sm font-normal">{s.numberPerson}</span></p>
                            <button
                  onClick={() => {
                    setCancellingId(s.id)
                    setAccomo(s.accommodationId)
                    setTransport(s.transportationId)
                    setGuide(s.tourGuideId)
                  }}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  Cancel
                </button>
                         
                            </div>
                            </div>
                
              </div>
            )}
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mt-8 mb-4">Booked Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map(p => (
          <div key={p.id}>
            {p.packageId !== null && (
                <div  className="border p-4 rounded">
                <h2 className="font-semibold text-lg">{p.destination?.name || "Package"}</h2>
                <div className="flex gap-3 items-center justify-center">
                            <Image
                              width={100}
                              height={100}
                              src={p.destination?.image || ""}
                              alt="Package"
                              className="w-[50%] rounded-lg object-cover mt-2"
                            />
                            <div>
                            <p className="text-text font-bold text-lg">Price: <span className="text-main text-sm font-normal">${p.totalPrice}</span></p>
                            <p className="text-text font-bold text-lg">Date: <span className="text-main text-sm font-normal">{p.date ? new Date(p.date).toLocaleDateString("en-CA") : "N/A"}</span></p>
                            
                            <p className="text-text font-bold text-lg">Number of People: <span className="text-main text-sm font-normal">{p.numberPerson}</span></p>
                            <button
                onClick={() => handleCancel(p.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Cancel
                            </button>
                            </div>
                            </div>
               
    
              </div>
            )}
          </div>
        ))}
      </div>

      <CancelModal
        isOpen={cancellingId !== null}
        onClose={() => setCancellingId(null)}
        accomo={accomo === null || accomo === undefined ? 0 : accomo }
        transport={transport === null || transport === undefined ? 0 : transport}
        guide={guide === null || guide === undefined ? 0 : guide}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

