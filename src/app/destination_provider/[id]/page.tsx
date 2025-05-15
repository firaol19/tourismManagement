"use client"

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DestinationBooking from "@/adminComponents/DestinationBooking";
import DestinationCard from "@/adminComponents/DestinationCard";
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

type DestinationType = {
  id: number;
   name: string,
    region: string,
     city: string,
      farFromAdiss: string,
       image: string, 
       category: string,
        interance: string,
         description: string,
  providerId: string;
  refundDate: string;
};

type BookingResponseType = {
  id: number;
  tourGuideId: number;
  coupon?: string;
  date: string,
  user: UserType;
  destination: DestinationType;
  // Include any other fields in BookedService you need (e.g., date, time, etc.)
};


export default function DestinationProvider() {
  const { data, status } = useSession();
  const session: Session | null = status === "authenticated" ? data : null;
  useEffect(() => {
    if (status !== 'loading' && !session) {
      redirect('/auth/login');
    }
  }, [session, status]);
  const params = useParams();
  const id = params?.id as string; // Ensure `id` is treated as a string
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

 



  const [formData, setFormData] = useState({
    name: "",
    region: "",
    city: "",
    farFromAdiss: "",
    image: "",
    category: "",
    interance: "",
    description: "",
    providerId : "",
    refundDate: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    if (id) {
      setFormData((prev) => ({
        ...prev,
        providerId: id,
      }));
      setFormData((prev) => ({
        ...prev,
        provider: session?.user.name as string,
      }));
      
    }
  }, [id, session, status]);


  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const res = await fetch("/api/checkDestination", {
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
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if(!formData.image){
        setError("Please Add image")
        setLoading(false);
        return;
      }else {
        setLoading(true);
    try {
      const response = await fetch("/api/addDestination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, interance: Number(formData.interance) }),
      });

      if (!response.ok) {
        throw new Error("Failed to add destination");
      }
      setSuccessMessage("You registered successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 3000);

      
    } catch (error) {
      setError("Error adding destination. Try again." + error);
    } finally {
      setLoading(false);
    }
  };
}


const handleCheck = async () => {
  const res = await fetch("/api/checkDestinationCoupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      providerId: id, // get the providerId from session
      coupon,
    }),
  });


  const data = await res.json();

  if (data.found) {
   
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

  if (session && session.user.role !== "destination_provider") {
    return <p className="font-serif">Permission Denied</p>;
  }

 
  return(
    <div className="flex ">

    <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[30%]" :  "hidden"}`}>
    <div className="w-full h-screen bg-secondary px-8 py-8 transition-all duration-200 flex flex-col overflow-y-hidden">
            <h1 className="font-extrabold font-serif text-2xl text-main2 mb-5">TOUR APP</h1>
            <Link href="/admin" className=" text-main2 font-roboto text-lg">
                <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-main2 pr-3"/>
                DP Dashboard
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
      <p className="text-text text-2xl bg-white p-6 rounded-lg shadow-lg font-serif mt-5" >Welcome To Destination Provider Dashboard</p>
    </div>
      </div>
    )}
    {number === 1 && (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg shadow-main font-serif mt-5">
                  <h2 className="text-2xl font-bold mb-4 text-primary">Add Destination</h2>
                  {error && <p className="text-red-500">{error}</p>}
                  {successMessage && <p className="text-green-500">{successMessage}</p>}
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result, { widget }) => {
                const info = result.info as CloudinaryUploadWidgetInfo; // Ensure correct typing
                if (info?.secure_url) {
                  setImage(info.secure_url);
                  setFormData((prev) => ({ ...prev, image: info.secure_url })); // Update formData with the image URL
                }
                widget.close();
              }}
            >
              {({ open }) => (
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => open()}>
                  <Image src="/addimage.png" alt="" width={20} height={20} />
                  Photo
                </div>
              )}
            </CldUploadWidget>
            
            {image && (
                  <div className="relative w-full h-40">
                    <Image src={image} alt="Uploaded Image" layout="fill" objectFit="cover" className="rounded-lg" />
                  </div>
                )}
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="region" placeholder="Region" value={formData.region} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="farFromAdiss" placeholder="Far From Addis" value={formData.farFromAdiss} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="image"  placeholder="Image URL" value={formData.image} onChange={handleChange} className="w-full p-2 border rounded hidden" required />
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" min={1} name="interance" placeholder="Interance Fee" value={formData.interance} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" min={1} name="refundDate" placeholder="Refund Date" value={formData.refundDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
                    
                    <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
                      {loading ? "Adding..." : "Add Destination"}
                    </button>
                  </form>
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
              <p><strong>Destination Id:</strong> {userInfo.destination.id}</p>
              <p><strong>Destination Name:</strong> {userInfo.destination.name}</p>
              <p><strong>Interance Price:</strong> {userInfo.destination.interance }</p>
              <p>
  <strong>Date:</strong>{" "}
  {new Date(userInfo.date).getMonth() + 1}/
  {new Date(userInfo.date).getDate()}/
  {new Date(userInfo.date).getFullYear()}
</p>

              
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
            <DestinationCard providerId={id} />
      </div>
    )}
    {number === 4 && (
      <div>
        <DestinationBooking providerId={id} />
      </div>
    )}
    </div>

    
    </div>
  )
}
