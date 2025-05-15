"use client";

import React, { useEffect, useState } from "react";

type BookedService = {
  id: number;
  date: string;
  time: string;
  transportationId:string;
  totalPrice: number;
  numberPerson: number;
  coupon?: string;
  user: {
    name: string;
    email: string;
  };
  destination?: {
    name: string;
  };
  accommodation?: {
    name: string;
    type: string;
    price: string;
    id: number;
  };
  transportation?: {
    name: string;
    id : number;
    type: string;
    price: string;
  };
};

const AccommodationBooking = ({ providerId }: { providerId: string }) => {
  const [bookings, setBookings] = useState<BookedService[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    const fetchBookings = async () => {
        setLoading(true)
      try {
        const res = await fetch(`/api/booked-transport?providerId=${providerId}`);
        const data = await res.json();

        if (res.ok) {
          setBookings(data);
          setLoading(false)
        } else {
          setError(data.error || "Something went wrong");
        }
      } catch (err) {
        
        setError("Failed to fetch bookings: " + err);
      }
    };

    fetchBookings();
  }, [providerId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p className="text-green-500">Loading...</p>;
  if (bookings.length === 0) return <p className="font-serif ml-5 mt-[100px]">No bookings found for this for this Provider</p>;

  const isBookingDone = (bookingDate: string) => {
    const today = new Date();
    const bookingDateObj = new Date(bookingDate);

    // If the booking date is before today, it is done. If it is today or in the future, it is undone.
    // We treat today's bookings as undone
    return bookingDateObj < today;
  };

  return (
    <div className="space-y-6 mb-5">
      {bookings.map((booking) => (
        <div key={booking.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl font-sans">
          <div className="md:flex">
            <div className="p-6">
              <div className="text-xl font-bold text-black">{booking.user.name}</div>
              <p className="text-xl font-medium text-primary dark:text-primary2">Email: <span className="text-xl text-main font-normal dark:text-main2 font-sans"> {booking.user.email}</span></p>
              <p className="text-xl font-medium text-primary dark:text-primary2">Date: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{new Date(booking.date).toLocaleDateString("en-US")}</span></p>
              <p className="text-xl font-medium text-primary dark:text-primary2">Number of People: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{booking.numberPerson}</span></p>
              <p className="text-xl font-medium text-primary dark:text-primary2">Transportation Type: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{booking.transportation?.type}</span></p>
              <p className="text-xl font-medium text-primary dark:text-primary2">Transportation Id: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{booking.transportation?.id}</span></p>
              <p className="text-xl font-medium text-primary dark:text-primary2">Transportation Price: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{booking.transportation?.price}</span></p>
              
              {booking.coupon && (
                <p className="text-xl font-medium text-primary dark:text-primary2">Coupon Applied: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{booking.coupon}</span></p>
              )}
              
              <p
                className={`mt-2 ${
                  isBookingDone(booking.date) ? "text-green-500" : "text-red-500"
                }`}
              >
                {isBookingDone(booking.date) ? "Done" : "Undone"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccommodationBooking;
