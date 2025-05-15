"use client"

import { useEffect, useState } from "react";

import Link from "next/link";

// Define interfaces for your data
interface Review {
  id: number;
  review: string;
  date: string;
  user: { name: string; email: string };
  destination?: { name: string };
}

export default function Review() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
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

  return (
    <div className="font-roboto bg-white px-8 py-6 rounded-2xl overflow-x-auto shadow-lg shadow-main">
      <h1 className="text-primary text-xl">User Reviews</h1>
      <table className="mt-3 min-w-[670px]">
        <thead>
          <tr className="bg-[#f1f5f9] border-b-accent border-t-accent border">
            <th className="text-start font-normal text-text font-serif py-4 pl-4 w-[180px] overflow-hidden">
              Email
            </th>
            <th className="text-start font-normal text-text font-serif w-[120px]">Review</th>
            <th className="text-start font-normal text-text font-serif w-[120px]">Date</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((item) => (
            <tr className="border-b-accent border" key={item.id}>
              <td className="py-3 pl-4">{item.user.email}</td>
              <td>{item.review}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center w-full py-3">
        <Link href="/reviewAdmin" className="text-xl font-serif text-primary">View All</Link>
      </div>
    </div>
  );
}
