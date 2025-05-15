"use client"

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import AccommodationBooking from "@/adminComponents/AccommodationBooking";
import AccommodationCard from "@/adminComponents/AccommodationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/Logout_button";
import { Session } from "next-auth";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

//import router from "next/router";
type UserType = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  image?: string;
};

type AccommodationType = {
  id: number;
  provider: string;
  type: string;
  description: string;
  image: string;
  price: number;
  available: string;
  city: string;
  providerId: string;
  refundDate: string;
};

type BookingResponseType = {
  id: number;
  tourGuideId: number;
  coupon?: string;
  user: UserType;
  accommodation: AccommodationType;
  // Include any other fields in BookedService you need (e.g., date, time, etc.)
};


export default function Guide() {
  const { data, status } = useSession();
  const session: Session | null = status === "authenticated" ? data : null;
  useEffect(() => {
    if (status !== 'loading' && !session) {
      redirect('/auth/login');
    }
  }, [session, status]);
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is treated as a string
  const name = session?.user.name;
  const [isOpen, setIsOpen] = useState(true)
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage]  = useState("")
  const [successMessage, setSuccessMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [userInfo, setUserInfo] = useState<BookingResponseType | null>(null);
  const [message, setMessage] = useState("");

 



  const [formData2, setFormData2] = useState({
    provider: "",
    type: "",
    description: "",
    image: "",
    price: "",
    city: "",
    providerId: "",
    refundDate: "",
    available: "",
  });
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (id) {
      setFormData2((prev) => ({
        ...prev,
        providerId: id,
      }));
      setFormData2((prev) => ({
        ...prev,
        provider: session?.user.name as string,
      }));
      
    }
  }, [id, session, status]);
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const res = await fetch("/api/checkAccommo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ providerId: id }), // id from useParams()
        });
  
        const data = await res.json();
        if (data.isRegistered) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.error("Failed to check registration", error);
      }
    };
  
    if (id) {
      checkRegistration();
    }
  }, [id]);
  
  
   
  const handleClick = () => {
    setIsOpen((prev) => !prev)
}
const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");

    

    if(!formData2.image){
      setError("Please Add image")
      setLoading(false);
        return;
    }else {
      setLoading(true);
      try {
        const response = await fetch("/api/addAccommodation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData2,
            image,
            price: Number(formData2.price),
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add accommodation");
        }
        setSuccessMessage("You registered successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        window.location.reload();

      }, 2000);
  
        // Redirect to the accommodation list page
      } catch (error) {
        setError("Error adding accommodation. Try again." + error);
      } finally {
        setLoading(false);
      }
    }

    
  };

