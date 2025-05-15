"use client"

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchMessages } from "@/lib/action";

// replace with the receiverId you want to filter by

type MessageWithUser = {
  id: number;
  createdAt: Date;
  msenderId: number;
  msender: {
    id: number;
    name: string;
    email: string;
    image?: string | null; // Assuming avatar is a nullable field in User
  };
  mreceiverId: number;
  mreceiver: {
    id: number;
    name: string;
    email: string;
    image?: string | null;
  };
  message: string;
};

//console.log(senders);

const LeftSide =  () => {
  const [senders, setMessages] = useState<MessageWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  

  useEffect(() => {
    const receiverId = 7;

    fetchMessages(receiverId)
      .then((data) => {
        if (data) {
          setMessages(data);
        } else {
          setError("An error occurred while fetching messages");
        }
      })
      .catch((error) => {
        setError("Failed to fetch messages: " + error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  

  
  return (
    <div className="w-full font-serif  bg-white bg-cover bg-center h-full overflow-y-auto">
      <div className="p-4">
        <div className="p-2 bg-white items-center rounded-lg relative ">
          <input
            type="text"
            placeholder="Search senders"
            className="bg-transparent outline-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            size="1x"
            style={{ color: "green" }}
            className="absolute top-3 right-3"
          />
        </div>
      </div>

      <div>
        {senders.length > 0 && (
          <div className="p-6 flex flex-col gap-3">
            <h3 className="text-primary text-2xl">Senders</h3>
            {senders.map((user) => (
                
              <div className="flex items-center gap-3" key={user.id}>
                <Link href={`/Message2/${user.msender.id}`}>
                
                <div className="flex gap-3">
                    <Image
            src={user.msender.image|| "/default.jpg"}
            alt="User Profile"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-text dark:text-primary2 font-serif text-lg font-bold">
              {user.msender.name}
            </p>
            <p className="text-main dark:text-main2 font-roboto text-xs">
                 {user.msender.email}
            </p>
                 </div>
                 </div>
                </Link>

                

                


                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSide;
