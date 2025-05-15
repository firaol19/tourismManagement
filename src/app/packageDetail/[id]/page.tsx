"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define the Destination type


interface Packages {
    place   :    string
    title   :    string
    description :string
    duration:    string
    image  :     string
    price    :   string
    include  :   string
}



const PackageDetail = () => {
  const { id } = useParams();
  const [packages, setPackage] = useState<Packages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    if (!id) return;
  
    const fetchPackage = async () => {
      try {
        const res = await fetch(`/api/package?id=${id}`);
        const data = await res.json();
  
        if (res.ok) {
          setPackage(data);
        } else {
          setError(data.error || "An error occurred while fetching package");
        }
      } catch (error) {
        setError("Failed to fetch package data: " + error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPackage();
  }, [id]);
  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!packages) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="container mx-auto p-4 font-serif w-full md:w-[80%] lg:w-[60%] bg-white dark:bg-background2 mt-5 rounded-3xl shadow-lg shadow-main flex flex-col gap-3 justify-center items-center ">
      <h1 className="text-2xl font-semibold text-main dark:text-primary2 mb-5">{packages.title}</h1>
      <Image
          src={packages.image}
          alt={packages.title}
          width={600}
          height={200}
          className="object-cover rounded-lg max-h-[250px]"
        />
        <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-medium text-primary dark:text-primary2 ">Description: </p>
      <p className="text-xl text-main font-normal dark:text-text2 font-sans">{packages.description}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-medium text-primary dark:text-primary2 ">It Include: </p>
      <p className="text-xl text-main font-normal dark:text-text2 font-sans">{packages.include}</p>
      </div>
      
      <p className="text-xl font-medium text-primary dark:text-primary2">Duration: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{packages.duration}</span></p>
      
      <p className="text-xl font-medium text-primary dark:text-primary2">Place: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{packages.place}</span></p>
      <p className="text-xl font-medium text-primary dark:text-primary2">Price: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{packages.price}</span></p>
      
      <Link href={`/packageBook/${id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans  cursor-pointer">
                    Book Now
                  </Link>
    </div>
  );
};

export default PackageDetail