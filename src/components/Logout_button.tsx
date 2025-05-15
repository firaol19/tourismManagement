"use client"

import { signOut, useSession } from "next-auth/react";

import Link from "next/link";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    // Call signOut to log the user out
    await signOut({
      callbackUrl: "/auth/login", // Redirect to login page after logout
    });
  };

  return (
    <div>
      {session ? (
        <p
          onClick={handleLogout}
          className="font-bold font-sans cursor-pointer"
        >
          Logout
        </p>
      ) : (
        <Link href="/auth/login" className="font-bold font-sans cursor-pointer">Login</Link>
      )}
    </div>
  );
};

export default LogoutButton;
