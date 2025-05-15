"use client";

import Image from "next/image";
import { useState } from "react";

// Define the type for Review
type Review = {
  id: number;
  date: string;
  review: string;
  userId: number;
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  destinationId?: number;
  destination?: {
    name: string;
    image: string;
    region: string;
    city: string;
    farFromAdiss: string;
    category: string;
  } | null;
};

type ReviewClientProps = {
  reviews: Review[];
  userId: number;
};

const ReviewClient = ({ reviews, userId }: ReviewClientProps) => {
  const [comment, setComment] = useState("");
 // const [userId, setUserId] = useState<number | null>(null); // Replace this with actual user ID logic
  const [destinationId, setDestinationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (userId !== null) {
        const response = await fetch('/api/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, review: comment, destinationId }),
        });
      //  const result = await response.json();
        if (response.ok) {
          setMessage("Review submitted successfully!");
          setComment("");
          setDestinationId(null);
        } else {
          setMessage("Failed to submit review  test.");
        }
      } else {
        setMessage("User ID is required.");
      }
    } catch (error) {
      setMessage("Failed to submit review  test2.");
      console.log(error)
    }
    setLoading(false);
  };

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
    <div className="px-2 md:px-10 lg:px-20 mt-6 mb-5 font-serif">
      <div className="pb-5 border-b-2 border-accent w-full">
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col items-center justify-center gap-4">
          <h2 className="text-xl lg:text-2xl text-primary dark:text-primary2 font-roboto font-bold">Leave a Review</h2>
          <textarea
              className="rounded-lg px-3 py-2 outline-none shadow-lg shadow-main dark:shadow-main2 w-full md:w-3/4 lg:w-1/2"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))} // Prevents exceeding 500 chars
              maxLength={200} // Ensures max limit is enforced
              required
            ></textarea>
          <p className="text-right text-sm text-gray-500">
            {comment.length}/200
          </p>

          <button
            type="submit"
            className="bg-main dark:bg-primary font-sans rounded-lg text-text py-2 px-4 "
            disabled={loading}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
        {message && <p className="dark:text-text2">{message}</p>}
      </div>
      <div className="mt-10 flex flex-col items-center">
        <h1 className="text-main dark:text-primary2 font-serif text-xl md:text-2xl lg:text-3xl">Hear From our Awesome Users!</h1>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div key={review.id} className="w-full rounded-lg shadow-md shadow-main dark:shadow-text2 mx-auto px-4 py-3">
              <div className="flex gap-3">
                <Image src={review.user.image || "/default.jpg"} alt="pp" width={50} height={50} className="rounded-full" />
                <div>
                  <p className="text-text dark:text-primary2 font-serif text-lg font-bold">{review.user.name}</p>
                  <p className="text-main dark:text-text2 font-roboto text-xs">{review.user.email}</p>
                </div>
              </div>
              <p data-full-text={review.review} data-expanded="false" className="text-main dark:text-text2 font-roboto text-sm pt-2">
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
  );
};

export default ReviewClient;
