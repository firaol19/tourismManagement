"use client"

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface Package {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
}

export default function Activity() {
  const [activities, setActivities] = useState<Package[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/packages"); // API route in the app directory
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="mx-2 md:mx-10 lg:mx-20 mt-10 font-roboto">
      <h1 className="text-xl md:text-2xl lg:text-3xl text-main dark:text-primary2 font-serif xs:ml-14 md:ml-0">
        Activities and Tours
      </h1>
      <div className="mt-10 md:mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <div
            className="flex gap-5 w-full shadow-md shadow-main dark:shadow-text2 rounded-lg px-4 py-6 xs:w-3/4 mx-auto md:w-full"
            key={activity.id}
          >
            <div className="flex flex-col justify-between ">
              <div>
                <h2 className="text-text dark:text-primary2 font-roboto text-lg md:text-xl font-bold pb-2">
                  {activity.title}
                </h2>
                <p className="text-sm text-main dark:text-text2 font-sans pb-5">
                  {activity.description}
                </p>
              </div>
              <div>
                <p className="text-sm text-main dark:text-text2 font-sans pb-3">
                  Duration: {activity.duration}
                </p>
                <Link href={`/packageBook/${activity.id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                    Book Now
                  </Link>
              </div>
            </div>
            <Image
              src={activity.image || "/default.jpg"}
              alt="activity"
              width={200}
              height={200}
              className="rounded-lg w-[150px] h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
