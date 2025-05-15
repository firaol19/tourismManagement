"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

//import { useSession } from "next-auth/react"; // Import session hook

type User = {
  id: number;
  name: string;
  image: string;
};

type Message = {
  id: number;
  createdAt: string;
  msenderId: number;
  mreceiverId: number;
  message: string;
  msender: User;
  mreceiver: User;
};

function MessagesComponent({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  // const { data: session } = useSession(); // Get session data
  const postData = {
    msenderId: senderId,
    mreceiverId: receiverId,
  };

  const fetchMessages = async () => {
    const url = "/api/messages";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    };
    return fetcher(url, options);
  };

  const { data, error } = useSWR<Message[]>(
    senderId && receiverId ? ["/api/messages", postData] : null,
    fetchMessages,
    {
      refreshInterval: 1000, // Revalidate every 1 second
    }
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages data changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={`overflow-y-auto flex flex-col  px-1 font-serif ${Number(senderId) !== 7 ? "h-[calc(100vh-60px)]" : "h-screen"}`}>
      {data.map((message) => (
        <div key={message.id}>
          <div
            className={`flex gap-4 p-3 ${
              Number(senderId) === message.msenderId ? "flex-row-reverse" : ""
            }`} // Check if senderId matches msenderId to align messages
          >
            <Image
              src={message.msender.image || "/default.jpg"}
              alt={message.msender.name}
              width={30}
              height={30}
              className="rounded-full w-10 h-10 border-2"
            />
            <p
              className={`rounded-xl text-sm px-3 py-1 max-w-[75%] ${
                Number(senderId) === message.msenderId
                  ? "bg-gray-200 text-black"
                  : "bg-blue-400 text-white"
              }`}
            >
              {message.message} {/* Display message content */}
            </p>
          </div>
          <span
            className={`text-gray-400 text-sm ${
              Number(senderId) === message.msenderId ? "float-right" : ""
            }`} // Check if senderId matches msenderId to position timestamp
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ))}

      {/* The ref element to scroll into view */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessagesComponent;
