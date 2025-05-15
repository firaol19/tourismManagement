"use client";

import Cookies from "js-cookie";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

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


  useEffect(() => {

    const newRandomString = generateRandomString();

    const addBookings = async () => {
      // Check sessionStorage to see if the booking is already completed
      if (sessionStorage.getItem("isBookingCompleted") === "true") {
        return; // Skip if the booking has already been completed
      }

      try {
        const session = await getSession();
                if (!session || !session.user?.email) {
                  console.error("❌ User session not found.");
                  return;
                }
        
                const email = session.user.email;
        // Read and validate cookie values
        const userId = Cookies.get("userId");
        const packageId = Cookies.get("packageId");
        const totalPrice = Cookies.get("totalPrice");
        const numberPerson = Cookies.get("numberPerson");
        const date = Cookies.get("date");
        const time = Cookies.get("time");

        // Check if required values exist
        if (!userId || !packageId || !totalPrice || !numberPerson || !date || !time) {
          console.error("❌ Missing required booking data in cookies.");
          return;
        }

        // Ensure date and time are strings
        if (typeof date !== "string" || typeof time !== "string") {
          console.error("❌ Date and time must be valid strings.");
          return;
        }

        // Construct booking object with safe type conversions
        const bookingData = {
          userId: parseInt(userId),
          packageId: packageId ? parseInt(packageId) : null,
          totalPrice: parseFloat(totalPrice),
          numberPerson: parseInt(numberPerson),
          date: date,  // Ensure date is a valid string
          time: time,  // Ensure time is a valid string
          coupon: newRandomString
        };

        console.log("📝 Booking Data: ", bookingData);  // Log booking data

        // Send to API
        const response = await fetch("/api/booked-package", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([bookingData]), // Send as an array
        });

        const responseData = await response.json();  // Log the response data

        if (!response.ok) {
          console.error("❌ API Error:", responseData);
          throw new Error("Failed to add booking.");
        }

        // Mark the booking as completed in sessionStorage
        sessionStorage.setItem("isBookingCompleted", "true");

        console.log("✅ Booking added successfully!");

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
      }
    };

    addBookings();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-3xl text-primary dark:text-primary2 font-serif">Payment Approved</h1>
      <h2 className="text-lg text-primary dark:text-primary font-roboto">Confirmation will be send to your Email</h2>
      <h2 className="text-2xl text-primary dark:text-primary2 font-roboto">Enjoy Your Trip!</h2>
    </div>
  );
}
