// src/app/accommodation/page.tsx

import { Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

//import { authOptions } from "../../api/auth/[...nextauth]/route"; // Adjust the path to where your NextAuth is located


const AccommodationPage = async () => {
  // Get the session data from the server
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    // If the session doesn't exist, show a message or redirect
    return (
      <div>
        <h1>You must be logged in to access this page.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Accommodation Page</h1>
      <p>Welcome, {session.user?.name}!</p>
      {/* Render protected content */}
    </div>
  );
};

export default AccommodationPage;
