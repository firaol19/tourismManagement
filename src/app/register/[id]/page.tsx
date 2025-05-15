"use client";

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useParams, useRouter } from "next/navigation";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { useState } from "react";

const AddDestination = () => {
  const router = useRouter();
  const params = useParams();
      const id = params?.id as string;
      
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    providerId: "",
    city: "",
    farFromAdiss: "",
    image: "",
    category: "",
    interance: "",
    description: "",
    refundDate: "",
  });
  const [formData1, setFormData1] = useState({
    provider: "",
    providerId: "", // ADD THIS
    type: "",
    description: "",
    image: "",
    price: "",
    noperson: "",
    refundDate: "",
    totalcar: "",
  });
  const [formData2, setFormData2] = useState({
    provider: "",
    type: "",
    description: "",
    providerId: "",
    image: "",
    price: "",
    city: "",
    refundDate: "",
    available: ""
  });
  const [formData3, setFormData3] = useState({
    name: "",
    language: "",
    price: "",
    image: "",
    refundDate:"",
    providerId: "",
  });
  const [formData4, setFormData4] = useState({
    place: "",
    title: "",
    description: "",
    duration: "",
    price: "",
    include: "",
    providerId: "",
  });


  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage]  = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange1 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };
  const handleChange3 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
  };
  const handleChange4 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData4({ ...formData4, [e.target.name]: e.target.value });
  };



  const [isOpen, setIsOpen] = useState(true)
   
  const handleClick = () => {
      setIsOpen((prev) => !prev)
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/addDestination", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, interance: Number(formData.interance) }),
      });

      if (!response.ok) {
        throw new Error("Failed to add destination");
      }

      router.push("/admin"); // Redirect to destination list page
    } catch (error) {
      setError("Error adding destination. Try again." + error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if(!formData1.image){
        setError("Please Add image")
        setLoading(false);
        return;
      }else {
        setLoading(true);
    try {
      const response = await fetch("/api/addTransportation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData1,
          image: image,
          price: Number(formData1.price),
          noperson: Number(formData1.noperson),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add transportation");
      }
      router.push("/admin");
  
      

    } catch (error) {
      setError("Error adding transportation. Try again." + error);
    } finally {
      setLoading(false);
    }
  };
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
         router.push("/admin");
  
        // Redirect to the accommodation list page
      } catch (error) {
        setError("Error adding accommodation. Try again." + error);
      } finally {
        setLoading(false);
      }
    }

    
  };
 const handleSubmit3 = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if(!formData3.image){
    setError("Please Add image")
    setLoading(false);
    return;
  }else {
    setLoading(true);
  try {
    const response = await fetch("/api/addTourGuide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData3,
        image,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add tour guide");
    }

    router.push("/admin"); 
  } catch (error) {
    setError("Error adding tour guide. Try again." + error);
  } finally {
    setLoading(false);
  }
};
}
  const handleSubmit4 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/addPackage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData4,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add package");
      }

      router.push("/admin"); // Redirect to package list page
    } catch (error) {
      setError("Error adding package. Try again." + error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div>
       
        <div className="flex h-screen transition-all ">
            <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
                <Bar/>
            </div>
            <div className={`h-screen transition-all pb-5 relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
                <div className="w-full px-6 py-3 flex items-center justify-between">
     <div className="flex gap-3 items-center justify-center">
        <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
        <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
      </div>
      <div className="bg-main w-[50px] h-[50px] rounded-full">
      </div>
  </div>
  {Number(id) === 1  && (
            <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg shadow-main font-serif mt-5">
            <h2 className="text-2xl font-bold mb-4 text-primary">Add Destination</h2>
            {error && <p className="text-red-500">{error}</p>}
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
                    <input type="number" name="interance" placeholder="Interance Fee" value={formData.interance} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="number" name="refundDate" placeholder="Refund Date" value={formData.refundDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <input type="text" name="providerId" placeholder="provider Id" value={formData.providerId} onChange={handleChange} className="w-full p-2 border rounded" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
                    
              <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
                {loading ? "Adding..." : "Add Destination"}
              </button>
            </form>
          </div>
        )}
       {Number(id) === 2 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg font-serif mt-5">
        <h2 className="text-2xl font-bold mb-4 text-primary">Add Transportation</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit1} className="space-y-4">
        <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          const info = result.info as CloudinaryUploadWidgetInfo; // Ensure correct typing
          if (info?.secure_url) {
            setImage(info.secure_url);
            setFormData1((prev) => ({ ...prev, image: info.secure_url })); // Update formData with the image URL
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
  
          <input type="text" name="provider" placeholder="Provider" value={formData1.provider} onChange={handleChange1} className="w-full p-2 border rounded" required />
                <select
  name="type"
  value={formData1.type}
  onChange={handleChange1}
  className="w-full p-2 border rounded"
  required
>
  <option value="" disabled>Select Type</option>
  <option value="VIP Car">VIP Car</option>
  <option value="VIP Bus">VIP Bus</option>
  <option value="Bus">Bus</option>
  <option value="Car">Car</option>
                </select>

                <textarea name="description" placeholder="Description" value={formData1.description} onChange={handleChange1} className="w-full p-2 border rounded" required />
                <input type="hidden" name="image" value={formData1.image} onChange={handleChange1} required />
                <input type="number" name="price" placeholder="Price" value={formData1.price} onChange={handleChange1} className="w-full p-2 border rounded" required />
                <input type="number" name="noperson" placeholder="Number of Persons" value={formData1.noperson} onChange={handleChange1} className="w-full p-2 border rounded" required />
                <input type="number" name="refundDate" placeholder="Refund date" value={formData1.refundDate} onChange={handleChange1} className="w-full p-2 border rounded" required />
                <input type="text" name="providerId" placeholder="provider Id" value={formData1.providerId} onChange={handleChange1} className="w-full p-2 border rounded" required />
                {(formData1.type === "Car" || formData1.type === "VIP Car") && (
                <input
                  type="number"
                  name="totalcar"
                  placeholder="Total Number of car per day"
                  value={formData1.totalcar}
                  onChange={handleChange1}
                  className="w-full p-2 border rounded"
                  required
                />
              )}

          <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
            {loading ? "Adding..." : "Add Transportation"}
          </button>
        </form>
      </div>
       )}
       {Number(id) === 3 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg font-serif mt-5">
        <h2 className="text-2xl font-bold mb-4 text-primary">Add Accommodation</h2>
        {error && <p className="text-red-500">{error}</p>}
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
  
         <input  type="text" name="provider" placeholder="Name"  value={formData2.provider} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="text" name="type" placeholder="Type (e.g., Hotel, Hostel)" value={formData2.type} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <textarea name="description" placeholder="Description" value={formData2.description} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="hidden" name="image" value={formData2.image} onChange={handleChange2} required />
                    <input type="number" name="price" placeholder="Price" value={formData2.price} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="text" name="city" placeholder="City" value={formData2.city} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="number" min={1} name="refundDate" placeholder="Refund Date" value={formData2.refundDate} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="number" min={1} name="available" placeholder="Daily Avalable Accommodations" value={formData2.available} onChange={handleChange2} className="w-full p-2 border rounded" required />
                    <input type="text" name="providerId" placeholder="provider Id" value={formData2.providerId} onChange={handleChange2} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
            {loading ? "Adding..." : "Add Accommodation"}
          </button>
        </form>
      </div>
       )}
       {Number(id) === 4 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg font-serif mt-5">
        <h2 className="text-2xl font-bold mb-4 text-primary">Add Tour Guide</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit3} className="space-y-4">
        <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          const info = result.info as CloudinaryUploadWidgetInfo; // Ensure correct typing
          if (info?.secure_url) {
            setImage(info.secure_url);
            setFormData3((prev) => ({ ...prev, image: info.secure_url })); // Update formData with the image URL
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
  
           <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData3.name}
              onChange={handleChange3}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="language"
              placeholder="Language"
              value={formData3.language}
              onChange={handleChange3}
              className="w-full p-2 border rounded"
              required
            />
            <input type="text" name="providerId" placeholder="provider Id" value={formData3.providerId} onChange={handleChange3} className="w-full p-2 border rounded" required />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData3.price}
              onChange={handleChange3}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="refundDate"
              placeholder="Refund Days"
              value={formData3.refundDate}
              onChange={handleChange3}
              className="w-full p-2 border rounded"
              min="1"
              max="10"
              required
            />
    
            <input type="hidden" name="image" value={image} onChange={handleChange3} required />
            
          <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
            {loading ? "Adding..." : "Add Tour Guide"}
          </button>
        </form>
      </div>
       )}
       {Number(id) === 5 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg font-serif mt-5">
        <h2 className="text-2xl font-bold mb-4 text-primary">Add Package</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit4} className="space-y-4">
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
  
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={formData4.place}
            onChange={handleChange4}
            className="w-full p-2 border rounded"
            required
          />
          
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData4.title}
            onChange={handleChange4}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData4.description}
            onChange={handleChange4}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData4.duration}
            onChange={handleChange4}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData4.price}
            onChange={handleChange4}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="include"
            placeholder="Includes"
            value={formData4.include}
            onChange={handleChange4}
            className="w-full p-2 border rounded"
            required
          />
          <input type="hidden" name="image" value={image} onChange={handleChange4} required />
  
          <button type="submit" className="w-full bg-text text-white py-2 rounded" disabled={loading}>
            {loading ? "Adding..." : "Add Package"}
          </button>
        </form>
      </div>
       )}
               
           </div>
       </div>
    </div>
  );
};

export default AddDestination;
