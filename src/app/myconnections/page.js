"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const MyConnections = () => {

  const { push } = useRouter();
  const [myConnections, setMyConnections] = useState([]);
  const [users, setUsers] = useState([]);
  const [allConnections, setAllConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // client side session


  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch(`/api/user/${session.user.email}`)
        .then((response) => response.json())
        .then((data) => setMyConnections(data.connections));
      setLoading(false);
    }

  }, [session]);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch(`/api/user`)
        .then((response) => response.json())
        .then((data) => setUsers(data));
      setLoading(false);
    }

  }, [session]);

  useEffect(() => {
    const arr = [];

    // if (users) {
    //   for (let i = 0; i < users.length; i++) {
    //     if (users[i].email != session.user.email) {
    //       for (let j = 0; j < myConnections.length; j++) {
    //         if(myConnections[j].email != users[i].email)
    //         arr.push(users[i]);
    //       }
    //     }
    //   }
    // }

    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (session.user.email != users[i].email) {
          arr.push(users[i]);
        }
      }

      for (let j = 0; j < allConnections.length; j++) {
        if(allConnections[j].email != myConnections.email){
          arr.pop(allConnections[j].email);
        }
      }
      setAllConnections(arr)
     
    }




  }, [users, session]);

  // console.log(myConnections);
  // console.log(allConnections);

  const AddConnection = async (user) => {
    const userName = user.name;
    const userEmail = user.email;
    const userRole = user.experience.length <= 0 ? "No Designation" : user.experience[0].designation;
    const userCompany = user.experience.length <= 0 ? "Not working user" : user.experience[0].companyName;

    const res = await fetch(`/api/addconnection/${session.user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userName, userCompany, userRole, userEmail })
    });

    if (res.status == 200) { toast.success("Connection Added !") }
    else if (res.status == 500) { toast.error("Internal Server Error, Please try again later !") }
  }

  if (!myConnections) { return <Spinner /> }
  if (status === "loading") { return <Spinner /> }
  if (status == "unauthenticated") { push("/login") }


  //DELETE Connection
  const deleteConnection = async (userEmail) =>{

    const res = await fetch(`/api/deleteconnection/${session.user.email}`, {
      method:"PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({userEmail})
    });

    if (res.status == 200) { toast.success("Connection Deleted !") }
    else if (res.status == 500) { toast.error("Internal Server Error, Please try again later !") }
  }

  return (
    <>
      <Toaster />
      {loading ? <Spinner /> : null}
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <div className="bg-[#1E2875] h-40 rounded-xl p-4 w-full">
          <h1 className='text-white uppercase'>My Connections</h1>
        </div>
        <div className="p-8 bg-white shadow-lg border-2 rounded-2xl -translate-y-16 w-11/12 mx-atuo">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
            {
              loading ? "Loading..." : myConnections?.length <= 0 ? "No Connections" : myConnections?.map((conn, index) => {
                return (<div key={index} className="shadow rounded-2xl border-2 flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center p-4 gap-4">
                  <div className="lg:hidden md:hidden sm:hidden flex justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                    <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
                  </div>
                  <div className="flex flex-col lg:text-left md:text-left sm:text-left text-center">
                    <p className='mb-2 font-medium text-lg'>{loading ? "name..." : conn.name}</p>
                    <p className='text-slate-700'>{loading ? "role..." : conn.role}</p>
                    <p className='text-slate-700'>{loading ? "company" : `@ ${conn.company}`}</p>
                    <button onClick={()=>{deleteConnection(conn.email)}} className='px-4 mt-4 py-1 rounded-full bg-rose-300 text-rose-800'>Remove Connection</button>
                  </div>
                  <div className="lg:flex md:flex sm:flex hidden justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                    <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
                  </div>
                </div>)
              })
            }
          </div>
        </div>


        <div className="p-8 bg-white rounded-2xl w-11/12 mx-atuo mb-8">
          <h1 className='mb-4 font-semibold text-xl'>People you can also connect</h1>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">

            {
              loading ? "Loading" : allConnections?.length <= 0 ? "Connections Not Available" : allConnections?.map((allconn, ind) => {
                return (
                  <div key={ind} className="shadow rounded-2xl border-2 flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center p-4 gap-4">
                    <div className="lg:hidden md:hidden sm:hidden flex justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                      <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
                    </div>
                    <div className="flex flex-col lg:text-left md:text-left sm:text-left text-center">
                      <p className='mb-2 font-medium text-lg capitalize'>{allconn.name}</p>
                      <p className='text-slate-700 capitalize'>{allconn.experience.length > 0 ? allconn.experience[0].designation : "No designation"}</p>
                      <p className='text-slate-700 capitalize'>{allconn.experience.length > 0 ? `@ ${allconn.experience[0].companyName}` : "Not working user"}</p>
                      <button onClick={() => AddConnection(allconn)} className='px-4 mt-4 py-1 rounded-full bg-green-300 text-green-900'>Connect</button>
                    </div>
                    <div className="lg:flex md:flex sm:flex hidden justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                      <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>

      </div>
    </>
  )
}

export default MyConnections