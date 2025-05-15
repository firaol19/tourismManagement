"use client";

import { useEffect, useState } from "react";

import Bar from "@/adminComponents/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

// Define the type for Review
interface Review {
  id: number;
  review: string;
  date: string;
  user: { name: string; email: string; image: string };
  destination?: { name: string };
}

export default function Review() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(true)
   
    const handleClick = () => {
        setIsOpen((prev) => !prev)
    }
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/allReview");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  

  const toggleText = (event: React.MouseEvent<HTMLSpanElement>) => {
    const span = event.currentTarget;
    const p = span.previousSibling as HTMLParagraphElement;

    if (p) {
      const fullText = p.getAttribute("data-full-text") || "";
      const isExpanded = p.getAttribute("data-expanded") === "true";

      if (isExpanded) {
        p.textContent = fullText.slice(0, 50) + "...";
        span.textContent = "Show more";
      } else {
        p.textContent = fullText;
        span.textContent = "Show less";
      }
      p.setAttribute("data-expanded", String(!isExpanded));
    }
  };

  return (
    <div className="flex h-screen transition-all ">
        <div className={`transition-all h-screen ${isOpen ? "w-[80%] xs:w-[40%] sm:w-[30%] lg:w-[20%]" :  "hidden"}`}>
            <Bar/>
        </div>
        <div className={`h-screen transition-all relative overflow-y-auto ${isOpen ? "w-[20%] xs:w-[60%] sm:w-[70%] lg:w-[80%] " : "w-full"}`}>
            <div className="w-full px-6 py-3 flex items-center justify-between">
                                <div className="flex gap-3 items-center justify-center">
                                    <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-main pr-3 cursor-pointer" onClick={handleClick}/>
                                    <input placeholder="Search" className=" font-sans rounded-md focus:outline-none border-[#c4cdd5] border px-4 py-2" type="text" />
                                </div>
                                <div className="bg-main w-[50px] h-[50px] rounded-full">
                                </div>
                            </div>
    <div className="px-2 md:px-10 lg:px-20 mt-6 mb-5 font-serif">
      
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-main dark:text-primary2 font-serif text-xl md:text-2xl lg:text-3xl">Hear From our Awesome Users!</h1>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div key={review.id} className="w-full rounded-lg shadow-md shadow-main dark:shadow-main2 mx-auto px-4 py-3">
              <div className="flex gap-3">
                <Image src={review.user.image || "/default.jpg"} alt="pp" width={50} height={50} className="rounded-full" />
                <div>
                  <p className="text-text dark:text-primary2 font-serif text-lg font-bold">{review.user.name}</p>
                  <p className="text-main dark:text-main2 font-roboto text-xs">{review.user.email}</p>
                </div>
              </div>
              <p data-full-text={review.review} data-expanded="false" className="text-main dark:text-main2 font-roboto text-sm pt-2">
                {review.review.slice(0, 50)} ...
              </p>
              <span onClick={toggleText} className="cursor-pointer text-primary dark:text-primary2">
                show more
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};


