"use client";

import { useEffect, useState } from "react";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

interface Payment {
  name: string;
  totalPrice: number;
}

interface PaymentsData {
  destinationPayments: Payment[];
  accommodationPayments: Payment[];
  transportationPayments: Payment[];
  tourGuidePayments: Payment[];
}

export default function Payments() {
  const [payments, setPayments] = useState<PaymentsData | null>(null);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(true)
   
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/getPayments");
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data: PaymentsData = await response.json();
        setPayments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen transition-all ">
        <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
            <Bar/>
        </div>
        <div className={`h-screen transition-all relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
            <div className="w-full px-6 py-3 flex items-center justify-between">
                                <div className="flex gap-3 items-center justify-center">
                                    <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
                                    <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
                                </div>
                                <div className="bg-main w-[50px] h-[50px] rounded-full">
                                </div>
                            </div>
    <div className="p-6 bg-white shadow-lg rounded-lg font-serif">
      <h1 className="text-xl font-semibold mb-4 text-primary2">Payment Details</h1>
      <div className="grid grid-cols-2 gap-6">
        {[
          { title: "Destination Payments", data: payments?.destinationPayments },
          { title: "Accommodation Payments", data: payments?.accommodationPayments },
          { title: "Transportation Payments", data: payments?.transportationPayments },
          { title: "Tour Guide Payments", data: payments?.tourGuidePayments },
        ].map(({ title, data }) => (
          <div key={title} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-primary">{title}</h2>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-2 text-main">Provider</th>
                  <th className="text-left p-2 text-main">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">${item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center p-2 text-gray-500">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}