const handleCheck = async () => {
  const res = await fetch("/api/checkAccommoCoupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      providerId: id, // get the providerId from session
      coupon,
    }),
  });


  const data = await res.json();

  if (data.found) {
    console.log(data)
    setUserInfo(data.bookings[0]);
  //  setMessage("");
  } else {
    console.log("test")
    setUserInfo(null);
    setMessage(data.message || "No booking found");
  }
};



  
  if (!id) {
    return <div>Invalid ID</div>; // Handle cases where ID is missing
  }
  if (session && session.user.role !== "accommodation_provider") {
    return <p className="font-serif">Permission Denied</p>;
  }


 
  return(
    <div className="flex ">

    <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[30%]" :  "hidden"}`}>
    <div className="w-full h-screen bg-secondary px-8 py-8 transition-all duration-200 flex flex-col overflow-y-hidden">
            <h1 className="font-extrabold font-serif text-2xl text-main2 mb-5">TOUR APP</h1>
            <Link href="/admin" className=" text-main2 font-roboto text-lg">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-main2 pr-3"/>
                AP Dashboard
            </Link>
            <p className="font-roboto text-lg text-[#454f5b] my-5">Management</p>
            <p onClick={()=> setNumber(1)} className="font-roboto text-lg cursor-pointer text-text my-5">Add Service</p>
            <p onClick={()=> setNumber(2)} className="font-roboto text-lg cursor-pointer  text-text my-5">Check Coupon</p>
            <p onClick={()=> setNumber(3)} className="font-roboto text-lg cursor-pointer text-text my-5">Listings</p>
            <p onClick={()=> setNumber(4)} className="font-roboto text-lg cursor-pointer text-text my-5">Booked Services</p>
            <LogoutButton/>
        </div>
    </div>
    <div className="flex flex-col w-full h-screen overflow-auto ">
    <div className="w-full">
                <div className="w-full px-6 py-3 flex items-center justify-between">
                    <div className="flex gap-3 items-center justify-center">
                        <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
                    </div>
                    <div className="bg-main w-[50px] h-[50px] rounded-full">
                    </div>
                </div>
    </div>
    {number === 0 && (
      <div className="h-screen">
        <div className="w-fit mx-auto h-full flex justify-center items-center relative top-[-50px]  ">
      <p className="text-text text-2xl bg-white p-6 rounded-lg shadow-lg font-serif mt-5" >Welcome To Accommodation Provider Dashboard</p>
    </div>
      </div>
    )}
    {number === 1 && (
      <div className="h-screen ">
        
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg font-serif mt-5 mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Add Accommodation</h2>
                  {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
                  <form onSubmit={handleSubmit2} className="space-y-4">
                  <CldUploadWidget
                  uploadPreset="social"
                  onSuccess={(result, { widget }) => {
                    const info = result.info as CloudinaryUploadWidgetInfo; // Ensure correct typing
                    if (info?.secure_url) {
                      setImage(info.secure_url);
                      setFormData2((prev) => ({ ...prev, image: info.secure_url })); // Update formData with the image URL
                    }
                    widget.close();
                  }}
                >
                  {({ open }) => (
                    <div className="flex items-center gap-2 cursor-pointer mb-3" onClick={() => open()}>
                      <Image src="/addimage.png" alt="" width={20} height={20} onClick={() => setError("")}/>
                      Photo
                    </div>
                  )}
                </CldUploadWidget>
                    {image && (
                      <div className="relative w-full h-40">
                        <Image src={image} alt="Uploaded Image" layout="fill" objectFit="cover" className="rounded-lg" />
                      </div>
                    )}
            
                    <input disabled type="text" name="provider" placeholder={name as string}  value={formData2.provider} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="text" name="type" placeholder="Type (e.g., Hotel, Hostel)" value={formData2.type} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <textarea name="description" placeholder="Description" value={formData2.description} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="hidden" name="image" value={formData2.image} onChange={handleChange2} required />
                    <input type="number" name="price" placeholder="Price" value={formData2.price} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="text" name="city" placeholder="City" value={formData2.city} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="number" min={1} name="refundDate" placeholder="Refund Date" value={formData2.refundDate} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="number" min={1} name="available" placeholder="Daily Avalable Accommodations" value={formData2.available} onChange={handleChange2} className="w-full p-2 border rounded" required />
            
                    <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
                      {loading ? "Adding..." : "Add Accommodation"}
                    </button>
                  </form>
                </div>
       
        
      </div>
      
    )}
    {number === 2 && (
      <div className="h-screen">
        {isRegistered && (
          <div className="w-fit mx-auto bg-white p-6 rounded-lg shadow-lg font-serif mt-5">
          <div className="relative inline-block">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!inputValue.startsWith("Tour_App")) {
                  setCoupon("Tour_App");
                } else {
                  setCoupon(inputValue);
                }
              }}
              className="border px-2 py-1 rounded pr-8"
            />
        
            {coupon.length > -1 && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                onClick={() => {
                  setCoupon("Tour_App");
                  setUserInfo(null);
                  setMessage("");
                }}
              >
                ×
              </button>
            )}
          </div>
        
          <button
            onClick={handleCheck}
            className="bg-text text-white px-4 py-1 rounded ml-2"
          >
            Check
          </button>
        
          {message && <p className="text-red-500 mt-3">{message}</p>}
        
          {userInfo && (
            <div className="mt-4 bg-gray-100 p-3 rounded">
              <p><strong>Name:</strong> {userInfo.user.name || "No name"}</p>
              <p><strong>Email:</strong> {userInfo.user.email}</p>
              <p><strong>Phone:</strong> {userInfo.user.phone || "N/A"}</p>
              <p><strong>Accommodation Id:</strong> {userInfo.accommodation.id}</p>
              <p><strong>Accommodation Type:</strong> {userInfo.accommodation.type}</p>
              <p><strong>Price:</strong> {userInfo.accommodation.price }</p>
            </div>
          )}
        </div>
        )}
        {!isRegistered && (
          <div className="w-fit mx-auto h-full flex justify-center items-center relative top-[-50px]  ">
            <p className="text-text text-2xl bg-white p-6 rounded-lg shadow-lg font-serif mt-5" >Add at least One Service </p>
          </div>
        )}
        
      </div>
    
    )}
    {number === 3 && (
      <div>
            <AccommodationCard providerId={id} />
      </div>
    )}
    {number === 4 && (
      <div>
        <AccommodationBooking providerId={id} />
      </div>
    )}
    </div>










      
    
    
    
    
    </div>
  )
}