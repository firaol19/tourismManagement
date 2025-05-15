"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface Destination {
  id: number;
  name: string;
  image: string;
}

export default function DestinationSlide() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <Swiper
      navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
      spaceBetween={30}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {destinations.map((destination) => (
        <SwiperSlide key={destination.id}>
          <div className="border-secondary dark:border-secondary2 border-2 p-1 rounded-lg bg-background dark:bg-background2">
            <Image
              src={destination.image}
              width={400}
              height={200}
              alt={destination.name}
              className="w-full h-[250px] object-cover rounded-md"
            />
            <div className="flex flex-col justify-center items-center py-4">
            <h1 className="text-primary dark:text-primary2 text-xl md:text-2xl lg:text-3xl font-serif truncate w-full overflow-hidden whitespace-nowrap">
                {destination.name}
              </h1>
              <Link href={`/detail/${destination.id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                Details
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <SwiperSlide>
        <div className="flex w-[200px] h-[384px] justify-center items-center p-1 rounded-lg bg-background dark:bg-background2">
          <p className="bg-main dark:bg-main2 text-text px-4 py-2 rounded-lg font-sans cursor-pointer">
            More
          </p>
        </div>
      </SwiperSlide>

      {/* Custom Navigation Arrows */}
      <div className="custom-prev absolute top-1/2 left-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
        ❮
      </div>
      <div className="custom-next absolute top-1/2 right-4 z-10 cursor-pointer text-white bg-black/50 p-2 rounded-full text-2xl">
        ❯
      </div>
    </Swiper>
  );
}
