"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


const ProfileDashboard = () => {

  const { data:session, status } = useSession(); // client side session

  if(status === "loading"){
    return "Loading...";
  }

  if(status == "unauthenticated"){
    redirect("/login");
  }


  return (
  <>
    <div className="container mx-auto border">This is my profile {session?.user.name}</div>
  </>
  )
}

export default ProfileDashboard