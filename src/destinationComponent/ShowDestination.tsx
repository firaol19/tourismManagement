"use client";

import { fetchAllDestinations, fetchDestinationsByCategory } from '@/utils/fetchDestinations';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// Define the type for Destination
type Destination = {
  id: number;
  name: string;
  image: string;
  region: string;
  city: string;
  farFromAdiss: string;
  category: string;
};

type ShowDestinationProps = {
  category: string;
};



const ShowDestination: React.FC<ShowDestinationProps> = ({ category }) => {
  
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data;
        if (category) {
          data = await fetchDestinationsByCategory(category);
        } else {
          data = await fetchAllDestinations();
        }

        if (data) {
          setDestinations(data);
        } else {
          setError("Failed to load destinations");
        }
      } catch (err) {
        setError("An error occurred while fetching destinations" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      
 
      

      <div className="mx-2  mt-6 z-[-2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {destinations.map((data) => (
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
              <h1 className="text-primary dark:text-primary2 text-xl md:text-2xl lg:text-3xl font-serif truncate w-full overflow-hidden whitespace-nowrap">
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
                  <Link href={`/detail/${data.id}`} className="bg-main dark:bg-main2 rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                    Details
                  </Link>
                  <Link href={`/book/${data.id}`} className="bg-main dark:bg-main2 rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDestination;
