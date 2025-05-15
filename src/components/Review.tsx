"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  image: string | null;
}

interface Review {
  id: number;
  review: string;
  user: User;
}

export default function Review() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

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
    <div className="mx-2 md:mx-10 lg:mx-20 mt-16">
      <div className="flex flex-col items-center">
        <h1 className="text-main dark:text-primary2 font-serif text-xl md:text-2xl lg:text-3xl">
          Hear From our Awesome Users!
        </h1>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="w-full rounded-lg shadow-md shadow-main dark:shadow-text2 mx-auto px-4 py-3"
            >
              <div className="flex gap-3">
                <Image
                  src={review.user.image || "/default.jpg"}
                  alt="User Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="text-text dark:text-primary2 font-serif text-lg font-bold">
                    {review.user.name}
                  </p>
                  <p className="text-main dark:text-text2 font-roboto text-xs">
                    {review.user.email}
                  </p>
                </div>
              </div>
              <p data-full-text={review.review} data-expanded="false" className="text-main dark:text-text2 font-roboto text-sm pt-2">
                {review.review.slice(0, 50)} ...
              </p>
              <span onClick={toggleText} className="cursor-pointer text-primary dark:text-primary2">
                Show more
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-main dark:text-text2 flex justify-end items-end">
        <Link href="/review" className="text-xl font-roboto pt-5 pr-5 cursor-pointer">
          More
        </Link>
      </div>
    </div>
  );
}
