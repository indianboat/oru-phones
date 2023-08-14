"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';

const MyConnections = () => {
  
  const {push} = useRouter();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // client side session

  
  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch(`/api/user/${session.user.email}`)
        .then((response) => response.json())
        .then((data) => setConnections(data.connections));
      setLoading(false);
    }

  }, [session]);

  if (!connections) {
    return <Spinner/>;
  }

  if (status === "loading") {
    return <Spinner/>;
  }

  if (status == "unauthenticated") {
    push("/login");
  }



  return (
    <>
      {/* { loading ? <Spinner/> : null} */}
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <div className="bg-[#1E2875] h-40 rounded-xl p-4 w-full">
          <h1 className='text-white uppercase'>My Connections</h1>
        </div>
        <div className="p-8 bg-white shadow-lg border-2 rounded-2xl -translate-y-16 w-11/12 mx-atuo">

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">

          {
            loading ? "Loading..." : connections?.length <= 0 ? "No Connections" : connections?.map((conn, index)=> {
              return ( <div key={index} className="shadow rounded-2xl border-2 flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center p-4 gap-4">
              <div className="lg:hidden md:hidden sm:hidden flex justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
              </div>
              <div className="flex flex-col lg:text-left md:text-left sm:text-left text-center">
                <p className='mb-2 font-medium text-lg'>{loading ? "name..." : conn.name}</p>
                <p className='text-slate-700'>{loading ? "role..." : conn.role}</p>
                <p className='text-slate-700'>{loading ? "company" : `@ ${conn.company}`}</p>
                <button className='px-4 mt-4 py-1 rounded-full bg-rose-300 text-rose-800'>Remove Connection</button>
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

            <div className="shadow rounded-2xl border-2 flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center p-4 gap-4">
              <div className="lg:hidden md:hidden sm:hidden flex justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
              </div>
              <div className="flex flex-col lg:text-left md:text-left sm:text-left text-center">
                <p className='mb-2 font-medium text-lg'>Pankaj Kushwaha</p>
                <p className='text-slate-700'>Full Stack Developer</p>
                <p className='text-slate-700'>@ Microsoft</p>
                <button className='px-4 mt-4 py-1 rounded-full bg-green-300 text-green-900'>Connect</button>
              </div>
              <div className="lg:flex md:flex sm:flex hidden justify-center overflow-hidden items-center w-fit rounded-full bg-[#FFA78D]">
                <Image src="avatar.svg" width={100} height={50} alt='user-icon' />
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default MyConnections