"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { getSession } from "next-auth/react";

function generateRandomString(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "Tour_App"; // Add Tour_App prefix
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export default function Bookings() {

  const [error, SetError] = useState<string | null>(null);

  
  useEffect(() => {
    const newRandomString = generateRandomString();

    
    const addBookings = async () => {
      if (sessionStorage.getItem("isBookingCompleted") === "true") {
        return;
      }

      try {
        const session = await getSession();
        if (!session || !session.user?.email) {
          console.error("❌ User session not found.");
          return;
        }

        const email = session.user.email;
        const userId = Cookies.get("userId");
        const destinationId = Cookies.get("destinationId");
        const accommodationId = Cookies.get("accommodationId");
        const transportationId = Cookies.get("transportationId");
        const tourGuideId = Cookies.get("tourGuideId");
        const totalPrice = Cookies.get("totalPrice");
        const numberPerson = Cookies.get("numberPerson");
        const reference = Cookies.get("reference");
        // const date = Cookies.get("date");
        const storedDateString = Cookies.get("date");
const date = storedDateString ? new Date(storedDateString + "T00:00:00") : null;

console.log(date)


        const time = Cookies.get("time");

        if (!userId || !destinationId || !totalPrice || !numberPerson || !date || !time || !reference) {
          console.error("❌ Missing required booking data in cookies.");
          return;
        }

        const bookingData = {
          userId: parseInt(userId),
          destinationId: destinationId ? parseInt(destinationId) : null,
          accommodationId: accommodationId ? parseInt(accommodationId) : null,
          transportationId: transportationId ? parseInt(transportationId) : null,
          tourGuideId: tourGuideId ? parseInt(tourGuideId) : null,
          totalPrice: parseFloat(totalPrice),
          numberPerson: parseInt(numberPerson),
          date,
          time,
          coupon: newRandomString,
          reference
        };

        console.log("📝 Booking Data: ", bookingData);

        const response = await fetch("/api/booked-service", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([bookingData]),
        });

        const responseData = await response.json();
        if (!response.ok) {
          console.error("❌ API Error:", responseData);
          SetError("Service is not booked please contact customer service")
          throw new Error("Failed to add booking.");
        }

        sessionStorage.setItem("isBookingCompleted", "true");
    //    console.log("✅ Booking added successfully!");

        // Send confirmation email
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            totalPrice,
            coupon: newRandomString,
          }),
        });

        console.log("📧 Confirmation email sent!");

      } catch (error) {
        console.error("❌ Error adding booking:", error);
        SetError("Service is not booked please contact customer service")
      }
    };

    addBookings();
  }, []);

  return (
    <div>
      {error === null && (
        <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <h1 className="text-3xl text-primary dark:text-primary2 font-serif">Payment Approved</h1>
        <h2 className="text-lg text-primary dark:text-primary font-roboto">Confirmation will be send to your Email</h2>
        <h2 className="text-2xl text-primary dark:text-primary2 font-roboto">Enjoy Your Trip!</h2>
      </div>
      )}
      {error && (
        <div className="flex flex-col gap-5 justify-center items-center h-screen">
        
        <h2 className="text-lg text-primary dark:text-primary font-roboto">{error}</h2>
       
      </div>
      )}
      
    </div>
  );
}
