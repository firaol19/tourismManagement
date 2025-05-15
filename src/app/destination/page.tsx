'use client';

import { faArrowDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer2 from "@/components/Footer2";
import Image from "next/image";
import Link from "next/link";

// Define the structure of a destination
type Destination = {
  id: string;
  title: string;
  category: string;
  region: string;
  image: string;
  name: string;
};

const categoriesList = ["Historical", "Religious", "Natural", "Wildlife", "Cultural", "Geological", "Urban"];
const regionsList = ["Oromia", "Amhara", "Tigray", "Somali", "Harari", "Addis Ababa", "Afar", "Gambella", "Benishangul-gumuz", "Dire Dawa",];

export default function DestinationFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const[isOpen, setIsOpen] = useState(false)

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const fetchDestinations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/destinations2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categories: selectedCategories,
          regions: selectedRegions,
        }),
      });
  
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unknown error");
      }
  
      const data: { success: boolean; data: Destination[] } = await res.json();
      setDestinations(data.data);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, selectedRegions]);
  
  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);
  

  return (
    <div onClick={()=> isOpen ? setIsOpen(false) : ""}  className=" font-serif">
      <div className="relative flex justify-center items-center flex-col">
      <h2 onClick={()=> setIsOpen(!isOpen)} className="text-xl cursor-pointer py-4 font-bold mb-2 text-primary dark:text-primary2 font-sans">Filter Destinations <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4" /></h2>

<div onClick={(e) => e.stopPropagation()} className={`dark:bg-primary bg-secondary w-fit px-10 py-5 rounded-lg max-w-[500px] mx-4 absolute top-[72px]   ${isOpen ? "visible" : "invisible"}`}>
<div className="mb-4">
  <h3 className="font-semibold text-main dark:text-text2">Categories: </h3>
  <div className="flex gap-3 flex-wrap">
    {categoriesList.map(cat => (
      <label key={cat} className="flex items-center gap-1 text-text dark:text-text2">
        <input
          type="checkbox"
          value={cat}
          checked={selectedCategories.includes(cat)}
          onChange={() => toggleCategory(cat)}
          className="cursor-pointer"
        />
        {cat}
      </label>
    ))}
  </div>
</div>

<div className="mb-4">
  <h3 className="font-semibold text-main dark:text-text2">Regions:</h3>
  <div className="flex gap-3 flex-wrap">
    {regionsList.map(region => (
      <label key={region} className="flex items-center gap-1 text-text dark:text-text2">
        <input
          type="checkbox"
          value={region}
          checked={selectedRegions.includes(region)}
          onChange={() => toggleRegion(region)}
          className="cursor-pointer"
        />
        {region}
      </label>
    ))}
  </div>
</div>
</div>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Loading indicator */}
      {loading && <p className="text-text">Loading...</p>}

      <div className="mt-6">
        <ul className="list-disc ">
          {destinations.length === 0 && !loading && <li>No destinations found</li>}
          <div className="mx-5  mt-6 z-[-2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map(data => (
            <div key={data.id}>
                        <div className="shadow-lg shadow-text dark:shadow-text2 p-1 rounded-lg ">
                          <Image
                            src={data.image}
                            width={400}
                            height={200}
                            alt="destination"
                            className="w-full h-[250px] object-cover rounded-md"
                          />
                          <div className="flex flex-col justify-center items-center py-4">
                          <h1 className="text-primary dark:text-primary2 text-xl md:text-2xl lg:text-3xl font-serif truncate w-full  overflow-hidden whitespace-nowrap">
                            {data.name}
                          </h1>
                            <div className="flex gap-[1px]">
                              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-300" />
                              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-300" />
                              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-300" />
                              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-300" />
                              <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-300" />
                            </div>
                            <div className="flex items-center justify-center gap-3">
                              <Link href={`/detail/${data.id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                                Details
                              </Link>
                              <Link href={`/book/${data.id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
          ))}
          </div>
          
        </ul>
      </div>
      <Footer2/>
    </div>
  );
}
