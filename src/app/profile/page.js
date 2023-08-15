"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TbEdit, TbUpload } from "react-icons/tb";
import Spinner from '../components/Spinner';


const ProfileDashboard = () => {

  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // client side session
  const [user, setUser] = useState([]);


  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch(`/api/user/${session.user.email}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
      setLoading(false);
    }

  }, [session]);

  if (!user) {
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
      <div className="container mx-auto mt-8 flex flex-col items-center">
        <div className="bg-[#1E2875] h-40 rounded-xl p-4 w-full">
          <h1 className='text-white uppercase'>My Profile</h1>
        </div>
        <div className="lg:gap-x-20 lg:gap-y-8 md:gap-x-16 md:gap-y-6 sm:gap-x-12 sm:gap-y-4 gap-6 lg:p-8 md:p-7 sm:p-6 p-4 bg-white shadow-lg border-2 rounded-2xl -translate-y-16 w-11/12 mx-atuo grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">

          {/* Photo */}
          <div className="flex justify-between items-center rounded-2xl p-4">
            <div className="bg-[#FFA78D] rounded-full overflow-hidden">
              <Image src="avatar.svg" priority width={160} height={160} alt='user-avatar' />
            </div>
            <div className="">
              <button className='bg-[#F0EFFA] px-4 py-2 rounded-full text-sm flex items-center gap-x-2'>Upload Photo <TbUpload /></button>
            </div>
          </div>


          {/* Professional details */}
          <div className="border-2 flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <h1 className='font-semibold'>Professional Details</h1>
            <p>{loading ? "Loading..." : user?.professionalDetail == "" ? "No Detail" : user?.professionalDetail}</p>
          </div>




          {/* Personal Details */}
          <div className="border-2 flex flex-col gap-4 rounded-2xl shadow-md p-6 h-fit">
            <div>
              <h2 className='text-gray-600'>Your Name</h2>
              <div className="flex flex-row gap-2 justify-between items-center">
                <p className='font-semibold lg:text-base md:text-[14px] sm:text-[13px] text-[12px] capitalize'>{loading ? "Loading..." : user?.name}</p>
                <button className='bg-[#F0EFFA] p-2 rounded-full shadow'><TbEdit /></button>
              </div>
            </div>
            <div>
              <h2 className='text-gray-600'>Email</h2>
              <div className="flex flex-row gap-2 justify-between items-center">
                <p className='font-semibold lowercase lg:text-base md:text-[14px] sm:text-[13px] text-[12px]'>{loading ? "Loading..." : user?.email}</p>
                <button className='bg-[#F0EFFA] p-2 rounded-full shadow'><TbEdit /></button>
              </div>
            </div>
            <div>
              <h2 className='text-gray-600'>Phone Number</h2>
              <div className="flex flex-row gap-2 justify-between items-center">
                <p className='font-semibold lg:text-base md:text-[14px] sm:text-[13px] text-[12px]'>+91 {loading ? "Loading..." : user?.mobile}</p>
                <button className='bg-[#F0EFFA] p-2 rounded-full shadow'><TbEdit /></button>
              </div>
            </div>

          </div>

          {/* Certificates */}
          <div className="border-2 flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-3">
              <h1 className='font-semibold'>Certificates</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>

            {
              loading ? "Loading..." : user?.certificates?.length <= 0 ? "No Certificates" : user?.certificates?.map((cert, index) => {
                return (<div key={index} className="border rounded-full flex items-center p-4">
                  <div className="">
                    <Image src="certificateIcon.svg" width={40} height={40} alt='certificateIcon' />
                  </div>
                  <div className="flex flex-col justify-center items-center w-full">
                    <h2 className='font-medium text-lg text-center'>{cert.courseName}</h2>
                    <h2 className='text-center'>{cert.companyName}</h2>
                  </div>
                </div>)
              })
            }


          </div>


          {/* About */}
          <div className="border-2 flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-2">
              <h1 className='font-semibold'>About <span className='text-[#413B89] capitalize'>{user ? user.fname : "Loading..."}</span></h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>
            <p className='text-justify'>{loading ? "Loading..." : user?.about == "" ? "No About" : user?.about}</p>
          </div>


          {/* Experience */}
          <div className="border-2 flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-3">
              <h1 className='font-semibold'>Experience</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>

            {
              loading ? "Loading..." : user?.experience?.length <= 0 ? "No Experience" : user?.experience?.map((exp, index) => {
                return (
                  <div key={index} className="border rounded-2xl flex xl:flex-row lg:flex-row md:flex-col sm:flex-row flex-col items-center p-4 gap-2">
                    <div className="flex flex-col justify-start items-start w-full">
                      <h1 className='font-medium'>{exp.totalExperience} {`(${exp.from}-${exp.end})`}</h1>
                      <h1 className='capitalize'>{exp.companyName}</h1>
                    </div>

                    <div className="flex flex-col justify-end lg:items-end md:items-start sm:items-end items-start w-full">
                      <h1 className='text-gray-700 font-medium'>{exp.workType}</h1>
                      <h1 className='text-gray-700 capitalize'>{exp.designation}</h1>
                    </div>
                  </div>
                )
              })
            }
          </div>


          {/* Skills */}
          <div className="border-2 flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex items-center justify-between mb-2">
              <h1 className='font-semibold'>Skills</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              {
                loading ? "Loading..." : user?.skills?.length <= 0 ? "No Skills" : user?.skills?.map((skill, index) => { return <span key={index} className='shadow rounded-full bg-slate-300 px-4 py-1'>{skill}</span> })
              }
            </div>
          </div>


          {/* Education */}
          <div className="border-2 flex flex-col gap-y-2 rounded-2xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-3">
              <h1 className='font-semibold'>Education</h1>
              <button className='bg-[#F0EFFA] px-6 py-1 rounded-full'>Edit</button>
            </div>

            {
              loading ? "Loading..." : user?.education?.length <= 0 ? "No Education" : user?.education?.map((edu, index) => {
                return (
                  <div key={index} className="border rounded-2xl flex flex-col p-4 gap-2">
                    <div className="">
                      <h1 className='text-[#413B89] font-semibold uppercase text-lg'>{edu.university}, {edu.city}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className='font-medium uppercase'>{edu.degreeName}</p>
                      <p className='font-medium italic'>{edu.batch.slice(0, 4)}</p>
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

export default ProfileDashboard