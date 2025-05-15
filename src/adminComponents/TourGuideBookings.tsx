"use client";

import React, { useEffect, useState } from "react";

type BookedService = {
  id: number;
  date: string;
  time: string;
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
  };
  transportation?: {
    name: string;
  };
};

const TourGuideBookings = ({ providerId }: { providerId: string }) => {
  const [bookings, setBookings] = useState<BookedService[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`/api/booked-guide?providerId=${providerId}`);
        const data = await res.json();

        if (res.ok) {
          setBookings(data);
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
  if (bookings.length === 0) return <p className="font-serif ml-5 mt-[100px]">No bookings found for this tour guide.</p>;

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
              <p className="mt-2 text-gray-500">Email: {booking.user.email}</p>
              <p className="mt-2 text-gray-500">Date: {new Date(booking.date).toLocaleDateString("en-US")}</p>
              <p className="mt-2 text-gray-700">Number of People: {booking.numberPerson}</p>
              {booking.coupon && (
                <p className="mt-2 text-gray-500">Coupon Applied: {booking.coupon}</p>
              )}
              <div className="mt-4">
                {booking.destination && (
                  <p className="text-sm text-gray-600">Destination: {booking.destination.name}</p>
                )}
                
              </div>
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

export default TourGuideBookings;
