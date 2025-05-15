// lib/actions.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllDestinations() {
  try {
    const destinations = await prisma.destination.findMany();
    return destinations;
  } catch (error) {
    console.error('Error fetching all destinations:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function getDestinationsByCategory(category: string) {
  try {
    const destinations = await prisma.destination.findMany({
      where: { category },
    });
    return destinations;
  } catch (error) {
    console.error(`Error fetching destinations by category (${category}):`, error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}


export async function getAllPackages() {
  try {
    const packages = await prisma.package.findMany();
    return packages;
  } catch (error) {
    console.error('Error fetching all packages:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}


export async function getAllReviews() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        destination: true,
      },
    });
    // Convert date to string and handle destinationId
    const formattedReviews = reviews.map(review => ({
      ...review,
      date: review.date.toISOString(), // Convert Date to string
      destinationId: review.destinationId ?? undefined, // Handle null value
    }));
    return formattedReviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function addReview(userId: number, review: string, destinationId?: number) {
  try {
    const newReview = await prisma.review.create({
      data: {
        userId,
        review,
        destinationId: destinationId ?? undefined, // Handle null value
      },
      include: {
        user: true, // Include user details
        destination: true, // Include destination details
      },
    });
    // Convert date to string
    const formattedReview = {
      ...newReview,
      date: newReview.date.toISOString(), // Convert Date to string
    };
    return formattedReview;
  } catch (error) {
    console.error('Error adding review:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export const sendMessage = async (formData: FormData) => {
  // Get senderId and receiverId from formData
  const msenderId = formData.get("msenderId") as string; // Sender ID from the form
  const mreceiverId = formData.get("mreceiverId") as string; // Receiver ID from the form
  const message = formData.get("message") as string; // The actual message
  
  // Ensure both senderId and receiverId are provided
  if (!msenderId || !mreceiverId) {
    return {
      success: false,
      message: "Sender and Receiver IDs are required",
    };
  }

  try {
    // Create a new message record without using the result
    await prisma.message.create({
      data: {
        msenderId: parseInt(msenderId, 10), // Convert senderId to number
        mreceiverId: parseInt(mreceiverId, 10), // Convert receiverId to number
        message: message,
      },
    });

    // Return success message
    return { success: true, message: "Message sent successfully!" };
  } catch (error: unknown) {  // Explicitly typing error as `unknown`
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        message: "Operation failed",
        error: error.message,
      };
    }

    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
};




interface Destination {
  id: number;
  name: string;
  region: string;
  city: string;
  farFromAdiss: string;
  image: string;
  category: string;
  interance: number;
}
export default async function fetchDestination(id: number): Promise<Destination | null> {
  try {
    const res = await fetch(`/api/destination?id=${id}`);
    if (!res.ok) throw new Error("Failed to fetch destination");

    return await res.json();
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}









export async function fetchMessages(receiverId: number) {
  try {
    const res = await fetch(`/api/getMessages?receiverId=${receiverId}`);
    

    if (!res.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}





export async function fetchuserMessages(senderId: number, receiverId: number) {
  try {
    const res = await fetch(`/api/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msenderId: senderId, mreceiverId: receiverId }),
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch messages");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}
