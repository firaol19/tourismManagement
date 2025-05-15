/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import "react-datepicker/dist/react-datepicker.css"; // Import the default styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { redirect, useParams } from "next/navigation";

import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { Session } from "next-auth";
import axios from "axios";
import fetchDestination from "@/lib/action";
import moment from "moment";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Destination {
  id: number;
  name: string;
  region: string;
  city: string;
  farFromAdiss: string;
  image: string;
  category: string;
  interance: number;
}
interface Transportation {
  id: number;
  provider: string;
  type: string;
  description: string;
  image: string;
  price: number;
  noperson: number;
  totalcar: string;

}
interface Accommodation {
  id  :        number ;   
  provider  :  string;
  type    :    string;
  description: string;
  image      : string;
  price   :    number;
  city     :   string;
  available : string;
}
type TourGuide = {
  id: number;
  name: string;
  language: string;
  price: string;
  image: string;
};



function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export default function BookingPage() {
  const { data, status } = useSession();
  const session: Session | null = status === "authenticated" ? data : null;
  useEffect(() => {
    if (status !== 'loading' && !session) {
      redirect('/auth/login');
    }
  }, [session, status]);
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is treated as a string

  if (!id) {
    return <div>Invalid ID</div>; // Handle cases where ID is missing
  }
  const clearCookiesOnPageLoad = () => {
    const cookieNames = [
      "destinationId",
      "transportationId",
      "accommodationId",
      "tourGuideId",
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
  
  const [randomString, setRandomString] = useState<string>("");
  
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 5);
  
  const [step, setStep] = useState(1);
  const [numberPerson, setNumberPerson] = useState("1");
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);
  const [selectedTime] = useState<Date | null>(new Date());
  const [startPoint] = useState("Adiss Abeba");
  const [destination, setDestination] = useState("Loading...");
  const [interancePrice, setInterancePrice] = useState(0);
  const [region, setRegion] = useState("Loading...");
  const [city, setCity] = useState("Addis Ababa");
  const [image, setImage] = useState("/white.jpg");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [transportData, setTransportData] = useState<Transportation[]>([]);
  const [transport, setTransport] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [guide, setGuide] = useState(false);

  const [t_type, setT_type] = useState("Loading...");
  const [t_number, setT_number] = useState(1);
  const [t_by, setT_by] = useState("Loading");
  const [t_price, setT_price] = useState("0");

  const [selectedAccommoIndex, setSelectedAccommoIndex] = useState<number | null>(null);
  const [accommodationData, setAccommodationData] = useState<Accommodation[]>([]);
  const [a_type, setA_type] = useState("Loading...");
  const [a_by, setA_by] = useState("Loading");
  const [a_price, setA_price] = useState("0");
  const [, setA_available] = useState("10");

  const [selectedGuideIndex, setSelectedGuideIndex] = useState<number | null>(null);
  const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);
  const [guidName, setGuideName] = useState("Loading...");
  const [language, setLanguage] = useState("Loading...");
  const [guidPrice, setGuidePrice] = useState("0");

  let transportPrice = 0

  if(t_type === "VIP Car" || t_type === "Car" ){
    transportPrice = Number(t_price)
  }
  if(t_type === "VIP Bus" || t_type === "Bus" ){
    transportPrice = Number(t_price) * Number(numberPerson);
  }

 
  const destinationPrice = Number(interancePrice) * Number(numberPerson);
  const accommoPrice = Number(a_price) * Number(numberPerson);
  const TotalPrice = transportPrice + accommoPrice + Number(guidPrice) + destinationPrice;

  const [accommodationId, setAccommodationId] = useState("0");
  const [transportationId, setTransportationId] = useState("0");
  const [tourGuideId, setTourGuideId] = useState("0");

  const [bookedSit,SetBookedSit ] = useState(0);
  const [sitLeft, SetSitLeft] = useState<number | null>(null);
  const [carLeft, SetCarLeft] = useState<number | null>(null);
  const [accommoLeft, SetAccommoLeft] = useState<number | null>(null);


  const [transportMessage, SetTransportMessage] = useState<string | null>(null);
  const [accommodationMessage, SetAccommodationMessage] = useState<string | null>(null);
  const [guideMessage, SetGuideMessage] = useState<string | null>(null);

  // Clear cookies and session on page load
  

  useEffect(() => {
    const newRandomString = generateRandomString();
    setRandomString(newRandomString);
  }, []);

  // Fetch destination, transportation, accommodation, and guides data (existing logic)
  useEffect(() => {
    if (!id) return;

    const getDestination = async () => {
      try {
        const data: Destination | null = await fetchDestination(Number(id));
        setDestination(data?.name ?? ""); 
        setInterancePrice(data?.interance ?? 0);
        setCity(data?.city ?? "");
        setRegion(data?.region ?? "");
        setImage(data?.image ?? "")
      } catch (error) {
        console.error("Failed to fetch destination", error);
        setDestination("");
      }
    };

    getDestination();
  }, [id]);

  // Fetch transportation data
  useEffect(() => {
    const fetchTransportationData = async () => {
      try {
        const response = await fetch("/api/Transportation");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTransportData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransportationData();
  }, []);

  // Fetch accommodation data
  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const response = await fetch(`/api/accommodation?city=${city}`);
        if (!response.ok) {
          throw new Error("Failed to fetch accommodation data");
        }
        const data = await response.json();
        setAccommodationData(data);
      } catch (error) {
        console.error("Error fetching accommodation data:", error);
      }
    };

    fetchAccommodationData();
  }, [city, step]);



  // Fetch tour guides data
  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await fetch("/api/tourguides");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: TourGuide[] = await response.json();
        setTourGuides(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchTourGuides();
  }, []);

  useEffect(() => {
    if((t_number - bookedSit ) === 0 ){
      SetTransportMessage("This Transportation is Unavailable! You select more than left")
      setSelectedIndex(null);
      setTransport(false);
      setT_price("");
      setT_type("");
      setNumberPerson("1")
    }else if((t_type === "VIP Bus" || t_type === "Bus" ) && (t_number - bookedSit) < Number(numberPerson) ){
      SetTransportMessage("This Transportation is Unavailable! You select more than left")
      setSelectedIndex(null);
      setTransport(false);
      setT_price("");
      setT_type("");
      setNumberPerson("1")
    }
  }, [bookedSit, numberPerson, t_number, t_type]);

  useEffect(() => {
    if((accommoLeft !== null) && (Number(accommoLeft) < Number(numberPerson))){
      setSelectedAccommoIndex(null);
        setAccommodation(false);
        setA_price("");
        setA_type("");
        SetAccommodationMessage("This Accomodation is Unavailable! You select more than left")
        SetAccommoLeft(null)
    }else {
      setTimeout(() => {
        SetAccommodationMessage(null);
      }, 5000); // 3000 milliseconds = 3 seconds
    }
  }, [selectedAccommoIndex, numberPerson,accommoLeft ]);
  
  
    
    
    const handleStepAdd = () => {
        if(step < 5) {
            setStep((prev) => prev + 1)
        }
    }
    const handleStepSubstruct = () => {
        if(step > 1) {
            setStep((prev) => prev - 1)
        }
    }
    
    const handleClick = async (index: number) => {
      // If the clicked div is already selected, deselect it
      if (selectedIndex === index) {
        setSelectedIndex(null);
        setTransport(false);
        setT_price("");
        setT_type("");
        setNumberPerson("1")
      } else {
        // Otherwise, select the clicked div and update the state
        setSelectedIndex(index);
        setTransport(true);
    
        const selectedTransportation = transportData[index];
    
        // Update the state with the clicked transportation data
        setT_type(selectedTransportation.type);
        setT_number(selectedTransportation.noperson);
        setT_by(selectedTransportation.provider);
        setT_price(selectedTransportation.price.toString());
        setTransportationId(selectedTransportation.id.toString())
        SetTransportMessage(null)

        

        try {
          const response = await axios.post("/api/transportation-total", {
            selectedDate,
            transportationId: selectedTransportation.id,
            selectedDestinationId: id,
          });
      
          const total = response.data.total ?? 10;
          
          console.log(total)
          
          SetBookedSit(total)
          SetSitLeft(selectedTransportation.noperson - total);
          SetCarLeft(Number(selectedTransportation.totalcar) - total);
          
      
        } catch (error) {
          console.error("Error fetching seat information:", error);
        }
      };
      }
    

     

    const handleAccommoClick = async (index: number) => {
      // If the clicked div is already selected, deselect it
      if (selectedAccommoIndex === index) {
        setSelectedAccommoIndex(null);
        setAccommodation(false);
        setA_price("");
        setA_type("");
      } else {
        // Otherwise, select the clicked div and update the state
        setSelectedAccommoIndex(index);
        setAccommodation(true);
    
        const selectedAccommodation = accommodationData[index];
    
        // Update the state with the clicked transportation data
        setA_type(selectedAccommodation.type);
        setA_by(selectedAccommodation.provider);
        setA_price(selectedAccommodation.price.toString());
        setAccommodationId(selectedAccommodation.id.toString())
        setA_available(selectedAccommodation.available)
        
        

        try {
          const response = await axios.post("/api/accommodation-total", {
            selectedDate,
            accommodationId: selectedAccommodation.id,
          });
      
          const total = response.data.total ?? 10;
          
          

          SetAccommoLeft(Number(selectedAccommodation.available) - total)
      
          
      
        } catch (error) {
          console.error("Error fetching seat information:", error);
        }
      
      }
    };
    const handleGuideClick = async (index: number) => {
      // If the clicked div is already selected, deselect it
      if (selectedGuideIndex === index) {
        setSelectedGuideIndex(null);
        setGuide(false);
        setGuidePrice("");
      } else {
        // Otherwise, select the clicked div and update the state
        setSelectedGuideIndex(index);
        setGuide(true);
    
        const selectedGuide = tourGuides[index];
    
        // Update the state with the clicked transportation data
        setGuideName(selectedGuide.name);
        setLanguage(selectedGuide.language);
        setGuidePrice(selectedGuide.price);
        setTourGuideId(selectedGuide.id.toString());
        SetGuideMessage(null)


        try {
          const response = await axios.post("/api/tguide-total", {
            selectedDate,
            tourGuideId: selectedGuide.id,
          });
      
          const total = response.data.total ?? 10;

          console.log(total)
          
          if(total === 1){
            SetGuideMessage("❌ This Guide not Available on Selected Date")
            setSelectedGuideIndex(null);
            setGuide(false);
            setGuidePrice("");
          }else{
            SetGuideMessage("✅ Available on Selected Date")
          }
      
          
      
        } catch (error) {
          console.error("Error fetching seat information:", error);
        }



        
      }
    };


   

    const formatDateForCookie = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`; // "YYYY-MM-DD"
    };
    

    
    const handleBooking = () => {
      Cookies.set("destinationId", String(id), { expires: 7, path: "/" });
    
      if (transport) {
        Cookies.set("transportationId", String(transportationId), { expires: 7, path: "/" });
      }
      if (accommodation) {
        Cookies.set("accommodationId", String(accommodationId), { expires: 7, path: "/" });
      }
      if (guide) {
        Cookies.set("tourGuideId", String(tourGuideId), { expires: 7, path: "/" });
      }
    
      // Convert numbers to strings
      Cookies.set("totalPrice", String(TotalPrice), { expires: 7, path: "/" });
      Cookies.set("numberPerson", String(numberPerson), { expires: 7, path: "/" });
      Cookies.set("reference", String(randomString), { expires: 7, path: "/" });
    
      // Convert Date to ISO string (handles null case)
      //Cookies.set("date", selectedDate ? selectedDate.toISOString().split('T')[0] : "", { expires: 7, path: "/" });
      //Cookies.set("date", selectedDate ? selectedDate : "", { expires: 7, path: "/" });

      Cookies.set("time", selectedTime ? selectedTime.toISOString() : "", { expires: 7, path: "/" });

      if (selectedDate) {
        Cookies.set("date", formatDateForCookie(selectedDate), { expires: 7, path: "/" });
      }
      
    
      // Ensure userId is set as a string
      if (session?.user.id) {
        Cookies.set("userId", session.user.id, { expires: 7, path: "/" });
      }
    };

   
    
    
   /*
   <label className="block text-main dark:text-primary2 text-xl font-medium mb-1">Select Number of Person:</label>
                          <input
                        type="number"
                        min="1"
                        value={numberPerson}
                        onChange={(e) => setNumberPerson(e.target.value)}
                        className="bg-white cursor-pointer border-gray-300 border mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                    />

                    <label className="block text-main text-xl font-medium mb-1 dark:text-primary2">Select Time:</label>
        <DatePicker
          selected={selectedTime}
          onChange={(time: Date | null) => setSelectedTime(time)}
          showTimeSelect // Enable time selection only
          showTimeSelectOnly // Disable date selection
          timeIntervals={15} // Time intervals in minutes
          timeCaption="Time"
          dateFormat="h:mm aa" // Format for time display
          placeholderText="Select time"
          className="w-full p-2 border cursor-pointer border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
    */

    


    return(
        <div className="flex  font-serif flex-col transition-all items-center py-5 justify-center my-10 mx-auto w-[95%] rounded-lg md:w-3/4 lg:w-1/2 shadow-lg shadow-main ">
            <h1 className="text-2xl lg:text-3xl text-primary ">Welcome to Booking Page</h1>
            <div className="flex mt-6 items-center justify-center translate-x-5">
                <div className={`md:w-[70px] w-[40px] h-2 rounded-md ${step >= 1 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-5 h-5 z-20 rounded-full -translate-x-1 ${step >= 1 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-[40px] md:w-[70px] h-2 rounded-md -translate-x-2 ${step >= 2 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-5 h-5 z-20 rounded-full -translate-x-3 ${step >= 2 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-[40px] md:w-[70px] h-2 rounded-md -translate-x-4 ${step >= 3 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-5 h-5 z-20 rounded-full -translate-x-5 ${step >= 3 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-[40px] md:w-[70px] h-2 rounded-md -translate-x-6 ${step >= 4 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-5 h-5 z-20 rounded-full -translate-x-7 ${step >= 4 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-[40px] md:w-[70px] h-2 rounded-md -translate-x-8 ${step >= 5 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
                <div className={`w-5 h-5 z-20 rounded-full -translate-x-9 ${step >= 5 ? "bg-text" : "bg-primary dark:bg-text2"}`}/>
            </div>
            {step === 1 && (
                <div className="flex flex-col md:flex-row md:gap-6 w-full items-start justify-center mt-4 ">
                <div className="pt-[10%] w-full flex items-start justify-center  ">
                <Image src={image} width={200} height={200} alt="image" className="rounded-lg "/>
                </div>
                <div className="flex flex-col md:max-w-[55%] w-full  items-center justify-center md:items-start">
                <div className="font-roboto mt-4 ">
                    <p className="text-xl font-medium text-primary dark:text-primary2">Destination: <span className="text-xl text-main font-normal dark:text-text2 font-sans ">{destination}</span></p>
                    <p className="text-xl font-medium text-primary dark:text-primary2">Region: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{region}</span></p>
                    <p className="text-xl font-medium text-primary dark:text-primary2">City: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{city}</span></p>
                    <p className="text-xl font-medium text-primary dark:text-primary2">Interance Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{interancePrice}</span></p>
                </div>
                <div className="relative w-fit h-full ">
                <h1 className="text-lg font-semibold dark:text-primary mb-4 z-10 pb-[290px]">Select Travel Date</h1>
                <div className="  ">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    if (date) {
                      date.setHours(0, 0, 0, 0);
                      setSelectedDate(date);
                    }
                  }}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)}
                  placeholderText="Select date"
                  className="w-fit absolute top-[-315px] right-[-185px]  p-2 border cursor-pointer border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                  open={true}
                  popperPlacement="bottom-start" // Calendar shows under input
          
                />
              
            </div>
                </div>
                </div>
              </div>
            )}
            {step === 2 && (
                    <div className="mt-4 mx-5 w-full flex flex-col justify-center items-center">
                    <h1 className="text-main text-xl mb-2 dark:text-primary2">Do you want to Include Transportation?</h1>
                    <p className="text-main text-sm font-roboto mb-4 dark:text-text2">If you do not click next to skip</p>
                    <Swiper
                      navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                      }}
                      
                      spaceBetween={0}
                      modules={[Pagination, Navigation]}
                      className="mySwiper w-[95%] border-secondary dark:border-secondary2 border-2 rounded-lg"
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                      }}
                    >
                      {transportData.map((slide, index) => (
                        <SwiperSlide key={slide.id} onClick={() => handleClick(index)} className={((city === "Addis Ababa") && (slide.type === "Bus" || slide.type === "VIP Bus")) ? "!hidden" : "block"}>
                          
                            <div className={`p-1 cursor-pointer rounded-lg m-2 shadow-lg shadow-main ${
                              selectedIndex === index
                                ? "bg-text  border-4 border-main"
                                : "bg-background dark:bg-background2"
                            }`}>
                                                  <Image
                                                    src={slide.image}
                                                    width={400}
                                                    height={200}
                                                    alt="destination"
                                                    className="w-full h-[200px] object-cover rounded-md"
                                                  />
                                                  <div className="flex flex-col justify-center items-center py-4">
                                                  <p className="`text-xl font-medium text-primary dark:text-primary2 ">Type: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.type}</span></p>
                                                  <p className="text-xl font-medium text-primary dark:text-primary2">Number of Person: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.noperson}</span></p>
                                                  <p className="text-xl font-medium text-primary dark:text-primary2">By: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.provider}</span></p>
                                                  <p className="text-xl font-medium text-primary dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.price}</span></p>
                                                  </div>
                                                </div>
                          
                         
                        </SwiperSlide>
                        
                      ))}
                      <SwiperSlide>
                        
                      </SwiperSlide>
                      
                      {/* Custom Navigation Arrows */}
                      <div className="custom-prev absolute top-1/2 left-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
                        ❮
                      </div>
                      <div className="custom-next absolute top-1/2 right-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
                        ❯
                      </div>
                    </Swiper>
                    <div className="mb-4 mt-3 flex justify-center items-center gap-3 flex-col">
                      
                      {transportMessage && (
                         <div>
                         <p className="`text-xl font-medium text-text dark:text-primary2 ">{transportMessage}</p>
                       </div>
                      )}

                       {(t_type === "VIP Bus" || t_type === "Bus" )   && (
                        <div>
                          <p className="`text-xl font-medium text-text dark:text-primary2 ">Number of sit Left: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{sitLeft}</span></p>
                        </div>
                       )}
                       {(t_type === "VIP Car" || t_type === "Car" )   && (
                        <div>
                          <p className="`text-xl font-medium text-text dark:text-primary2 ">Number of Car Left: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{carLeft}</span></p>
                        </div>
                       )}
                      
                      {(t_type === "VIP Bus" || t_type === "Bus" )   && (
                        <div>
                          <label className="block text-main dark:text-primary2 text-xl font-medium mb-1">Select Number of Person:</label>
                          <input
                        type="number"
                        min="1"
                        value={numberPerson}
                        onChange={(e) => setNumberPerson(e.target.value)}
                        className="bg-white cursor-pointer border-gray-300 border mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                    />
                        </div>
                      )}
        
      </div>
                </div>
                  
                  
                
            )}
            {step === 3 && (
                <div className="mt-4 mx-5 w-full flex flex-col justify-center items-center">
                    <h1 className="text-main text-xl mb-2 dark:text-primary2">What about Accommodation?</h1>
                    <p className="text-main text-sm font-roboto mb-4 dark:text-text2">If you do not click next to skip</p>
                    <Swiper
                      navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                      }}
                      
                      spaceBetween={0}
                      modules={[Pagination, Navigation]}
                      className="mySwiper w-[95%] border-secondary dark:border-secondary2 border-2 rounded-lg"
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                      }}
                    >
                      {accommodationData.map((slide, index) => (
                        <SwiperSlide key={slide.id} onClick={() => handleAccommoClick(index)}>
                          <div className={`p-1 cursor-pointer rounded-lg m-2 shadow-lg shadow-main ${
        selectedAccommoIndex === index
          ? "bg-text  border-4 border-main"
          : "bg-background dark:bg-background2"
      }`}>
                            <Image
                              src={slide.image}
                              width={400}
                              height={200}
                              alt="destination"
                              className="w-full h-[200px] object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-center items-center py-4">
                            <p className="text-xl font-medium text-primary dark:text-primary2">Type: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.type}</span></p>
                            <p className="text-xl font-medium text-primary dark:text-primary2">By: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.provider}</span></p>
                            <p className="text-xl font-medium text-primary dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.price}</span></p>
                            </div>
                          </div>
                        </SwiperSlide>
                        
                      ))}
                      <SwiperSlide>
                        
                      </SwiperSlide>
                      
                      {/* Custom Navigation Arrows */}
                      <div className="custom-prev absolute top-1/2 left-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
                        ❮
                      </div>
                      <div className="custom-next absolute top-1/2 right-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
                        ❯
                      </div>
                    </Swiper>
                    <div className="mt-3">
                    {accommodationMessage && (
                         <div>
                         <p className="`text-xl font-medium text-text dark:text-primary2 ">{accommodationMessage}</p>
                       </div>
                      )}
                      {accommodation && (
                        <div>
                          <p className="`text-xl font-medium text-text dark:text-primary2 ">Number of Accommodation Left: <span className="text-xl text-main font-normal dark:text-main2 font-sans">{accommoLeft}</span></p>
                        </div>
                      )}

                        {(t_type === "VIP Car" || t_type === "Car" || (!transport) )   && (
                        <div>
                        <label className="block text-main dark:text-primary2 text-xl font-medium mb-1">Select Number of Person:</label>
                        <input
                      type="number"
                      min="1"
                      value={numberPerson}
                      onChange={(e) => setNumberPerson(e.target.value)}
                      className="bg-white cursor-pointer border-gray-300 border mt-[8px] py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                  />
                      </div>
                       )}
                    </div>
                </div>
            )}
            {step === 4 && (
                <div className="mt-4 mx-5 w-full flex flex-col justify-center items-center">
                    <h1 className="text-main text-xl mb-2 dark:text-primary2">Do you need Tour Guide?</h1>
                    <p className="text-main text-sm font-roboto mb-4 dark:text-text2">If you do not click next to skip</p>
                    <Swiper
                      navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                      }}
                      
                      spaceBetween={0}
                      modules={[Pagination, Navigation]}
                      className="mySwiper w-[95%] border-secondary dark:border-secondary2 border-2 rounded-lg"
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                      }}
                    >
                      {tourGuides.map((slide, index) => (
                        <SwiperSlide key={slide.id} onClick={() => handleGuideClick(index)}>
                          <div className={`p-1 cursor-pointer flex flex-col justify-center items-center rounded-lg m-2 shadow-lg shadow-main ${
        selectedGuideIndex === index
          ? "bg-text  border-4 border-main"
          : "bg-background dark:bg-background2"
      }`}>
                            <Image
                              src={slide.image}
                              width={400}
                              height={200}
                              alt="destination"
                              className="w-[70%] aspect-square object-cover rounded-full "
                            />
                            <div className="flex flex-col justify-center items-center py-4">
                            <p className="text-xl font-medium text-primary dark:text-primary2">Name: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.name}</span></p>
                            <p className="text-xl font-medium text-primary dark:text-primary2">Language: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.language}</span></p>
                            <p className="text-xl font-medium text-primary dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{slide.price}</span></p>
                            </div>
                          </div>
                        </SwiperSlide>
                        
                      ))}
                      <SwiperSlide>
                        
                      </SwiperSlide>
                      
                      {/* Custom Navigation Arrows */}
                      <div className="custom-prev absolute top-1/2 left-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
                        ❮
                      </div>
                      <div className="custom-next absolute top-1/2 right-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
                        ❯
                      </div>
                    </Swiper>
                    <div className="mt-5">
                    {guideMessage && (
                         <div>
                         <p className="`text-xl font-medium text-text dark:text-primary2 ">{guideMessage}</p>
                       </div>
                      )}
                    </div>
                    
                </div>
            )}
            {step === 5 && (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-main text-xl mb-2 dark:text-primary rounded-lg shadow-lg shadow-main px-6 py-3 mt-4">Please Chack Detail</h1>
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-xl font-medium text-text dark:text-primary2">Destination: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{destination}</span></p>
                        <p className="text-xl font-medium text-text dark:text-primary2">Travel Date: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{moment(selectedDate).format("MMMM Do YYYY")}</span></p>
                        <p className="text-xl font-medium text-text dark:text-primary2">Travel Time: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{moment(selectedTime).format("h:mm a")}</span></p>
                        <p className="text-xl font-medium text-text dark:text-primary2">Start Point: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{startPoint}</span></p>
                        <p className="text-xl font-medium text-text dark:text-primary2">Interance Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{interancePrice}</span></p>
                        <p className="text-xl font-medium text-text dark:text-primary2">No of Person: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{numberPerson}</span></p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-text font-bold text-xl mb-2 dark:text-primary mt-4">Services</h1>
                        <div className="flex flex-col">
                        {transport && (
                            <div>
                            <h1 className="text-primary2 text-xl mb-2 dark:text-primary mt-4">Transportation</h1>
                            <p className="text-xl font-medium text-text dark:text-primary2">Type: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{t_type}</span></p>
                            <p className="text-xl font-medium text-text dark:text-primary2">Provided By: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{t_by}</span></p>
                            <p className="text-xl font-medium text-text dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{t_price}</span></p>
                        </div>
                        )}
                        {accommodation && (
                            <div>
                            <h1 className="text-primary2 text-xl mb-2 dark:text-primary mt-4">Accommodation</h1>
                            <p className="text-xl font-medium text-text dark:text-primary2">Type: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{a_type}</span></p>
                            <p className="text-xl font-medium text-text dark:text-primary2">Provided By: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{a_by}</span></p>
                            <p className="text-xl font-medium text-text dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{a_price}</span></p>
                        </div>
                        )}
                        {guide && (
                            <div>
                            <h1 className="text-primary2 text-xl mb-2 dark:text-primary mt-4">Tour Guide</h1>
                            <p className="text-xl font-medium text-text dark:text-primary2">Name: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{guidName}</span></p>
                            <p className="text-xl font-medium text-text dark:text-primary2">Language: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{language}</span></p>
                            <p className="text-xl font-medium text-text dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{guidPrice}</span></p>
                        </div>
                        )}
                        </div>
                    </div>
                    <div className="flex mt-4 gap-7">
                        <p className="text-xl  text-text font-bold dark:text-primary">Total Price: <span className="text-xl text-main2 font-normal dark:text-text2 font-sans">{TotalPrice}</span></p>
                        
                    </div>

                    {/*########################  payment     ################################### */}
                    <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
                          <input type="hidden" name="public_key" value="CHAPUBK_TEST-" />
                          <input type="hidden" name="tx_ref" value={randomString} />
                          <input type="hidden" name="amount" value={TotalPrice} />
                          <input type="hidden" name="currency" value="ETB" />
                          <input type="hidden" name="email" value={session?.user.email || "example@gmail.com"} />
                          <input type="hidden" name="first_name" value={session?.user.name || "name"}/>
                          <input type="hidden" name="last_name" value="." />
                          <input type="hidden" name="title" value="Tour App Payment" />
                          <input type="hidden" name="description" value="Paying with Confidence with chapa for Tour App" />
                          <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
                          <input type="hidden" name="callback_url" value={`https://api.chapa.co/v1/transaction/verify/${randomString}`}/>
                          <input type="hidden" name="return_url" value="http://localhost:3000/aprove" />
                          <input type="hidden" name="meta[title]" value="test" />
                          <button onClick={handleBooking} type="submit" className="bg-main mt-3 dark:bg-primary font-sans rounded-lg text-text py-2 px-4 hidden sm:block md:hidden lg:block">Pay Now</button> 
                          </form>
                </div>
                
                
            )}
            
            
            <div className="flex justify-between w-full px-7 mt-5">
                <button onClick={handleStepSubstruct} className={`text-xl text-text cursor-pointer dark:text-primary shadow-md shadow-main px-3 py-2 rounded-md ${step === 1 ? "invisible" : ""}`}>Prev</button>
                <button onClick={handleStepAdd} className={`text-xl cursor-pointer text-text dark:text-primary shadow-md shadow-main px-3 py-2 rounded-md ${step === 5 ? "invisible" : ""}`}>Next</button>
            </div>
        </div>
    )
}
