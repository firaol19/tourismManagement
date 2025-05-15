"use client";

import { FormEvent, useRef } from "react";

const MessageInteraction = ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const postData = {
      msenderId: formData.get("msenderId") as string,
      mreceiverId: formData.get("mreceiverId") as string,
      message: formData.get("message") as string,
    };

    try {
      // Send the data to the server-side API route
      const response = await fetch("/api/sendmessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Message sent successfully");

        // Reset the form fields
        formRef.current?.reset();
      } else {
        console.error("Error:", result.error || result.message);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="font-serif">
      <div className="flex gap-3 items-center p-2 absolute bottom-0 w-full bg-transparent">
        <textarea
          name="message"
          placeholder="Write Something..."
          className="w-full border-2 rounded-md border-gray-500"
        ></textarea>
        <input
          type="text"
          defaultValue={receiverId}
          className="hidden"
          name="mreceiverId"
        />
        <input
          type="text"
          defaultValue={senderId}
          className="hidden"
          name="msenderId"
        />
        <button className="bg-text rounded-lg px-4 py-2 text-white">
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInteraction;
