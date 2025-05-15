"use client";

import "react-datepicker/dist/react-datepicker.css"; // Import the default styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { redirect, useParams } from "next/navigation";

import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import { Session } from "next-auth";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Packages {
    place   :    string
    title   :    string
    description :string
    duration:    string
    image  :     string
    price    :   string
    include  :   string
}




function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export default function PackageBook() {
    const { data, status } = useSession();
    const session: Session | null = status === "authenticated" ? data : null;
  
    useEffect(() => {
      if (status !== "loading" && !session) {
        redirect("/auth/login");
      }
    }, [session, status]);

    const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 5);
  
    const params = useParams();
    const id = params?.id as string; // Ensure `id` is treated as a string
    const [randomString, setRandomString] = useState<string>("");
    const [packages, setPackage] = useState<Packages | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);
    const [selectedTime] = useState<Date | null>(new Date());
    const [numberPerson, setNumberPerson] = useState("1");
    const [price, setPrice] = useState("1");
  
    const totalPrice = Number(price) * Number(numberPerson);


    const clearCookiesOnPageLoad = () => {
      const cookieNames = [
        "packageId",
        "totalPrice",
        "numberPerson",
        "date",
        "time",
        "userId"
      ];
  
      cookieNames.forEach(cookieName => {
        Cookies.remove(cookieName, { path: "/" });
      });
      sessionStorage.removeItem("isBookingCompleted");
    };
  
    useEffect(() => {
      clearCookiesOnPageLoad(); // Clear cookies when the component mounts
    }, []);
  
    useEffect(() => {
      const newRandomString = generateRandomString();
      setRandomString(newRandomString);
      
    }, []);
  
    useEffect(() => {
      if (!id) return;
  
      const fetchDestination = async () => {
        try {
          const res = await fetch(`/api/package?id=${id}`);
          const data = await res.json();
  
          
          if (res.ok) {
            setPackage(data);
            setPrice(data.price);
          } else {
            setError(data.error || "An error occurred while fetching destination");
          }
        } catch (error) {
          setError("Failed to fetch destination data" + error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDestination();
    }, [id]);
  
    if (!id) {
      return <div>Invalid ID</div>;
    }
    const handleBooking = () => {
      Cookies.set("packageId", String(id), { expires: 7, path: "/" });
    
      // Convert numbers to strings
      Cookies.set("totalPrice", String(totalPrice), { expires: 7, path: "/" });
      Cookies.set("numberPerson", String(numberPerson), { expires: 7, path: "/" });
    
      // Convert Date to ISO string (handles null case)
      Cookies.set("date", selectedDate ? selectedDate.toISOString() : "", { expires: 7, path: "/" });
      Cookies.set("time", selectedTime ? selectedTime.toISOString() : "", { expires: 7, path: "/" });
    
      // Ensure userId is set as a string
      if (session?.user.id) {
        Cookies.set("userId", session.user.id, { expires: 7, path: "/" });
      }
    };
    console.log(error)
  
    return (
      <div className="flex font-serif flex-col transition-all items-center py-5 justify-center my-10 mx-auto w-[95%] rounded-lg md:w-3/4 lg:w-1/2 shadow-lg shadow-main">
        <h1 className="text-2xl lg:text-3xl text-primary">Welcome to Booking Page</h1>
        {loading && (<p>loading....</p>)}
        
  
        <div className="container mx-auto p-4 font-serif w-full md:w-[80%] lg:w-[60%]  flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl font-semibold text-main dark:text-primary2 mb-5">
            {packages?.title}
          </h1>
  
          <p className="text-xl font-medium text-primary dark:text-primary2">
            Duration:{" "}
            <span className="text-xl text-main font-normal dark:text-text2 font-sans">
              {packages?.duration}
            </span>
          </p>
  
          <p className="text-xl font-medium text-primary dark:text-primary2">
            Place:{" "}
            <span className="text-xl text-main font-normal dark:text-text2 font-sans">
              {packages?.place}
            </span>
          </p>
  
          <p className="text-xl font-medium text-primary dark:text-primary2">
            Price:{" "}
            <span className="text-xl text-main font-normal dark:text-text2 font-sans">
              {packages?.price}
            </span>
          </p>
  
          <div className="mb-4 cursor-pointer flex flex-col justify-center items-center">
            
  
            <label className="block text-main dark:text-primary2 text-xl font-medium mb-1">
              Select Number of Person:
            </label>
            <input
              type="number"
              min="1"
              value={numberPerson}
              onChange={(e) => setNumberPerson(e.target.value)}
              className="bg-white cursor-pointer border-gray-300 border mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
            />
            <label className="block font-medium mb-1 text-xl text-main dark:text-primary2">
              Select Travel Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              minDate={new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)}
              placeholderText="Select date"
              className="w-full p-2 border cursor-pointer border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
      
        </div>
  
        <p className="text-xl text-text font-bold dark:text-primary">
          Total Price:{" "}
          <span className="text-xl text-main font-normal dark:text-text2 font-sans">
            {totalPrice}
          </span>
        </p>
  
        {/* ########################  Payment Section  ################################### */}
        <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
          <input
            type="hidden"
            name="public_key"
            value="CHAPUBK_TEST"
          />
          <input type="hidden" name="tx_ref" value={randomString} />
          <input type="hidden" name="amount" value={totalPrice} />
          <input type="hidden" name="currency" value="ETB" />
          <input
            type="hidden"
            name="email"
            value={session?.user.email || "example@gmail.com"}
          />
          <input
            type="hidden"
            name="first_name"
            value={session?.user.name || "name"}
          />
          <input type="hidden" name="last_name" value="." />
          <input type="hidden" name="title" value="Tour App Payment" />
          <input
            type="hidden"
            name="description"
            value="Paying with Confidence with Chapa for Tour App"
          />
          <input
            type="hidden"
            name="logo"
            value="https://chapa.link/asset/images/chapa_swirl.svg"
          />
          <input
            type="hidden"
            name="callback_url"
            value={`https://api.chapa.co/v1/transaction/verify/${randomString}`}
          />
          <input type="hidden" name="return_url" value="http://localhost:3000/ApprovePackage" />
          <input type="hidden" name="meta[title]" value="test" />
          <button
          onClick={handleBooking}
            type="submit"
            className="bg-main mt-3 dark:bg-primary font-sans rounded-lg text-text py-2 px-4 hidden sm:block md:hidden lg:block"
          >
            Pay Now
          </button>
        </form>
      </div>
    );
  }
